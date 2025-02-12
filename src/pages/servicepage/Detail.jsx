import { useEffect } from "react";
import { useParams } from "react-router-dom";
// apis
import axios from "axios";
import { useRecoilState } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
// comp
import DetailTop from "../../components/serviceDetail/DetailTop";
import DetailContents from "../../components/serviceDetail/DetailContents";

function Detail() {
  const { id } = useParams();
  const [, setBusinessDetail] = useRecoilState(businessDetailState);

  const getBusinessDetail = async businessId => {
    try {
      const res = await axios.get(
        `/api/business/${businessId}?businessId=${businessId}`,
      );
      console.log("resultData : ", res.data.resultData);
      setBusinessDetail(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      getBusinessDetail(id);
    }
  }, [id]);
  return (
    <div>
      <DetailTop />
      <DetailContents />
    </div>
  );
}

export default Detail;
