import axios from "axios";
import { useEffect, useState } from "react";

// 카테고리 등록
interface CategoryResiType {
  categoryName: string;
}
type CategoryType = {
  categoryId: number;
  categoryName: string;
};
const CategoryList = () => {
  const [cateList, setCateList] = useState<CategoryType[]>([]);

  const getCategoryList = async () => {
    try {
      const res = await axios.get("/api/category");
      setCateList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategoryList();
  }, []);
  return <div>{cateList.map(item => item.categoryName)}</div>;
};

export default CategoryList;
