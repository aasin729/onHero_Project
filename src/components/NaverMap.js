import React, { useEffect } from "react";

const NaverMap = () => {
  useEffect(() => {
    // 네이버 맵 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=8q6h69e47y"; // 클라이언트 ID를 입력
    script.async = true;
    script.onload = () => {
      if (window.naver) {
        // 네이버 맵 초기화
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.50130234388042, 126.97336693184688), // 국립서울현충원 좌표
          zoom: 17, // 초기 줌 레벨
          mapTypeId: window.naver.maps.MapTypeId.SATELLITE, // 위성지도 설정
        };

        const map = new window.naver.maps.Map("map", mapOptions);

        // 마커 추가
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(37.50130234388042, 126.97336693184688), // 마커 위치
          map: map, // 마커가 표시될 맵
          title: "국립서울현충원",
        });
      } else {
        console.error("네이버 지도 객체를 로드하지 못했습니다.");
      }
    };

    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>서울국립현충원 지도</h1>
      <div style={{ width: "100%", height: "500px", marginBottom: "20px" }}>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </div>
    </div>
  );
};

export default NaverMap;
