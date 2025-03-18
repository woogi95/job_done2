import React, { useEffect, useState } from "react";
import axios from "axios";

const KakaoMaps2 = () => {
  const [businessList, setBusinessList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        // 서버에 유저 위치 전송 및 업체 정보 요청
        axios
          .get(`/api/business/kakaoMap`, {
            params: { userLat: latitude, userLng: longitude },
          })
          .then(response => {
            setBusinessList(response.data.businessList);
          })
          .catch(error => {
            console.error("Error fetching business data:", error);
          });
      });
    }
  }, []);
  useEffect(() => {
    if (userLocation && businessList && businessList.length > 0) {
      console.log("Initializing map...");
      console.log("Kakao Map Key:", import.meta.env.VITE_KAKAO_MAP_KEY);
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        console.log("Kakao Map script loaded");
        const { latitude, longitude } = userLocation;
        const mapContainer = document.getElementById("map");
        console.log("Map container:", mapContainer);
        console.log(
          "Map container size:",
          mapContainer.offsetWidth,
          mapContainer.offsetHeight,
        );
        if (!mapContainer) {
          console.error("Map container not found");
          return;
        }
        const mapOption = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 5,
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        console.log("Map initialized:", map);
        // 사용자 위치 마커
        const userMarker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(latitude, longitude),
        });
        const userInfoWindow = new kakao.maps.InfoWindow({
          content: "<div>내 위치</div>",
        });
        userInfoWindow.open(map, userMarker);
        // 업체 위치 마커
        businessList.forEach(business => {
          const businessMarker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(business.lat, business.lng),
          });
          const businessInfoWindow = new kakao.maps.InfoWindow({
            content: `<div style="text-align:center;">${business.businessName}</div>`,
          });
          businessInfoWindow.open(map, businessMarker);
        });
      };
      script.onerror = error => {
        console.error("Failed to load Kakao Map script:", error);
      };
    }
  }, [userLocation, businessList]);
  return (
    <div>
      <h1>업체 위치</h1>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default KakaoMaps2;
