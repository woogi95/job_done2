import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { loginApi } from "../../../apis/login";
import { BtnAreaDiv } from "../../../components/papers/papers";
import { getCookie } from "../../../utils/Cookie";
import {
  AddOptionDiv,
  DatePriceDiv,
  QuotationDiv,
  QuotationFormDiv,
} from "./qouteManagement";
import { useLocation, useNavigate } from "react-router-dom";
import { Popup } from "../../../components/ui/Popup";

function QuotationForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceIdFromUrl = queryParams.get("serviceId");
  const navigate = useNavigate();

  const [papersInfo, setPapersInfo] = useState();
  const getBusinessId = localStorage.getItem("businessId");
  const serviceId = serviceIdFromUrl || getCookie("serviceId");
  const [startTime, setStartTime] = useState(dayjs().hour(10).minute(0));
  const [endTime, setEndTime] = useState(dayjs().hour(18).minute(0));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [additionalQuotes, setAdditionalQuotes] = useState([
    { id: 1, content: "", price: "", note: "" },
  ]);
  const [addPrice, setAddPrice] = useState();
  const [addComment, setAddComment] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    console.log("papersInfo 현재 상태:", papersInfo);
  }, [papersInfo]);

  const getPapersInfo = async () => {
    try {
      const res = await loginApi.get(
        `/api/service/detail?serviceId=${serviceId}&businessId=${getBusinessId}`,
        {},
      );
      console.log("API 응답 데이터:", res.data);
      setPapersInfo(res.data.resultData);

      // etc 데이터가 있으면 additionalQuotes에 추가
      if (res.data.resultData?.etc?.length > 0) {
        const initialQuotes = res.data.resultData.etc.map((item, index) => ({
          id: index + 1,
          content: item.etcComment,
          price: item.etcPrice,
        }));
        setAdditionalQuotes(initialQuotes);
      }
    } catch (error) {
      console.log("API 에러:", error);
    }
  };
  useEffect(() => {
    if (!serviceId) {
      console.warn("serviceId 쿠키를 찾을 수 없습니다");
    }
    console.log("serviceId:", serviceId);
    getPapersInfo();
  }, []);

  // papersInfo가 업데이트될 때 초기 totalPrice 설정
  useEffect(() => {
    if (papersInfo?.totalPrice) {
      setTotalPrice(papersInfo.totalPrice);
    }
  }, [papersInfo]);

  useEffect(() => {
    if (papersInfo?.startDate) {
      setStartDate(dayjs(papersInfo.startDate));
    }
    if (papersInfo?.endDate) {
      setEndDate(dayjs(papersInfo.endDate));
    }
  }, [papersInfo]);

  const putQuotation = async () => {
    try {
      const requestData = {
        serviceId: serviceId,
        totalPrice: totalPrice,
        addComment: addComment,
        startDate: startDate?.format("YYYY/MM/DD"),
        endDate: endDate?.format("YYYY/MM/DD"),
        pyeong: papersInfo?.pyeong || 0,
        etc: additionalQuotes.map(quote => ({
          // etcId: quote.id,
          etcPrice: Number(quote.price) || 0,
          etcComment: quote.content,
        })),
        mendTime: endTime?.format("HH:mm"),
        mstartTime: startTime?.format("HH:mm"),
      };

      console.log("보내는 데이터:", requestData);

      const res = await loginApi.put("/api/service", requestData);
      console.log("API 응답 데이터:", res.data);
      setAddPrice();

      if (res.data.resultData) {
        console.log("견적서 작성 완료");
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.log("API 에러:", error);
    }
  };

  const handleAddQuote = () => {
    const newQuote = {
      id: additionalQuotes.length + 1,
      content: "",
      price: "",
      note: "",
    };
    setAdditionalQuotes([...additionalQuotes, newQuote]);
  };

  const handleQuoteChange = (id, field, value) => {
    let processedValue = value;
    if (field === "price") {
      // 쉼표 제거 후 숫자만 저장
      processedValue = value.replace(/,/g, "");
    }
    setAdditionalQuotes(prev =>
      prev.map(quote =>
        quote.id === id ? { ...quote, [field]: processedValue } : quote,
      ),
    );
  };

  const handleRemoveQuote = id => {
    setAdditionalQuotes(prev => {
      const filtered = prev.filter(quote => quote.id !== id);
      // 삭제 후 번호 재정렬
      return filtered.map((quote, index) => ({
        ...quote,
        id: index + 1,
      }));
    });
  };
  const formatPhoneNumber = phone =>
    phone ? phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") : "-";
  useEffect(() => {
    console.log("보내볼까?", setAddPrice);
  }, []);
  const formatBusinessNumber = number =>
    number
      ? number.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3")
      : "사업자 번호 없음";
  return (
    <QuotationDiv>
      <h2 className="tit">견적서 작성</h2>
      <QuotationFormDiv>
        <form>
          <div>
            <h3>공급자</h3>
            <div>
              <label>
                <h4>사업자번호</h4>
                <input
                  type="text"
                  value={formatBusinessNumber(papersInfo?.businessNum) || ""}
                  readOnly
                />
              </label>
              <label>
                <h4>연락처</h4>
                <input
                  type="text"
                  value={formatPhoneNumber(papersInfo?.businessPhone) || ""}
                  readOnly
                />
              </label>
              <label>
                <h4>상호명</h4>
                <input
                  type="text"
                  value={papersInfo?.businessName || ""}
                  readOnly
                />
              </label>
              <label>
                <h4>분류</h4>
                <input
                  type="text"
                  value={papersInfo?.detailTypeName || ""}
                  readOnly
                />
              </label>
              <label>
                <h4>주소</h4>
                <input
                  type="text"
                  value={papersInfo?.businessAddress || ""}
                  readOnly
                />
              </label>
            </div>
          </div>
          {/* 고객정보 */}
          <div>
            <h3>고객정보</h3>
            <div>
              <label>
                <h4>예약자명</h4>
                <input
                  type="text"
                  value={papersInfo?.userName || ""}
                  readOnly
                />
              </label>
              <label>
                <h4>연락처</h4>
                <input
                  type="text"
                  value={formatPhoneNumber(papersInfo?.userPhone) || ""}
                  readOnly
                />
              </label>
              <label>
                <h4>주소</h4>
                <input type="text" value={papersInfo?.address || ""} readOnly />
              </label>
            </div>
          </div>
          {/* 예약내용 */}
          <div>
            <h3>예약내용</h3>
            <div>
              <label>
                <h4>예약일자</h4>
                <input
                  type="text"
                  value={papersInfo?.startDate || ""}
                  readOnly
                />
              </label>
              <label className="pyeong">
                <h4>평수</h4>
                <input
                  type="text"
                  value={papersInfo?.pyeong || ""}
                  readOnly
                />{" "}
                평
              </label>

              <label className="flex">
                <h4 className="flex-col flex !justify-center !items-center">
                  옵션
                </h4>
                <div className=" option-box flex flex-col gap-[5px]">
                  {papersInfo?.options.map((item, index) => (
                    <div key={item.optionId}>
                      <span>
                        <b>[옵션 {index + 1}]</b> {item.optionName} -{" "}
                        {item.optionDetailName}
                      </span>
                      <span>{item.optionDetailPrice.toLocaleString()} 원</span>
                    </div>
                  ))}
                </div>
              </label>
            </div>
          </div>
          {/* 문의사항 */}
          <div className="text-area">
            <h3>문의사항</h3>
            <textarea value={papersInfo?.comment || ""} readOnly />
          </div>
          {/* 견적내용 추가 */}
          <AddOptionDiv>
            <div>
              <h3>추가견적</h3>
              <button type="button" onClick={handleAddQuote}>
                견적추가 +
              </button>
            </div>
            <div>
              <div className="tr head">
                <div className="th">No.</div>
                <div className="th">내용</div>
                <div className="th">금액</div>
                <div className="th">관리</div>
              </div>
              {additionalQuotes.map(quote => (
                <div className="tr" key={quote.id}>
                  <div className="td">{quote.id}</div>
                  <div className="td">
                    <input
                      type="text"
                      value={quote.content}
                      onChange={e =>
                        handleQuoteChange(quote.id, "content", e.target.value)
                      }
                    />
                  </div>
                  <div className="td price">
                    <input
                      type="text"
                      value={
                        quote.price ? Number(quote.price).toLocaleString() : ""
                      }
                      onChange={e =>
                        handleQuoteChange(quote.id, "price", e.target.value)
                      }
                    />
                  </div>
                  <div className="td">
                    {additionalQuotes.length > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuote(quote.id)}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AddOptionDiv>
          {/* 견적일자 */}
          <DatePriceDiv>
            <h3>견적일자 및 총금액</h3>
            <div className="date">
              {/* 견적일 */}
              <div>
                <h4>작업일자</h4>
                <div className="col2">
                  <DatePicker
                    className="dp-style"
                    value={startDate}
                    onChange={date => setStartDate(date)}
                    placeholder="시작일"
                  />
                  <span> - </span>
                  <DatePicker
                    className="dp-style"
                    value={endDate}
                    onChange={date => setEndDate(date)}
                    placeholder="종료일"
                  />
                </div>
              </div>
              {/* 견적시간 */}
              <div>
                <h4>작업시간</h4>
                <div className="col2">
                  <TimePicker
                    className="dp-style"
                    value={startTime}
                    onChange={time => setStartTime(time)}
                    format="HH:mm"
                    minuteStep={10}
                    placeholder="시작 시간"
                  />
                  <span> - </span>
                  <TimePicker
                    className="dp-style"
                    value={endTime}
                    onChange={time => setEndTime(time)}
                    format="HH:mm"
                    minuteStep={10}
                    placeholder="종료 시간"
                  />
                </div>
              </div>
            </div>
            {/* 견적금액 */}
            <div className="price">
              <h4>견적금액</h4>
              <div>{totalPrice.toLocaleString()}원</div>
            </div>
          </DatePriceDiv>
          {/* 특이사항 */}
          <div className="text-area">
            <h3>특이사항</h3>
            <textarea
              value={addComment || papersInfo?.addComment || ""}
              onChange={e => setAddComment(e.target.value)}
            />
          </div>
          <BtnAreaDiv>
            <button
              type="button"
              className="cancel"
              onClick={() => navigate("/expert/quote-management")}
            >
              취소
            </button>
            <button type="button" className="okay" onClick={putQuotation}>
              작성완료
            </button>
          </BtnAreaDiv>
        </form>
      </QuotationFormDiv>

      {/* 팝업 추가 */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="알림"
        message="견적서 작성을 완료하였습니다."
        showConfirmButton={true}
        onConfirm={() => navigate("/expert/quote-management")}
      />
    </QuotationDiv>
  );
}
export default QuotationForm;
