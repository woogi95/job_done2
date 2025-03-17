import DaysUser from "../../../components/admin/admin-main/days-user/DaysUser";
import styled from "@emotion/styled";
import { RequestBusiContainer } from "./chartD";

const Container = styled.div`
  width: 100%;
  height: 85%;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AdDaysUser = () => {
  return (
    <RequestBusiContainer>
      <div style={{ display: "flex", margin: "left" }}>
        <h2 className="tit">방문자 수</h2>
      </div>
      <Container>
        <DaysUser />
      </Container>
    </RequestBusiContainer>
  );
};

export default AdDaysUser;
