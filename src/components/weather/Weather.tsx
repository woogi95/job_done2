import axios from "axios";
import {
  WeatherDisplayItem,
  WeatherItem,
  WeatherMapItem,
} from "../../types/TypeBox";

export const fetchWeather = (
  location: string,
  setWeatherItems: (items: WeatherDisplayItem[]) => void,
  setCurrentDate: (date: string) => void,
  setCurrentWeather: (weather: WeatherItem) => void,
) => {
  axios
    .get("/api/weather", {
      params: {
        location: encodeURIComponent(location),
      },
    })
    .then(response => {
      const data = response.data;
      const weatherMap: { [key: string]: WeatherMapItem } = {};
      data.list.forEach((item: WeatherItem) => {
        const date = new Date(item.dt * 1000);
        const options: Intl.DateTimeFormatOptions = {
          weekday: "short",
          month: "short",
          day: "numeric",
        };
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
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
      };
      setCurrentDate(today.toLocaleDateString("ko-KR", options));
      setCurrentWeather(data.list[0]);
      // console.log(data.list[0]);
    })
    .catch(error => console.error("날씨 정보를 가져오지 못했습니다:", error));
};
