import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Intermediary,
  LinkToSignUp,
  ServiceCenter,
  TotalUserAnime,
} from "../components/animes/animes";
import {
  FramerMotionSlider,
  FramerMotionSlider2,
  FramerMotionSlider3,
} from "../components/freamers/framers";
import { LetTopLayout } from "../components/layouts/LetTopLayout";
import { EventBanner } from "../components/ServiceIcon";
import { fetchWeather } from "../components/weather/Weather";
import {
  BusinessItem,
  Region,
  StealReview,
  WeatherDisplayItem,
  WeatherItem,
} from "../types/TypeBox";
import { ServiceSkeleton } from "../components/skeleton/ServiceSkeleton";
import CustomSwiper from "../utils/CustomSwiper";

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState<number>(1);
  const [TopLayoutVisible, setTopLayoutVisible] = useState<boolean>(false);
  const BASE_URL = "https://job-done.r-e.kr:52340";
  const [weatherItems, setWeatherItems] = useState<WeatherDisplayItem[]>([]);
  const [_currentDate, setCurrentDate] = useState("");
  const [_currentWeather, setCurrentWeather] = useState<WeatherItem | null>(
    null,
  );
  const [logo, setLogo] = useState<BusinessItem[]>([]);
  const [stealReview, setStealReview] = useState<StealReview[]>([]);

  const LOGO_URL = "https://job-done.r-e.kr:52340";

  const justWantLogo = async () => {
    try {
      const res = await axios.get("/api/business");
      if (
        Array.isArray(res.data.resultData) &&
        res.data.resultData.length > 0
      ) {
        setLogo(res.data.resultData);
      } else {
        setLogo([]);
      }
    } catch (error) {
      console.log(error);
      setLogo([]);
    }
  };

  useEffect(() => {
    justWantLogo();
  }, []);

  const regionNames: { [key: number]: string } = {
    1: "대구",
    2: "구미",
    3: "경주",
    4: "포항",
    5: "부산",
  };
  const weatherRegion: { [key: string]: string } = {
    1: "daegu",
    2: "gumi",
    3: "gyeongju",
    4: "pohang",
    5: "busan",
  };

  const [regions] = useState<Region[]>(
    Array.from({ length: 5 }, (_, i) => ({
      regionId: i + 1,
      region: regionNames[i + 1],
    })),
  );

  const fetchBusinessData = async (
    regionId: number,
    sortType: string,
  ): Promise<BusinessItem[]> => {
    const response = await axios.get("/api/business", {
      params: {
        regionId,
        sortType,
      },
    });
    return response.data.resultData;
  };

  const { data: popularData } = useQuery<BusinessItem[]>({
    queryKey: ["business", selectedRegion, "인기순"],
    queryFn: () => fetchBusinessData(selectedRegion, "인기순"),
  });

  const { data: latestData } = useQuery<BusinessItem[]>({
    queryKey: ["business", selectedRegion, "최신순"],
    queryFn: () => fetchBusinessData(selectedRegion, "최신순"),
  });

  const { data: cheapestData } = useQuery<BusinessItem[]>({
    queryKey: ["business", selectedRegion, "저가순"],
    queryFn: () => fetchBusinessData(selectedRegion, "저가순"),
  });

  const categories: {
    popular: BusinessItem[];
    latest: BusinessItem[];
    cheapest: BusinessItem[];
  } = {
    popular: popularData || [],
    latest: latestData || [],
    cheapest: cheapestData || [],
  };

  const allReview = async () => {
    try {
      const res = await axios.get("/api/review/main");
      setStealReview(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allReview();
  }, []);

  useEffect(() => {
    const regionName = weatherRegion[selectedRegion];
    fetchWeather(
      regionName,
      setWeatherItems,
      setCurrentDate,
      setCurrentWeather,
    );
  }, [selectedRegion]);

  useEffect(() => {
    const handleScroll = () => {
      // console.log(window.scrollY);
      if (window.scrollY >= 750) {
        setTopLayoutVisible(true);
      } else {
        setTopLayoutVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 3200) {
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 750) {
        setTopLayoutVisible(true);
      } else {
        setTopLayoutVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* 스크롤 800px 추가 레이아웃 */}
      {LetTopLayout({
        regions,
        TopLayoutVisible,
        selectedRegion,
        setSelectedRegion,
      })}

      <div>
        {/* 이벤트 배너 */}
        <div className="relative lg-custom:h-[500px] md-custom:h-[400px] md:h-[300px] h-[200px] overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="w-full"
          >
            {EventBanner.map((item, index) => (
              <SwiperSlide key={`banner-${index}-${item.id}`}>
                <Link to={item.link} className="block h-full relative">
                  <img
                    src={item.image}
                    alt="이벤트배너"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center"></div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 지역 아이콘 */}
        <div className="bg-white/50 backdrop-blur-sm my-[30px]">
          <div className="flex justify-center items-center py-[80px]">
            <div className="flex gap-8 ms-muinus:flex-wrap ms-muinus:max-w-[375px] ms-muinus:justify-center">
              {regions.map(region => (
                <a
                  key={region.regionId}
                  onClick={e => {
                    e.preventDefault();
                    setSelectedRegion(region.regionId);
                  }}
                  href={`/?region=${region.regionId}`}
                  className={`md:h-[120px] md:w-[120px] sm:h-[100px] sm:w-[100px] h-[80px] w-[80px] rounded-2xl relative group overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-2
                    ${
                      selectedRegion === region.regionId
                        ? "bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30"
                        : "bg-white shadow-lg hover:shadow-xl"
                    }`}
                >
                  <div
                    className={`absolute inset-0 flex items-center justify-center rounded-2xl text-[22px] font-bold transition-colors
                    ${selectedRegion === region.regionId ? "text-white" : "text-gray-700"}`}
                  >
                    {region.region}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 날씨 */}
      <div className="h-[200px] md-2-munus:my-[60px]">
        <div className="flex flex-col gap-[10px] max-w-[1100px] mx-auto px-4">
          <span className="flex justify-center text-[18px] font-bold mb-[20px]">
            이번 주 날씨
          </span>
          <div className="flex mx-auto gap-[20px]" id="weather-container">
            {weatherItems.map((item, index) => (
              <div
                key={item.date}
                className={`flex flex-col items-center justify-center ${
                  index === weatherItems.length - 1 ? "hidden sm:flex" : ""
                } ${index >= 4 ? "hidden md:flex" : ""}`}
              >
                <div className="text-[18px] font-semibold">
                  {item.averageTemp}°C
                </div>
                <img src={item.iconUrl} alt="날씨 아이콘" />
                <div className="text-[16px] font-semibold">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="bg-white/30 backdrop-blur-sm md:py-10">
        <div className="max-w-[1280px] m-auto">
          {/* 인기 글 */}
          <div className="lg-custom:flex mb-[80px] md-custom:mx-[20px] md:mx-[20px] mx-[20px]">
            <div className="md-2-munus:flex md-custom:py-[20px]">
              <div className="flex md:flex-col justify-center items-center lg-custom:w-[200px] lg-custom:h-[400px] lg-custom:mx-4 md:my-8 md:gap-5 mx-3 mt-[50px]">
                <span className="text-[28px] font-bold text-[#e74964] ">
                  현재 인기
                </span>
                <span className="md:text-[20px] px-2 text-[28px] font-medium">
                  서비스
                </span>
              </div>
            </div>
            {categories.popular && categories.popular.length > 0 ? (
              <Swiper
                modules={[Pagination]}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                  dynamicMainBullets: 3,
                }}
                breakpoints={{
                  375: { slidesPerView: 2 },
                  480: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 3 },
                  930: { slidesPerView: 4 },
                }}
                spaceBetween={15}
                className="py-[20px] [&_.swiper-pagination]:bottom-0 [&_.swiper-pagination-bullet]:w-[25px]
                [&_.swiper-pagination-bullet]:h-[5px] [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:mx-1"
              >
                {categories.popular.map((item, index) => (
                  <SwiperSlide key={`popular-${item.businessId}-${index}`}>
                    <Link
                      to={`/service/${item.businessId}`}
                      className="flex flex-col rounded-xl w-full gap-[10px] relative group overflow-hidden
                      bg-white p-[10px] shadow-lg hover:shadow-xl transition-all duration-100 hover:-translate-y-1
                      md:h-[400px] h-[260px]"
                    >
                      <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                        <img
                          src={`${BASE_URL}${item.pic}`}
                          alt="사진"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="block w-full overflow-hidden font-medium md:text-lg text-[16px] line-clamp-3 md-2-munus:truncate">
                        {item.title}
                      </span>
                      <div className="mt-auto">
                        <span className="text-[20px] font-bold text-blue-600 block truncate">
                          {item.price.toLocaleString()}원~
                        </span>
                        <div className="flex justify-between text-[15px] items-center">
                          <span className="text-gray-600 truncate max-w-[120px]">
                            {item.businessName}
                          </span>
                          <span className="flex justify-center items-center gap-[3px] bg-gray-50 px-3 py-1 rounded-full">
                            <FaStar className="text-[#FF9D00]" />
                            <span className="font-medium">{item.scoreAvg}</span>
                            <span className="text-gray-400">{`(${item.serviceCount})`}</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex w-full gap-[15px]">
                {[...Array(4)].map((_, index) => (
                  <ServiceSkeleton key={`popular-skeleton-${index}`} />
                ))}
              </div>
            )}
          </div>

          {/* 최신 글 */}
          <div className="lg-custom:flex mb-[80px] md-custom:mx-[20px] md:mx-[20px] mx-[20px]">
            <div className="md-2-munus:flex md-custom:py-[20px]">
              <div
                className="flex md:flex-col justify-center items-center lg-custom:w-[200px]
              lg-custom:h-[400px] lg-custom:mx-4 md:my-8 md:gap-5 mx-3 mt-[50px]"
              >
                <span className="text-[28px] font-bold text-[#4889dd]">
                  최근 등록된
                </span>
                <span className="md:text-[20px] px-2 text-[28px] font-medium">
                  서비스
                </span>
              </div>
            </div>
            {categories.latest && categories.latest.length > 0 ? (
              <Swiper
                modules={[Pagination]}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                  dynamicMainBullets: 3,
                }}
                breakpoints={{
                  375: { slidesPerView: 2 },
                  480: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 3 },
                  930: { slidesPerView: 4 },
                }}
                spaceBetween={15}
                className="py-[20px] [&_.swiper-pagination]:bottom-0 [&_.swiper-pagination-bullet]:w-[25px]
                [&_.swiper-pagination-bullet]:h-[5px] [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:mx-1"
              >
                {categories.latest.map((item, index) => (
                  <SwiperSlide key={`latest-${item.businessId}-${index}`}>
                    <Link
                      to={`/service/${item.businessId}`}
                      className="flex flex-col rounded-xl w-full gap-[10px] relative group overflow-hidden
                      bg-white p-[10px] shadow-lg hover:shadow-xl transition-all duration-100 hover:-translate-y-1
                      md:h-[400px] h-[260px]"
                    >
                      <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                        <img
                          src={`${BASE_URL}${item.pic}`}
                          alt="사진"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="block w-full overflow-hidden font-medium md:text-lg text-[16px] line-clamp-3 truncate">
                        {item.title}
                      </span>
                      <div className="mt-auto">
                        <span className="text-[20px] font-bold text-blue-600 block truncate">
                          {item.price.toLocaleString()}원~
                        </span>
                        <div className="flex justify-between text-[15px] items-center">
                          <span className="text-gray-600 truncate max-w-[120px]">
                            {item.businessName}
                          </span>
                          <span className="flex justify-center items-center gap-[3px] bg-gray-50 px-3 py-1 rounded-full">
                            <FaStar className="text-[#FF9D00]" />
                            <span className="font-medium">{item.scoreAvg}</span>
                            <span className="text-gray-400">{`(${item.serviceCount})`}</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex w-full gap-[15px]">
                {[...Array(4)].map((_, index) => (
                  <ServiceSkeleton key={`latest-skeleton-${index}`} />
                ))}
              </div>
            )}
          </div>

          {/* 최저가 글 */}
          <div className="lg-custom:flex mb-[80px] md-custom:mx-[20px] md:mx-[20px] mx-[20px]">
            <div className="md-2-munus:flex md-custom:py-[20px]">
              <div className="flex md:flex-col justify-center items-center lg-custom:w-[200px] lg-custom:h-[400px] lg-custom:mx-4 md:my-8 md:gap-5 mx-3 mt-[50px]">
                <span className="text-[28px] font-bold text-[#e4b041]">
                  최저가
                </span>
                <span className="md:text-[20px] px-2 text-[28px] font-medium">
                  서비스
                </span>
              </div>
            </div>
            {categories.cheapest && categories.cheapest.length > 0 ? (
              <Swiper
                modules={[Pagination]}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                  dynamicMainBullets: 3,
                }}
                breakpoints={{
                  375: { slidesPerView: 2 },
                  480: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 3 },
                  930: { slidesPerView: 4 },
                }}
                spaceBetween={15}
                className="py-[20px] [&_.swiper-pagination]:bottom-0 [&_.swiper-pagination-bullet]:w-[25px] [&_.swiper-pagination-bullet]:h-[5px] [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:mx-1"
              >
                {categories.cheapest.map((item, index) => (
                  <SwiperSlide key={`cheapest-${item.businessId}-${index}`}>
                    <Link
                      to={`/service/${item.businessId}`}
                      className="flex flex-col rounded-xl w-full gap-[10px] relative group overflow-hidden
                      bg-white p-[10px] shadow-lg hover:shadow-xl transition-all duration-100 hover:-translate-y-1
                      md:h-[400px] h-[260px]"
                    >
                      <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                        <img
                          src={`${BASE_URL}${item.pic}`}
                          alt="사진"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="block w-full overflow-hidden font-medium md:text-lg text-[16px] line-clamp-3 truncate">
                        {item.title}
                      </span>
                      <div className="mt-auto">
                        <span className="text-[20px] font-bold text-blue-600 block truncate">
                          {item.price.toLocaleString()}원~
                        </span>
                        <div className="flex justify-between text-[15px] items-center">
                          <span className="text-gray-600 truncate max-w-[120px]">
                            {item.businessName}
                          </span>
                          <span className="flex justify-center items-center gap-[3px] bg-gray-50 px-3 py-1 rounded-full">
                            <FaStar className="text-[#FF9D00]" />
                            <span className="font-medium">{item.scoreAvg}</span>
                            <span className="text-gray-400">{`(${item.serviceCount})`}</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex w-full gap-[15px]">
                {[...Array(4)].map((_, index) => (
                  <ServiceSkeleton key={`cheapest-skeleton-${index}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 회원가입 배너 */}
      <div className="m-auto py-[80px] bg-gradient-to-b from-[#ffffff] to-[#7395f1]">
        <LinkToSignUp />
        {/* 총 이용자 수 */}
        <TotalUserAnime />
      </div>

      {/* 기업 로고들 */}
      <div className="bg-[#7395f1]">
        <div className="flex justify-center items-center bg-[#7395f1] h-[200px]">
          <span className="md:text-[40px] text-[32px] font-bold text-[#ffffff]">
            믿을 수 있는 기업들이 함께 합니다.
          </span>
        </div>
        <div className="bg-gradient-to-b from-[#7395f1] to-[#ffffff] h-[400px] m-auto">
          <CustomSwiper />
          <FramerMotionSlider items={logo.slice(0, 20)} LOGO_URL={LOGO_URL} />
          <FramerMotionSlider2 items={logo.slice(20, 40)} LOGO_URL={LOGO_URL} />
        </div>
      </div>

      {/* 믿음과 신뢰 */}
      <div className="flex justify-center items-center bg-[#ffffff] h-[600px]">
        <div className="flex flex-col gap-5 justify-center items-center">
          <span className="text-[48px] my-20 font-bold text-[#1e1e1e]">
            지속되는 고평가 후기들
          </span>
          <FramerMotionSlider3
            items={stealReview.slice(0, 17)}
            LOGO_URL={LOGO_URL}
          />
        </div>
      </div>

      {/* 중개 절차 */}
      <div className="mt-[200px]">
        <Intermediary />
      </div>

      {/* 고객문의 */}
      <div className="mt-[100px]">
        <ServiceCenter />
      </div>
    </div>
  );
};

export default Index;
