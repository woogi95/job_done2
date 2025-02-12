import axios from "axios";
import { useRecoilState } from "recoil";
import { businessDInfo } from "../../../atoms/businessAtom";

const [busiInfo, setBusiInfo] = useRecoilState(businessDInfo);

const businessPage = async userId => {
  try {
    const res = await axios.get(`/api/business/{data.businessId}`);
    if (res) {
      setBusiInfo(res.resultData);
    }
  } catch (error) {
    console.log(error);
  }
};
