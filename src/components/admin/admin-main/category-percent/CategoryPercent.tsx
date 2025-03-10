import { useState, useEffect, useRef } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useRecoilState } from "recoil";
import { StateCatePerType } from "../../../../types/type";
import { stateCatePerAtom } from "../../../../atoms/third-atoms/admin/mainAtom";

const CategoryPercent = () => {
  const [catePerData] = useRecoilState<StateCatePerType[]>(stateCatePerAtom);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // ✅ 카테고리 데이터 가공 (퍼센트만 차트에 사용, 개수 포함)
  const categoryData = catePerData.map(category => ({
    id: category.categoryName,
    value: category.categoryPercent, // ✅ 차트는 퍼센트 값으로 표시
    count: category.categoryCount, // ✅ 툴팁 & 라벨에 사용
  }));

  // ✅ 세부 유형 데이터 가공
  const detailTypeData: Record<
    string,
    { id: string; value: number; count: number }[]
  > = {};
  catePerData.forEach(category => {
    detailTypeData[category.categoryName] = category.detailTypeCounts.map(
      detail => ({
        id: detail.detailTypeName,
        value: detail.detailTypePercent, // ✅ 퍼센트 기반 차트
        count: detail.count, // ✅ 툴팁 & 라벨에 사용
      }),
    );
  });

  // ✅ 카테고리 클릭 시 모달 열기
  const handleCategoryClick = (data: { id: string }) => {
    setSelectedCategory(data.id);
    setIsModalOpen(true);
  };

  // ✅ 바깥 클릭 시 모달 닫기
  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  // ✅ 이벤트 리스너 추가 및 제거
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isModalOpen]);

  return (
    <div style={{ width: "100%", height: "90%" }}>
      {/* ✅ 메인 카테고리 Pie Chart */}
      <ResponsivePie
        data={categoryData}
        margin={{ top: 10, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "set2" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 20,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
        onClick={handleCategoryClick} // ✅ 클릭 이벤트
        tooltip={({ datum }) => (
          <div
            style={{
              background: "white",
              padding: "6px 10px",
              borderRadius: "4px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              fontSize: "14px",
            }}
          >
            <strong>{datum.id}</strong>: {datum.value.toFixed(2)}% (
            {datum.data.count}개)
          </div>
        )}
      />

      {/* ✅ 모달창 (카테고리 내 세부 유형 Pie Chart) */}
      {isModalOpen && selectedCategory && detailTypeData[selectedCategory] && (
        <div
          ref={modalRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            width: "50%",
            height: "50%",
            zIndex: 100,
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            {selectedCategory} 세부 유형 비율
          </h3>
          <ResponsivePie
            data={detailTypeData[selectedCategory]}
            margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
            innerRadius={0.3}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "pastel1" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            tooltip={({ datum }) => (
              <div
                style={{
                  background: "white",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                  fontSize: "14px",
                }}
              >
                <strong>{datum.id}</strong>: {datum.value.toFixed(2)}% (
                {datum.data.count}개)
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryPercent;
