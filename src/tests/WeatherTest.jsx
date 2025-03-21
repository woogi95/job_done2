import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherTest = () => {
  const [weatherItems, setWeatherItems] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    fetchWeather("daegu"); // 기본값 대구로 설정
  }, []);

  const fetchWeather = location => {
    axios
      .get("/api/weather", {
        params: {
          location: encodeURIComponent(location),
        },
      })
      .then(response => {
        const data = response.data;
        const weatherMap = {};
        data.list.forEach(item => {
          const date = new Date(item.dt * 1000);
          const options = { weekday: "short", month: "short", day: "numeric" };
          const formattedDate = date.toLocaleDateString("ko-KR", options);

          if (!weatherMap[formattedDate]) {
            weatherMap[formattedDate] = {
              tempSum: 0,
              count: 0,
              weatherDescription: item.weather[0].description,
              iconCode: item.weather[0].icon,
            };
          }
          weatherMap[formattedDate].tempSum += item.main.temp;
          weatherMap[formattedDate].count += 1;
        });

        const items = Object.keys(weatherMap).map(date => {
          const weatherInfo = weatherMap[date];
          const averageTemp = (weatherInfo.tempSum / weatherInfo.count).toFixed(
            1,
          );
          const iconUrl = `http://openweathermap.org/img/wn/${weatherInfo.iconCode}@2x.png`;
          return {
            date,
            averageTemp,
            iconUrl,
            description: weatherInfo.weatherDescription,
          };
        });

        setWeatherItems(items);
        const today = new Date();
        const options = { month: "long", day: "numeric" };
        setCurrentDate(today.toLocaleDateString("ko-KR", options));
        setCurrentWeather(data.list[0]);
      })
      .catch(error => console.error("날씨 정보를 가져오지 못했습니다:", error));
  };

  return (
    <div className="flex flex-col gap-[10px] max-w-[1100px] mx-auto px-4">
      <span className="flex justify-center text-[18px] font-bold">
        현재 날씨
      </span>
      <div
        id="current-weather"
        className="flex flex-col gap-[5px] items-center justify-center"
      >
        <div className="text-[20px] font-bold">
          {currentWeather.main?.temp.toFixed(1)}°C
        </div>
        <div>{currentWeather.weather?.[0]?.description}</div>
        <img
          src={`http://openweathermap.org/img/wn/${currentWeather.weather?.[0]?.icon}@2x.png`}
          alt="날씨 아이콘"
        />
        <div id="current-date">{currentDate}</div>
      </div>

      <span className="flex justify-center text-[18px] font-bold mb-[20px]">
        이번 주 날씨
      </span>
      <div className="flex mx-auto gap-[20px]" id="weather-container">
        {weatherItems.map(item => (
          <div
            key={item.date}
            className="flex flex-col items-center justify-center"
          >
            <div className="text-[16px] font-semibold">
              {item.averageTemp}°C
            </div>
            <img src={item.iconUrl} alt="날씨 아이콘" />
            <div className="text-[16px] font-semibold">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherTest;
