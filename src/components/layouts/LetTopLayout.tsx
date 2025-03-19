import { Region } from "../../types/TypeBox";

export const LetTopLayout = ({
  regions,
  TopLayoutVisible,
  selectedRegion,
  setSelectedRegion,
}: {
  regions: Region[];
  TopLayoutVisible: boolean;
  selectedRegion: number;
  setSelectedRegion: (id: number) => void;
}) => {
  return (
    <div
      className={`bg-[#1e1e1e] backdrop-blur-sm py-4 px-[30px] fixed top-[80px] left-0 w-full z-10 ${TopLayoutVisible ? "block" : "hidden"}`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white ms-muinus:hidden">
          뭐 먹지?
        </h1>
        <nav className="flex gap-6 justify-center items-center">
          {regions.map(region => (
            <button
              key={region.regionId}
              onClick={() => setSelectedRegion(region.regionId)}
              className={`text-[16px] font-medium ${
                selectedRegion === region.regionId
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              } transition-colors`}
            >
              {region.region}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
