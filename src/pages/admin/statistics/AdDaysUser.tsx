import DaysUser from "../../../components/admin/admin-main/days-user/DaysUser";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 90%;
  height: 85%;
  margin: 40px auto;
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
    <Container>
      <div style={{ display: "flex", margin: "left" }}>
        <h2 className="tit">견적관리</h2>
      </div>
      <DaysUser />
    </Container>
  );
};

export default AdDaysUser;
