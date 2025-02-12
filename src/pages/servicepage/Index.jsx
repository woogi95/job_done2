import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedCategoryState,
  selectedDetailTypeState,
} from "../../atoms/categoryAtom";
import { likeStatusState } from "../../atoms/like";
// comp
import ServiceListTop from "../../components/service/ServiceListTop";
import ServiceListItem from "../../components/service/ServiceListItem";
import Filter from "../../components/service/Filter";
import { Popup } from "../../components/ui/Popup";
// styled
import { LayoutDiv } from "../page";
import { PageNavDiv, ServiceContentDiv } from "./servicepage";
// apis
import axios from "axios";
import { loginApi } from "../../apis/login";
import { getCookie } from "../../utils/Cookie";

function Service() {
  const categoryId = useRecoilValue(selectedCategoryState);
  const detailTypeId = useRecoilValue(selectedDetailTypeState);
  const [likeStatus, setLikeStatus] = useRecoilState(likeStatusState);
  // 팝업 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupLink, setPopupLink] = useState("");
  //페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  // 업체 리스트
  const [businessList, setBusinessList] = useState([]);
  const getBusinessList = async (categoryId, detailTypeId) => {
    try {
      const res = await axios.get(
        `/api/business?categoryId=${categoryId}&detailTypeId=${detailTypeId}`,
      );
      setBusinessList(res.data.resultData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickBusiness = async businessId => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      setPopupTitle("로그인 필요");
      setPopupMessage("좋아요를 위해 로그인 후 이용해 주세요.");
      setPopupLink("/login");
      setIsPopupOpen(true);
      return;
    }
    try {
      const response = await loginApi.post("/api/like", {
        businessId: businessId,
      });
      console.log("찜 상태가 성공적으로 업데이트되었습니다:", response.data);

      // 찜 상태 업데이트
      const currentLikeStatus = likeStatus[businessId] || { isLiked: false };
      const newLikeStatus = !currentLikeStatus.isLiked;
      setLikeStatus(prevState => ({
        ...prevState,
        [businessId]: { isLiked: newLikeStatus },
      }));
    } catch (error) {
      console.error(
        "찜 상태 업데이트에 실패했습니다:",
        error.response?.data || error.message,
      );
      alert("찜 상태 업데이트에 실패했습니다.");
    }
  };
  // 팝업 닫기
  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  //페이지네이션
  const totalPages = Math.ceil(businessList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = businessList.slice(indexOfFirstItem, indexOfLastItem);
  //페이지 숫자
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (categoryId && detailTypeId) {
      getBusinessList(categoryId, detailTypeId);
      setCurrentPage(1);
    }
  }, [categoryId, detailTypeId]);

  return (
    <>
      <ServiceListTop setBusinessList={setBusinessList} />
      <ServiceContentDiv>
        <LayoutDiv>
          <Filter
            setBusinessList={setBusinessList}
            businessList={businessList}
          />
          <div className="list">
            {currentItems.map(item => (
              <ServiceListItem
                key={item.businessId}
                business={item}
                onClick={() => handleClickBusiness(item.businessId)}
              />
            ))}
          </div>
          <PageNavDiv>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={page === currentPage ? "active" : ""}
              >
                {page}
              </button>
            ))}
          </PageNavDiv>
        </LayoutDiv>
      </ServiceContentDiv>
      {/* 로그인x - 찜팝업 */}
      <Popup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        title={popupTitle}
        message={popupMessage}
        onCancel={handlePopupClose}
        showCancelButton={true}
        showConfirmButton={true}
        confirmLink={popupLink}
      />
    </>
  );
}

export default Service;
