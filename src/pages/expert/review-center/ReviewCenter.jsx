import { loginApi } from "../../../apis/login";
import { useEffect, useState } from "react";
import {
  AcceptButton,
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
import ReviewView from "./ReviewView";
import { comModalState } from "../../../atoms/businessAtom";

function ReviewCenter() {
  const [reviewDatas, setReviewDatas] = useRecoilState(reviewListState);
  const [, setSelectReview] = useRecoilState(selectReviewAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewPicsData, setReviewPicsData] = useRecoilState(reviewPicsList);
  const [, setReviewIds] = useRecoilState(reviewIdState);
  const [sortOrder, setSortOrder] = useState("latest");
  const [sortType, setSortType] = useState("high");
  const [filterType, setFilterType] = useState("all");
  const [reviewView, setReviewView] = useRecoilState(comModalState);
  const itemsPerPage = 10;

  const busiId = localStorage.getItem("businessId");

  useEffect(() => {
    reviewData();
  }, []);

  const handleCloseModal = () => {
    setReviewView(false);
    reviewData(); // ✅ 모달 닫을 때 데이터 갱신
  };

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
    console.log(data);
    const clickView = reviewDatas.find(item => item.reviewId === data.reviewId);
    const clickPicView = reviewPicsData.find(
      item => item.reviewId === data.reviewId,
    );
    setSelectReview(clickView);
    setReviewPicsData(clickPicView);
    setReviewIds(data.reviewId);
  };

  const handleSortChange = event => {
    const order = event.target.value;
    setSortOrder(order);
    setCurrentPage(1);

    const sortedData = [...reviewDatas].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "latest" ? dateB - dateA : dateA - dateB;
    });

    setReviewDatas(sortedData);
  };

  const handleScoreSort = event => {
    const order = event.target.value;
    setSortType(order);
    setCurrentPage(1);

    const sortedData = [...reviewDatas].sort((a, b) =>
      order === "high" ? b.score - a.score : a.score - b.score,
    );

    setReviewDatas(sortedData);
  };

  const handleFilterChange = event => {
    setFilterType(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = reviewDatas.filter(item => {
    if (filterType === "waiting") return item.replyStatus === null;
    if (filterType === "completed") return item.replyStatus !== null;
    return true;
  });

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
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const maxPage = Math.ceil(reviewDatas.length / itemsPerPage);

  return (
    <RequestBusiContainer>
      <div style={{ display: "flex" }}>
        <h2 className="tit">리뷰관리</h2>
      </div>

      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>이용 서비스</th>
              <th>
                <select
                  value={sortOrder}
                  onChange={handleSortChange}
                  style={{ backgroundColor: "rgb(233, 244, 255)" }}
                >
                  <option value="latest">최신순</option>
                  <option value="oldest">오래된 순</option>
                </select>
              </th>
              <th>
                <select
                  value={sortType}
                  onChange={handleScoreSort}
                  style={{ backgroundColor: "rgb(233, 244, 255)" }}
                >
                  <option value="high">평점 높은 순</option>
                  <option value="low">평점 낮은 순</option>
                </select>
              </th>
              <th>
                답글:
                <select
                  value={filterType}
                  onChange={handleFilterChange}
                  style={{ backgroundColor: "rgb(233, 244, 255)" }}
                >
                  <option value="all">전체 보기</option>
                  <option value="waiting">작성 대기</option>
                  <option value="completed">작성 완료</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
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
                    <AcceptButton
                      onClick={() => {
                        viewData(item);
                        setReviewView(true);
                      }}
                    >
                      {item.replyStatus ? "작성 완료" : "작성 대기"}
                    </AcceptButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </TableContainer>
      </TableWrapper>

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

      {reviewView && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "57%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            width: "50%",
            maxWidth: "600px",
          }}
        >
          <button
            onClick={handleCloseModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
          <ReviewView handleCloseModal={handleCloseModal} />
        </div>
      )}
    </RequestBusiContainer>
  );
}

export default ReviewCenter;
