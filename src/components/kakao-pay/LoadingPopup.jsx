import { LoadingDiv } from "./pay";
import { BeatLoader } from "react-spinners";

const LoadingPopup = () => {
  return (
    <LoadingDiv>
      <div className="box">
        <p>결제 중</p>
        <BeatLoader color="#ffffff80" size={8} />
      </div>
    </LoadingDiv>
  );
};

export default LoadingPopup;
