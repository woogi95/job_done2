import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  commentsBox,
  reviewIdState,
  reviewListState,
  reviewPicsList,
} from "../../../atoms/reviewAtom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { loginApi } from "../../../apis/login";
import { FaStar, FaStarHalf } from "react-icons/fa";
import "./reviewview.css";
import { useNavigate } from "react-router-dom";
const ReviewView = () => {
  const BASE_URL = "http://112.222.157.156:5224";
  const [form] = Form.useForm();
  const [reviewDatas, setReviewDatas] = useRecoilState(reviewListState);
  const [reviewPicsData, setReviewPicsData] = useRecoilState(reviewPicsList);
  const [commentBox, setCommentBox] = useRecoilState(commentsBox);
  const [reviewComment, setReviewComment] = useState(true);
  const [reviewIds, setReviewIds] = useRecoilState(reviewIdState);
  const oneData = reviewDatas.find(item => item.reviewId === reviewIds);
  // const [oneData, setOneData] = useState();
  const [isComments, setIsComments] = useState(
    oneData.replyStatus === null ? false : true,
  );
  // setOneData(oneDatas);
  const picData = reviewPicsData.find(item => item.reviewId === reviewIds);
  const busiReview = oneData.replyStatus ? oneData.replyStatus : "";
  const navigate = useNavigate();
  // console.log();
  // 리뷰 댓글 삭제
  // console.log(reviewIds);
  const deleteComment = async () => {
    try {
      const res = await loginApi.delete(
        `/api/review/comment?reviewId=${reviewIds}`,
      );
      console.log(res);
      reviewData();
      setIsComments(false);
      navigate("/expert/review-center");
    } catch (error) {
      console.log(error);
    }
  };
  // 리뷰데이터 다시 불러오기
  const reviewData = async () => {
    const busiId = localStorage.getItem("businessId");
    try {
      const res = await loginApi.get(
        `/api/review?businessId=${busiId}&state=0&page=1&size=30`,
        // `/api/review?businessId=2&page=1&size=30`,
      );
      console.log(res);
      if (res) {
        const formattedData = res.data.resultData.map((item, index) => ({
          reviewId: item.reviewId,
          id: index + 1, // 행 번호 추가 (1부터 시작)
          userName: item.name,
          contents: item.contents, // 예시 내용
          createdAt: item.createdAt,
          score: item.score,
          replyStatus: item.comment,
          comment: item.comment === null ? "" : item.comment.contents,
        }));
        const reviewPics = res.data.resultData.map((item, index) => ({
          reviewId: item.reviewId,
          pic: [item.pics.filter((_, index) => index % 2 === 0)],
        }));
        console.log(reviewPics);
        setReviewPicsData(reviewPics);
        setReviewDatas(formattedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 별점
  const renderStars = score => {
    const fullStars = Math.floor(score); // 채워진 별 개수
    const halfStar = score % 1 >= 0.5; // 반쪽 별 여부
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // 비어 있는 별 개수

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={`full-${i}`} color="#EAB838" />
        ))}
        {halfStar && <FaStarHalf key="half" color="#EAB838" />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <FaStar key={`empty-${i}`} color="#E0E2E7" />
        ))}
      </>
    );
  };
  // 등록
  const onSubmit = async data => {
    const commentReview = {
      reviewId: reviewIds,
      contents: data.contents,
    };

    try {
      const res = await loginApi.post("/api/review/comment", commentReview);

      reviewData();
      setIsComments(true);
      setReviewComment(false);
    } catch (error) {
      console.log(error);
    }
  };
  // 수정버튼
  const onEdit = async data => {
    console.log(data);
    const commentReview = {
      reviewId: reviewIds,
      contents: data,
    };
    try {
      const res = await loginApi.put(
        `/api/review/comment?reviewId=${reviewIds}`,
        commentReview,
      );
      reviewData();
      setIsComments(true);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(picData);
  console.log(busiReview);
  console.log(oneData);
  const initData = {
    reviewId: reviewIds,
    contents: oneData.comment || "",
  };
  // console.log(reviewDatas);

  // 사진 관리

  const commentResister = () => {
    setReviewComment(false);
    setIsComments(false);
  };
  useEffect(() => {
    // const busiId = Number(localStorage.getItem("businessId"));
    // reviewData(busiId, reviewIds);
  }, [oneData, busiReview, isComments]);

  return (
    <div style={{ display: "block", padding: 10, backgroundColor: "white" }}>
      {/* 유저이름, 평점,날짜 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "100",
          fontSize: "20",
        }}
      >
        {/* 유저이름 */}
        <div
          style={{
            display: "flex",
            marginBottom: 5,
            fontSize: "24px",
            height: 40,
            alignItems: "center",
            padding: 5,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              height: 40,
              alignItems: "center",
              padding: 5,
            }}
          >
            {oneData.userName}님의 리뷰
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 5,
              height: 40,
            }}
          >
            등록 날짜 : {oneData.createdAt}
          </div>
          <div style={{ display: "flex", alignItems: "center", padding: 5 }}>
            <div className="star-div">
              <div className="star-container">
                <p className="star">{renderStars(oneData.score)}</p>
                <span className="star-grade">
                  {/* {reviewList.length > 0 &&
                    reviewList[0]?.averageScore.toFixed(1)} */}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 평점,날짜 */}
        <div></div>
      </div>
      <hr style={{ marginBottom: 5, height: "5px" }} />
      {/* 사진 */}
      <div
        style={{
          display: "flex",
          marginBottom: 20,
          width: "100%",
          height: "150px",
        }}
      >
        {picData &&
          picData.pic
            .flat()
            .map((item, index) => (
              <img
                key={index}
                src={`${BASE_URL}${item}`}
                alt="리뷰사진"
                style={{ height: "150px", border: "2px solid black" }}
              />
            ))}
      </div>
      {/* 유저리뷰 */}
      <div style={{ display: "block" }}>
        {/* 리뷰 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            minHeight: "150px",
            border: "2px solid gray",
            borderRadius: 5,
            backgroundColor: "white",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          {oneData.contents}
        </div>
        <hr style={{ marginBottom: 5, height: "5px" }} />
        {/* 답글등록 버튼 */}
        <div>
          <h1 style={{ marginBottom: 20, fontSize: 30 }}>답글</h1>
          {isComments ? (
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  minHeight: "150px",
                  border: "2px solid gray",
                  borderRadius: 5,
                  backgroundColor: "white",
                  marginBottom: 10,
                  lineHeight: 1.5,
                }}
              >
                {busiReview.contents}
              </div>
              <div style={{ display: "flex" }}>
                <div className="delete-box">
                  <button type="button" onClick={deleteComment}>
                    삭제
                  </button>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      commentResister();
                    }}
                    style={{
                      width: 80,
                      fontSize: 20,
                      backgroundColor: "white",
                      height: 40,
                      border: "2px solid #d6d6d6",
                    }}
                  >
                    답글 수정
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* 답글입력 */}
              <Form
                form={form}
                initialValues={initData}
                onFinish={onSubmit}
                style={{ width: "100%" }}
              >
                <Form.Item name={"contents"}>
                  <Input.TextArea style={{ minHeight: "200px" }} />
                </Form.Item>

                {/* 삭제버튼/ 등록,수정 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginTop: 10,
                  }}
                >
                  {reviewComment ? (
                    <Button htmlType="submit">등록</Button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        commentResister();
                        const contentsValue = form.getFieldValue("contents");
                        onEdit(contentsValue);
                      }}
                      style={{
                        width: 120,
                        fontSize: 20,
                        backgroundColor: "white",
                        height: 40,
                        border: "2px solid #d6d6d6",
                      }}
                    >
                      수정
                    </button>
                  )}
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
      {/* 답글등록 */}
    </div>
  );
};

export default ReviewView;
