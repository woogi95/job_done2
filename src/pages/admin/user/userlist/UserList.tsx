import { useEffect, useState } from "react";
import { loginApi } from "../../../../apis/login";
import { UserInfoType } from "../../../../types/type";
import {
  RequestBusiContainer,
  TableWrapper,
  TableContainer,
  PaginationContainer,
  PageButton,
  // StateListButton,
} from "./userlistd";
const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1); // 🌟 현재 페이지
  const [maxPage, setMaxPage] = useState(1);
  const [flatData, setFlatData] = useState<UserInfoType[]>([]);
  const [stateList, setStateList] = useState<UserInfoType["type"]>("");
  const [filteredData, setFilteredData] = useState<UserInfoType[][]>([]);
  const getAllData = async () => {
    const allPagesData: UserInfoType[][] = [];
    const page = 1;

    const fetchData = async (pageNumber: number) => {
      try {
        const res = await loginApi.get(
          `/api/admin/userInfo?page=${pageNumber}`,
        );
        const filterData: UserInfoType[] = res.data.resultData;
        console.log(res.data.resultData);
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

    // ✅ 데이터를 모두 가져온 후에 `allData`, `flatData`, `filteredData` 업데이트
    // setAllData([...allPagesData]);

    const dataFlat = allPagesData.flat();
    setFlatData(dataFlat);

    // ✅ 초기 페이지네이션 세팅 (데이터가 있으면 1페이지부터 시작)
    const paginatedData: UserInfoType[][] = [];
    for (let i = 0; i < dataFlat.length; i += 10) {
      paginatedData.push(dataFlat.slice(i, i + 10));
    }

    setFilteredData(paginatedData);
    setMaxPage(paginatedData.length || 1); // 최소 1페이지 유지
    setCurrentPage(1); // 첫 번째 페이지로 자동 이동
  };

  // state 값 데이터 필터링
  const filterData = () => {
    let dataList = flatData;

    if (stateList !== "") {
      dataList = flatData.filter(item => item.type === stateList);
    }

    const paginatedData: UserInfoType[][] = [];
    for (let i = 0; i < dataList.length; i += 10) {
      paginatedData.push(dataList.slice(i, i + 10));
    }

    setFilteredData(paginatedData);
    setMaxPage(paginatedData.length || 1);
    setCurrentPage(1); // 필터링 시 첫 페이지로 이동
  };
  //  필터링 실행
  useEffect(() => {
    filterData();
  }, [stateList, flatData]);

  // ✅ 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    getAllData();
  }, []);

  // ✅ 현재 페이지 데이터 가져오기
  const currentData = filteredData[currentPage - 1] || [];

  return (
    <RequestBusiContainer>
      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "flex-end",
          width: "100%",
          marginBottom: "20px",
        }}
      ></div>
      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              <th>고객 이름</th>
              <th>연락처</th>
              <th>최근 요청 서비스</th>
              <th>서비스 이용 횟수</th>

              <th>
                <select
                  value={stateList ?? ""} // stateList가 null일 경우 빈 값으로 설정
                  onChange={e =>
                    setStateList(e.target.value ? e.target.value : "")
                  }
                  style={{
                    border: "1px solid black",
                    borderRadius: "6px",
                    padding: "2px",
                    cursor: "pointer",
                  }}
                >
                  <option value="">전체</option>
                  <option value="업체 사장">업체 사장</option>
                  <option value="일반유저">일반 유저</option>
                  {/* <option value="120">요청 취소</option> */}
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(item => (
              <tr key={item.userId}>
                <td>{item.userName}</td>
                <td>{item.phone}</td>
                <td>{item.detailTypeName}</td>
                <td>{item.serviceNumber}</td>
                <td>{item.type}</td>
              </tr>
            ))}
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
    </RequestBusiContainer>
  );
};

export default UserList;
