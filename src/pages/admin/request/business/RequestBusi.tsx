import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginApi } from "../../../../apis/login";
import {
  approveStateAtom,
  cancelCommentAtom,
  cancelStateAtom,
  reqBusinessIdAtom,
  // requestBusiAtom,
} from "../../../../atoms/third-atoms/requests/requestAtom";
import { BusinessApplyType } from "../../../../types/type";
import {
  ApplyButton,
  CancelButton,
  CancelDone,
  CancelsButton,
  EmptyMessage,
  PageButton,
  PaginationContainer,
  PhotoButton,
  PicmodalStyle,
  RequestBusiContainer,
  StatusDone,
  TableContainer,
  TableWrapper,
  modalButtonContainerStyle,
  modalStyle,
  modalTitleStyle,
  overlayStyle,
  textareaStyle,
} from "./requestbusis";

const RequestBusi = () => {
  const picURL = "https://job-done.r-e.kr:52340";
  // const [allData, setAllData] =
  //   useRecoilState<BusinessApplyType[][]>(requestBusiAtom); //
  const [currentPage, setCurrentPage] = useState(1); //
  const [maxPage, setMaxPage] = useState(1); //
  // 수락 , 취소 모달 state
  const [cancel, setCancel] = useRecoilState<boolean>(cancelStateAtom);
  const [approve, setApprove] = useRecoilState<boolean>(approveStateAtom);
  const [comment, setComment] = useRecoilState<string>(cancelCommentAtom);
  const [selectedBusinessId, setSelectedBusinessId] =
    useRecoilState<number>(reqBusinessIdAtom);
  const [flatData, setFlatData] = useState<BusinessApplyType[]>([]);
  const [stateList, setStateList] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<BusinessApplyType[][]>([]);
  const [picList, setPicList] = useState<string[] | null>(null);
  const [picModal, setPicModal] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  // Api 요청
  const getAllData = async () => {
    const allPagesData: BusinessApplyType[][] = [];
    const page = 1;

    const fetchData = async (pageNumber: number) => {
      try {
        const res = await loginApi.get(
          `/api/admin/businessApplication?page=${pageNumber}`,
        );
        const filterData: BusinessApplyType[] = res.data.resultData;

        if (filterData.length === 0) {
          setMaxPage(pageNumber - 1);
          return;
        }

        allPagesData.push(filterData);

        await fetchData(pageNumber + 1); // 다음 페이지 호출
      } catch (error) {
        console.error("🚨 API 호출 오류:", error);
      }
    };

    await fetchData(page);

    const dataFlat = allPagesData
      .flat()
      .sort(
        (a, b) =>
          new Date(b.applicationCreatedAt).getTime() -
          new Date(a.applicationCreatedAt).getTime(),
      );

    setFlatData(dataFlat);

    const paginatedData: BusinessApplyType[][] = [];
    for (let i = 0; i < dataFlat.length; i += 10) {
      paginatedData.push(dataFlat.slice(i, i + 10));
    }

    setFilteredData(paginatedData);
    setMaxPage(paginatedData.length || 1);
    setCurrentPage(1);
  };

  // state 값 데이터 필터링
  const filterData = () => {
    let dataList = flatData;

    if (stateList !== null) {
      dataList = flatData.filter(item => item.state === stateList);
    }

    const paginatedData: BusinessApplyType[][] = [];
    for (let i = 0; i < dataList.length; i += 10) {
      paginatedData.push(dataList.slice(i, i + 10));
    }

    setFilteredData(paginatedData);
    setMaxPage(paginatedData.length || 1);
    setCurrentPage(1);
  };
  const filterDataWithSearch = () => {
    let dataList = flatData;

    if (searchKeyword) {
      dataList = flatData.filter(item =>
        item.businessName.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    }

    if (stateList !== null) {
      dataList = dataList.filter(item => item.state === stateList);
    }

    const paginatedData: BusinessApplyType[][] = [];
    for (let i = 0; i < dataList.length; i += 10) {
      paginatedData.push(dataList.slice(i, i + 10));
    }

    setFilteredData(paginatedData);
    setMaxPage(paginatedData.length || 1);
    setCurrentPage(1);
  };
  // 승인 , 취소 Api
  //승인 Api
  const approveReq = async (businessId: number) => {
    try {
      const res = await loginApi.post(
        `/api/admin/businessApprove?businessId=${businessId}`,
      );
      if (res.data.resultData === 1) {
        setApprove(false);
        getAllData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 취소 Api
  const cancelReq = async (businessId: number) => {
    try {
      const data = {
        businessId: businessId,
        rejectContents: comment,
      };
      const res = await loginApi.post("/api/admin/businessReject", data);
      if (res) {
        setCancel(false);
        setComment("");
        getAllData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 사진 모달 open
  const openPicModal = (papers: string | string[]) => {
    if (typeof papers === "string") {
      setPicList([papers]);
    } else {
      setPicList(papers);
    }

    setPicModal(true);
  };
  //사진 모달 close
  const closePicModal = () => {
    setPicModal(false);
    setPicList([]);
  };

  //  필터링 실행
  useEffect(() => {
    filterData();
  }, [stateList, flatData]);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    filterDataWithSearch();
  }, [searchKeyword, stateList]);

  const currentData = filteredData[currentPage - 1] || [];

  return (
    <RequestBusiContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="tit">업체 등록 요청</h2>
        <input
          type="text"
          placeholder="업체 이름 검색"
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
          style={{
            padding: "5px",
            fontSize: "16px",
            width: "100%",
            maxWidth: "300px",
            height: "40px",
            border: "2px solid #f6f6f6",
            borderRadius: "5px",
          }}
        />
      </div>

      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              <th>등록 접수일</th>
              <th>사업자 등록증</th>
              <th>서비스 종류</th>
              <th>신청자</th>
              <th>업체 이름</th>
              <th>
                <select
                  value={stateList ?? ""} // stateList가 null일 경우 빈 값으로 설정
                  onChange={e =>
                    setStateList(e.target.value ? Number(e.target.value) : null)
                  }
                  style={{
                    border: "1px solid black",
                    borderRadius: "6px",
                    padding: "2px",
                    cursor: "pointer",
                  }}
                >
                  <option value="">전체 보기</option>
                  <option value="100">수락 대기</option>
                  <option value="101">수락 완료</option>
                  <option value="120">요청 취소</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <EmptyMessage colSpan={6}>
                  등록 요청 업체가 없습니다
                </EmptyMessage>
              </tr>
            ) : (
              currentData.map(item => (
                <tr key={item.businessId}>
                  <td>{item.applicationCreatedAt}</td>
                  <td>
                    {item.paper ? (
                      <PhotoButton onClick={() => openPicModal(item.paper)}>
                        사진 보기
                      </PhotoButton>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{item.detailTypeName}</td>
                  <td>{item.userName}</td>
                  <td>{item.businessName}</td>
                  <td>
                    {item.state === 120 ? (
                      <CancelDone>취소 완료</CancelDone>
                    ) : item.state === 100 ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          margin: "0 auto",
                          justifyContent: "center",
                        }}
                      >
                        <PhotoButton
                          onClick={() => {
                            if (cancel === true) {
                              setCancel(false);
                            }
                            setSelectedBusinessId(item.businessId);
                            setApprove(true);
                          }}
                        >
                          수락
                        </PhotoButton>
                        <CancelsButton
                          onClick={() => {
                            if (approve === true) {
                              setApprove(false);
                            }
                            setSelectedBusinessId(item.businessId);
                            setCancel(true);
                          }}
                        >
                          취소
                        </CancelsButton>
                      </div>
                    ) : (
                      <StatusDone>수락 완료</StatusDone> // 아무것도 표시하지 않으려면 <></> 또는 null을 사용해도 됨
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </TableContainer>
      </TableWrapper>

      {/* ✅ 페이지네이션 UI 추가 */}
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
      {(cancel || approve) && (
        <div
          style={overlayStyle}
          onClick={() => {
            setCancel(false);
            setApprove(false);
          }}
        >
          <div
            style={modalStyle as React.CSSProperties}
            onClick={e => e.stopPropagation()}
          >
            {cancel && (
              <>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="취소 사유를 입력해주세요"
                  style={textareaStyle}
                />
                <div style={modalButtonContainerStyle}>
                  <ApplyButton onClick={() => cancelReq(selectedBusinessId)}>
                    완료
                  </ApplyButton>
                  <CancelButton onClick={() => setCancel(false)}>
                    취소
                  </CancelButton>
                </div>
              </>
            )}

            {approve && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80px",
                  }}
                >
                  <span style={modalTitleStyle}>진짜 수락하시겠습니까?</span>
                </div>

                <div style={modalButtonContainerStyle}>
                  <ApplyButton onClick={() => approveReq(selectedBusinessId)}>
                    수락
                  </ApplyButton>
                  <CancelButton onClick={() => setApprove(false)}>
                    취소
                  </CancelButton>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {picModal && (
        <div style={overlayStyle} onClick={closePicModal}>
          <div
            style={{
              ...PicmodalStyle,
              padding: "20px",
              textAlign: "center",
              position: "relative",
              width: "90vw", // 화면 너비의 90%까지 확장
              maxWidth: "800px", // 최대 너비 제한
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closePicModal}
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

            <h3>사업자 등록증</h3>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                margin: "0 auto",
                flexDirection: "column",
                marginTop: "10px",
                alignItems: "center",
                width: "100%", // 부모 크기에 맞춤
              }}
            >
              {Array.isArray(picList) && picList.length > 0 ? (
                picList.map((paper, index) => (
                  <div
                    key={index}
                    style={{
                      width: "90%", // 부모 크기의 90%만큼 확장
                      maxWidth: "600px", // 최대 너비 제한
                      aspectRatio: "4 / 5", // 기존보다 높이를 더 확보 (세로 비율 증가)
                      minHeight: "400px", // 최소 높이 설정 (너무 작아지지 않도록)
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#f9f9f9",
                      border: "1px solid #ddd",
                    }}
                  >
                    <img
                      src={`${picURL}${paper}`}
                      alt={`사업자 등록증 ${index + 1}`}
                      className="object-cover rounded-md shrink-0 cursor-pointer"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // 원본 비율 유지
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>이미지가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </RequestBusiContainer>
  );
};

export default RequestBusi;
