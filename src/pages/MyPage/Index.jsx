import React, { useState, useEffect } from "react";
import MyPageLayout from "../../components/MyPageLayout";
import { IoIosCamera } from "react-icons/io";
import { HiOutlinePencilAlt, HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import * as yup from "yup";
import { loginApi } from "../../apis/login";

function MyPage() {
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deletePw, setDeletePw] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleteSuccessModal, setIsDeleteSuccessModal] = useState(false);
  // 유효성 검사
  const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required("현재 비밀번호를 입력해주세요."),
    newPassword: yup
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "비밀번호는 영문과 숫자를 포함해야 합니다.",
      )
      .required("새 비밀번호를 입력해주세요."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인을 입력해주세요."),
  });

  // 프사 업로드
  const handleImgUpload = e => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Converted image to base64:", reader.result);
        setProfileImg(reader.result);
        setIsEdit(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // 유저 정보 관련들
  const getUserInfo = async () => {
    try {
      const res = await loginApi.get(`/api/user`);

      const userData = res.data.resultData;
      setUserName(userData.name);
      setUserEmail(userData.email);
      setPhoneNumber(userData.phone);
      const profileImgUrl = userData.pic
        ? `http://112.222.157.156:5224${userData.pic}`
        : "/images/order/default_profile.jpg";
      setProfileImg(profileImgUrl);
    } catch (error) {
      console.error("API 에러:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 전화번호 포맷팅
  const formatPhoneNumber = value => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return numbers.slice(0, 3) + "-" + numbers.slice(3);
    } else {
      return (
        numbers.slice(0, 3) +
        "-" +
        numbers.slice(3, 7) +
        "-" +
        numbers.slice(7, 11)
      );
    }
  };

  // 전화번호 하이픈?
  const handlePhoneChange = e => {
    const formatNumber = formatPhoneNumber(e.target.value);
    if (formatNumber.length <= 13) {
      setPhoneNumber(formatNumber);
      setIsEdit(true);
    }
  };

  const handleSubmit = async () => {
    if (isEdit) {
      try {
        const requestData = {
          p: {
            phone: phoneNumber.replace(/-/g, ""),
            name: userName,
          },
        };
        console.log("requestData:", requestData);

        const formData = new FormData();

        formData.append(
          "p",
          new Blob([JSON.stringify(requestData.p)], {
            type: "application/json",
          }),
        );

        if (profileImg && profileImg.startsWith("data:image")) {
          const response = await fetch(profileImg);
          const blob = await response.blob();
          formData.append("pic", blob, "profile.jpg");
        }

        const response = await loginApi.patch("/api/user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          // localStorage.setItem("userPic", profileImg);
          alert("회원정보가 수정되었습니다.");
          setIsEdit(false);
          getUserInfo();
        }
      } catch (error) {
        console.error("회원정보 수정 실패:", error);
        alert("회원정보 수정에 실패했습니다.");
      }
    }
  };

  // 비밀번호 변경
  const handlePasswordChange = async () => {
    try {
      await passwordSchema.validate(
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        { abortEarly: false },
      );

      setError("");

      const res = await loginApi.patch("/api/user/password", {
        currentPassword: currentPassword,
        newPassword: newPassword,
        email: userEmail,
      });

      if (res.status === 200) {
        setIsPwModalOpen(false);
        setIsSuccessModal(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
      } else {
        setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("비밀번호 변경 에러:", error.response || error);
    }
  };

  // 회원 탈퇴
  const handleDeleteAccount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.delete("/api/user", {
        data: {
          userId: parseInt(userId),
          upw: deletePassword,
        },
      });

      if (response.status === "회원정보 삭제 완료") {
        setIsDeleteModal(false);
        setIsDeleteSuccessModal(true);
      } else {
        setDeleteError("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      if (error.response?.status === 401) {
        setDeleteError("비밀번호가 일치하지 않습니다.");
      } else {
        setDeleteError("회원탈퇴 처리 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSuccessModalClose = () => {
    setIsDeleteSuccessModal(false);
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <MyPageLayout>
        <div className="flex flex-col items-center gap-[50px]">
          <div className="text-[24px]">내 정보</div>
          <div className="relative">
            <img
              src={profileImg}
              alt="profile"
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
            <input
              id="imgUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImgUpload}
            />
            <label
              htmlFor="imgUpload"
              className="absolute bottom-0 right-0 bg-white rounded-full text-[#1e1e1e] cursor-pointer w-[30px] h-[30px] flex justify-center items-center text-[24px]"
            >
              <IoIosCamera />
            </label>
          </div>
          <button
            className={`flex justify-center items-center w-[50px] h-[30px] rounded-[8px] border border-gray-300 
              ${
                isEdit
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            onClick={handleSubmit}
            disabled={!isEdit}
          >
            적용
          </button>
          <div className="flex flex-col gap-[20px]">
            <div>
              <input
                type="text"
                value={userName}
                readOnly
                className="w-[300px] h-[40px] flex justify-center items-center rounded-[8px] border border-[#E4E5ED] px-3 text-[#C3C3C3] bg-gray-100"
              />
            </div>
            <div>
              <input
                type="text"
                value={userEmail}
                readOnly
                className="w-[300px] h-[40px] flex justify-center items-center rounded-[8px] border border-[#E4E5ED] px-3 text-[#C3C3C3] bg-gray-100"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                readOnly={!isPhoneEdit}
                className={`w-[300px] h-[40px] flex justify-center items-center rounded-[8px] border border-[#E4E5ED] px-3 
                  ${isPhoneEdit ? "text-black" : "text-[#C3C3C3]"} 
                  ${isPhoneEdit ? "bg-white" : "bg-gray-50"}`}
                maxLength={13}
                placeholder="010-0000-0000"
              />
              <button
                onClick={() => setIsPhoneEdit(!isPhoneEdit)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <HiOutlinePencilAlt />
              </button>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div>
                <button
                  className="text-[#737373] underline"
                  onClick={() => setIsPwModalOpen(true)}
                >
                  비밀번호 변경
                </button>
              </div>
              <div>
                <button
                  className="text-[#737373] underline"
                  onClick={() => setIsDeleteModal(true)}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>
      </MyPageLayout>

      {/* 비밀번호 변경 모달 */}
      {isPwModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-[18px] font-normal mb-4 flex justify-center items-center pb-[20px]">
              비밀번호 변경
            </h2>

            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div className="relative mb-3">
              <input
                type={showCurrentPw ? "text" : "password"}
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showCurrentPw ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <div className="relative mb-3">
              <input
                type={showNewPw ? "text" : "password"}
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNewPw ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirmPw ? "text" : "password"}
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPw(!showConfirmPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPw ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-[10px]">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => {
                  setIsPwModalOpen(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-[#3887FF] text-white rounded"
                onClick={handlePasswordChange}
              >
                변경하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 회원탈퇴 모달 */}
      {isDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <span className="text-[18px] font-normal mb-2 flex justify-center items-center">
              회원탈퇴
            </span>
            <div className="text-gray-600 text-sm mb-4 pt-[20px] pb-[10px]">
              <p>정말 탈퇴하시겠습니까?</p>
              <p>탈퇴하시려면 비밀번호를 입력해주세요.</p>
            </div>

            {deleteError && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {deleteError}
              </div>
            )}

            <div className="relative mb-4">
              <input
                type={deletePw ? "text" : "password"}
                placeholder="비밀번호 입력"
                value={deletePassword}
                onChange={e => setDeletePassword(e.target.value)}
                className="w-full px-3 py-2 border rounded h-[40px]"
              />
              <button
                type="button"
                onClick={() => setDeletePw(!deletePw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777]"
              >
                {deletePw ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-[10px]">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => {
                  setIsDeleteModal(false);
                  setDeletePassword("");
                  setDeleteError("");
                }}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-[#FF3044] text-white rounded"
                onClick={handleDeleteAccount}
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 성공 모달 */}
      {isSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="text-center mb-6">
              <h2 className="text-[18px] font-normal mb-4">
                비밀번호 변경 완료
              </h2>
              <p className="text-gray-600">
                비밀번호가 성공적으로 변경되었습니다.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-[#3887FF] text-white rounded"
                onClick={() => setIsSuccessModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 회원탈퇴 완료 모달 */}
      {isDeleteSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="text-center mb-6">
              <h2 className="text-[18px] font-normal mb-4">회원탈퇴 완료</h2>
              <p className="text-gray-600">
                회원탈퇴가 완료되었습니다.
                <br />
                그동안 이용해 주셔서 감사합니다.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-[#3887FF] text-white rounded"
                onClick={handleSuccessModalClose}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyPage;
