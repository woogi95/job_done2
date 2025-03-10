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
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
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
                    {selectedReport === item.qaTypeDetailId ? (
                      <BsCheckCircleFill />
                    ) : (
                      <BsCircle style={{ color: "#ccc" }} />
                    )}
                    {item.qaDetailReason}
                  </label>
                </div>
              );
            })}
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
