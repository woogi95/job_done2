import React from "react";
import { IoIosCamera } from "react-icons/io";

function ProfileImage({ profileImg, onImageUpload }) {
  const handleImgUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
  );
}

export default ProfileImage;
