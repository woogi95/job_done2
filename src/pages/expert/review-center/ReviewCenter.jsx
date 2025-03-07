import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../apis/login";
import { useEffect, useState } from "react";
import {
  AcceptButton,
  CancelButton,
  EmptyMessage,
  PageButton,
  PaginationContainer,
  RequestBusiContainer,
  TableContainer,
  TableWrapper,
} from "./reviewstyle";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useRecoilState } from "recoil";
import {
  reviewIdState,
  reviewListState,
  reviewPicsList,
  selectReviewAtom,
} from "../../../atoms/reviewAtom";

function ReviewCenter() {
  useEffect(() => {
    reviewData();
  }, []);
  const [reviewDatas, setReviewDatas] = useRecoilState(reviewListState);
  const [selectReview, setSelectReview] = useRecoilState(selectReviewAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewPicsData, setReviewPicsData] = useRecoilState(reviewPicsList);
  // const [commentModal, setCommentModal] = useRecoilState(commentModals);
  const [isSorted, setIsSorted] = useState(false);
  const [isScored, setIsScored] = useState(false);
  const [reviewIds, setReviewIds] = useRecoilState(reviewIdState);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const busiId = localStorage.getItem("businessId");

  const reviewData = async () => {
    try {
      const res = await loginApi.get(
        `/api/review?businessId=${busiId}&state=0&page=1&size=30`,
      );
      if (res) {
        const formattedData = res.data.resultData.map((item, index) => ({
          reviewId: item.reviewId,
          id: index + 1,
          userName: item.name,
          detailTypeName: item.detailTypeName,
          createdAt: item.createdAt,
          score: item.score,
          replyStatus: item.comment,
          contents: item.contents || "",
        }));
        const picFormatData = res.data.resultData.map(item => ({
          reviewId: item.reviewId,
          pics: item.pics,
        }));
        setReviewPicsData(picFormatData);
        setReviewDatas(formattedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewData = data => {
    const clickView = reviewDatas.find(item => item.reviewId === data.reviewId);
    const clickPicView = reviewPicsData.find(
      item => item.reviewId === data.reviewId,
    );
    // console.log(clickView);
    setSelectReview(clickView);
    setReviewPicsData(clickPicView);
    setReviewIds(data.reviewId);
  };
  const toggleSort = () => {
    const sortedData = [...reviewDatas].sort((a, b) =>
      isSorted
        ? new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate()
        : new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate(),
    );
    setReviewDatas(sortedData);
    setIsSorted(!isSorted);
  };

  const scoreSort = () => {
    const scoredData = [...reviewDatas].sort((a, b) =>
      isScored ? a.score - b.score : b.score - a.score,
    );
    setReviewDatas(scoredData);
    setIsScored(!isScored);
  };

  const renderStars = score => {
    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} color="#EAB838" />
        ))}
        {halfStar && <FaStarHalf color="#EAB838" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={i} color="#E0E2E7" />
        ))}
      </div>
    );
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = reviewDatas.slice(indexOfFirstItem, indexOfLastItem);
  const maxPage = Math.ceil(reviewDatas.length / itemsPerPage);
  return (
    <RequestBusiContainer>
      <div
        style={{ marginBottom: 10, display: "flex", justifyContent: "right" }}
      >
        <AcceptButton onClick={toggleSort} style={{ width: "105px" }}>
          {isSorted ? "오래된 순 정렬" : "최신순 정렬"}
        </AcceptButton>
        /
        <AcceptButton onClick={scoreSort}>
          {isScored ? "평점 낮은 순" : "평점 높은 순"}
        </AcceptButton>
      </div>
      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>이용 서비스</th>
              <th>댓글 등록시간</th>
              <th>평점</th>
              <th>답글 여부</th>
            </tr>
          </thead>
          <tbody>
            {reviewDatas.length === 0 ? (
              <tr>
                <EmptyMessage colSpan={6}>등록된 리뷰가 없습니다.</EmptyMessage>
              </tr>
            ) : (
              currentData.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.userName}</td>
                  <td>{item.detailTypeName}</td>
                  <td>{item.createdAt}</td>
                  <td>{renderStars(item.score)}</td>
                  <td>
                    {item.comment === null ? (
                      <CancelButton
                        onClick={item => {
                          viewData(item);
                          navigate("/expert/review-center/reviewview");
                        }}
                      >
                        🔴 작성 대기
                      </CancelButton>
                    ) : (
                      <AcceptButton
                        onClick={() => {
                          viewData(item);
                          navigate("/expert/review-center/reviewview");
                        }}
                      >
                        🔵 작성 완료
                      </AcceptButton>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </TableContainer>
      </TableWrapper>
      {/* ✅ 페이지네이션 UI 추가 */}
      {maxPage > 1 && (
        <PaginationContainer>
          {[...Array(maxPage)].map((_, index) => (
            <PageButton
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              active={currentPage === index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      )}
    </RequestBusiContainer>
  );
}
export default ReviewCenter;
