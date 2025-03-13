import { useEffect, useState } from "react";
import { ReportPopupDiv } from "./serviceDetail";
import { RxCross1 } from "react-icons/rx";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { loginApi } from "../../apis/login";

interface SirenType {
  qaTypeDetailId: number;
  qaDetailReason: string;
}

const BusinessReportPopup = () => {
  const [selectedReport, setSelectedReport] = useState<string | null | number>(
    null,
  );
  const [sirenTypelist, setSirenTypelist] = useState<SirenType[]>([]);

  const getSirenTypelist = async () => {
    try {
      ///api/qa/qaTypeId?qaTypeId=1
      const res = await loginApi.get(`/api/qa/qaTypeId?qaTypeId=1`);
      setSirenTypelist(res.data.resultData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSirenTypelist();
  }, []);
  return (
    <ReportPopupDiv>
      <div className="layer">
        <form>
          <h1>업체 신고</h1>
          {/* <h3>신고사유</h3> */}
          <div className="report-list">
            {sirenTypelist.map(item => {
              return (
                <div key={item.qaTypeDetailId}>
                  <input
                    type="radio"
                    name="report"
                    id={`${item.qaTypeDetailId}`}
                    onChange={() => setSelectedReport(item.qaTypeDetailId)}
                  />
                  <label htmlFor={`${item.qaTypeDetailId}`}>
                    {selectedReport === "report1" ? (
                      <BsCheckCircleFill />
                    ) : (
                      <BsCircle style={{ color: "#ccc" }} />
                    )}
                    {item.qaDetailReason}
                  </label>
                </div>
              );
            })}
            {/* <input
              type="radio"
              name="report"
              id="report1"
              onChange={() => setSelectedReport("report1")}
            />
            <label htmlFor="report1">
              {selectedReport === "report1" ? (
                <BsCheckCircleFill />
              ) : (
                <BsCircle style={{ color: "#ccc" }} />
              )}
              서비스와 관계없는 내용 및 사진
            </label> */}
            {/* <input
              type="radio"
              name="report"
              id="report2"
              onChange={() => setSelectedReport("report2")}
            />
            <label htmlFor="report2">
              {selectedReport === "report2" ? (
                <BsCheckCircleFill />
              ) : (
                <BsCircle style={{ color: "#ccc" }} />
              )}
              부적절한 상호/상품명
            </label>
            <input
              type="radio"
              name="report"
              id="report3"
              onChange={() => setSelectedReport("report3")}
            />
            <label htmlFor="report3">
              {selectedReport === "report3" ? (
                <BsCheckCircleFill />
              ) : (
                <BsCircle style={{ color: "#ccc" }} />
              )}
              부적절한 사진
            </label>
            <input
              type="radio"
              name="report"
              id="report4"
              onChange={() => setSelectedReport("report4")}
            />
            <label htmlFor="report4">
              {selectedReport === "report4" ? (
                <BsCheckCircleFill />
              ) : (
                <BsCircle style={{ color: "#ccc" }} />
              )}
              부적절한 가격
            </label>
            <input
              type="radio"
              name="report"
              id="report5"
              onChange={() => setSelectedReport("report5")}
            />
            <label htmlFor="report5">
              {selectedReport === "report5" ? (
                <BsCheckCircleFill />
              ) : (
                <BsCircle style={{ color: "#ccc" }} />
              )}
              허위 과장광고
            </label>
            <input
              type="radio"
              name="report"
              id="report6"
              onChange={() => setSelectedReport("report6")}
            />
            <label htmlFor="report6">
              {selectedReport === "report6" ? (
                <BsCheckCircleFill />
              ) : (
                <BsCircle style={{ color: "#ccc" }} />
              )}
              탈세 의혹
            </label>
            <input
              type="radio"
              name="report"
              id="report7"
              onChange={() => setSelectedReport("report7")}
            />
            <label htmlFor="report7">
              {selectedReport === "report7" ? (
                <BsCheckCircleFill />
              ) : (
                <BsCircle style={{ color: "#ccc" }} />
              )}
              기타
            </label> */}
          </div>
          <div className="text-box">
            <textarea
              name="report"
              id="report"
              placeholder="신고사유 입력"
              maxLength={1000}
            />
          </div>
          <div className="photo-area">
            <h4>첨부 사진</h4>
            <div className="img-box">
              <input type="file" name="" id="img-btn" />
              <label htmlFor="img-btn">+</label>
              <div className="slot"></div>
              <div className="slot"></div>
              <div className="slot"></div>
            </div>
          </div>
          <button className="report-btn">신고하기</button>
          <div className="close-btn">
            <RxCross1 />
          </div>
        </form>
      </div>
    </ReportPopupDiv>
  );
};

export default BusinessReportPopup;
