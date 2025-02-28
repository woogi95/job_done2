import { useRecoilState } from "recoil";
import { requestBusiAtom } from "../../../../atoms/third-atoms/requests/requestAtom";
import { loginApi } from "../../../../apis/login";
import { useEffect } from "react";

const RequestBusi = () => {
  const [reqBusiList, setReqBusiList] = useRecoilState(requestBusiAtom);
  const getReqData = async () => {
    try {
      const page = 1;
      const res = await loginApi.get(
        `/api/admin/businessApplication?page=${page}`,
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReqData();
  }, []);
  return (
    <div>
      <h3>등록 요청 업체 목룍 </h3>
      <div>
        <table className="table-container">
          {/* 첫번째행 */}
          <thead>
            <tr>
              <th>등록 접수일</th>
              <th>사업자 등록증</th>
              <th>서비스 종류</th>
              <th>신청자</th>
              <th>업체 이름</th>
              <th>진행 상태</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default RequestBusi;
