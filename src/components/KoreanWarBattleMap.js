import React, { useEffect, useRef } from "react";

const KoreanWarBattleMap = () => {
  const mapRef = useRef(null);
  const northPolylineRef = useRef(null); // 북한군 경로
  const southPolylineRef = useRef(null); // 국군·UN군 경로
  const markersRef = useRef([]);
  const northPathRef = useRef([]); // 북한군 경로 리스트
  const southPathRef = useRef([]); // 국군·UN군 경로 리스트

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=8q6h69e47y";
    script.async = true;
    script.onload = () => {
      if (window.naver) {
        const mapInstance = new window.naver.maps.Map("map", {
          center: new window.naver.maps.LatLng(36.5, 127.5), // 한반도 중심
          zoom: 7,
          mapTypeId: window.naver.maps.MapTypeId.NORMAL,
        });

        mapRef.current = mapInstance;

        // ✅ 초기 북한군 Polyline 생성 (빨간색)
        northPolylineRef.current = new window.naver.maps.Polyline({
          path: [],
          strokeColor: "#FF0000", // 북한군 경로는 빨간색
          strokeWeight: 4,
          strokeOpacity: 0.8,
          map: mapInstance,
        });

        // ✅ 초기 국군·UN군 Polyline 생성 (파란색)
        southPolylineRef.current = new window.naver.maps.Polyline({
          path: [],
          strokeColor: "#0000FF", // 국군·UN군 경로는 파란색
          strokeWeight: 4,
          strokeOpacity: 0.8,
          map: mapInstance,
        });

        // ✅ 동적 전투 흐름 애니메이션 시작
        startDrawingPath();
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const startDrawingPath = () => {
    const warRoutes = [
        { lat: 38.613, lng: 127.478, name: "전쟁 발발 (1950.06.25)", description: "북한군 남침 개시", side: "north" },
        { lat: 37.5665, lng: 126.978, name: "서울 함락 (1950.06.28)", description: "북한군 서울 점령", side: "north" },
        { lat: 36.336, lng: 127.394, name: "대전 전투 (1950.07.16)", description: "국군·미군 방어전", side: "north" },
        { lat: 35.8714, lng: 128.6014, name: "대구 전투 (1950.08.05)", description: "낙동강 방어선의 일부", side: "north" },
        { lat: 35.155, lng: 129.064, name: "부산 방어 (1950.08.10)", description: "최후 방어선 구축", side: "north" },
        { lat: 37.4602, lng: 126.7085, name: "인천상륙작전 (1950.09.15)", description: "UN군 반격 개시", side: "south" },
        { lat: 37.5665, lng: 126.978, name: "서울 탈환 (1950.09.28)", description: "국군·UN군 서울 탈환", side: "south" },
        { lat: 38.316, lng: 126.857, name: "38선 돌파 (1950.10.01)", description: "국군 북진 시작", side: "south" },
        { lat: 39.019, lng: 125.752, name: "평양 탈환 (1950.10.19)", description: "국군·UN군 평양 진격", side: "south" },
        { lat: 40.140, lng: 127.451, name: "청천강 전투 (1950.11.05)", description: "중공군 개입 전투", side: "north" },
        { lat: 40.600, lng: 126.622, name: "장진호 전투 (1950.11.27)", description: "UN군 철수, 국군 후퇴", side: "north" },
        { lat: 39.053, lng: 125.755, name: "평양 철수 (1950.12.05)", description: "국군·UN군 평양 철수", side: "south" },
        { lat: 37.5665, lng: 126.978, name: "서울 재함락 (1951.01.04)", description: "중공군, 북한군 서울 점령", side: "north" },
        { lat: 37.888, lng: 127.728, name: "횡성 전투 (1951.02.03)", description: "국군 반격, 중공군 방어", side: "south" },
        { lat: 37.5665, lng: 126.978, name: "서울 재탈환 (1951.03.14)", description: "국군·UN군 서울 재탈환", side: "south" },
        { lat: 38.203, lng: 127.088, name: "휴전선 형성 (1951~1953)", description: "백마고지, 저격능선 등 주요 고지전", side: "north" }
      ];
      

    const animatePath = (index) => {
      if (index >= warRoutes.length) return;

      const location = warRoutes[index];
      const newPoint = new window.naver.maps.LatLng(location.lat, location.lng);

      if (location.side === "north") {
        northPathRef.current.push(newPoint);
        northPolylineRef.current.setPath(northPathRef.current); // 북한군 경로 업데이트
      } else {
        southPathRef.current.push(newPoint);
        southPolylineRef.current.setPath(southPathRef.current); // 국군·UN군 경로 업데이트
      }

      // ✅ 마커 추가 (Fade-in 효과 적용)
      const marker = new window.naver.maps.Marker({
        position: newPoint,
        map: mapRef.current,
        title: location.name,
      });

      const markerElement = marker.getElement();
      if (markerElement) {
        markerElement.style.opacity = "0";
        markerElement.style.transition = "opacity 1s ease-in-out";
        setTimeout(() => {
          markerElement.style.opacity = "1";
        }, 100);
      }

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="padding:10px;"><strong>${location.name}</strong><br>${location.description}</div>`,
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        infoWindow.open(mapRef.current, marker);
      });

      markersRef.current.push(marker); // 마커 저장

      // ✅ 다음 지점 추가 (0.5초 간격으로)
      setTimeout(() => {
        animatePath(index + 1);
      }, 1000);
    };

    // ✅ 애니메이션 시작
    animatePath(0);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">한국전쟁 전투 흐름 지도</h2>
      <div id="map" className="w-full h-[800px] rounded-lg border shadow-lg"></div>
    </div>
  );
};

export default KoreanWarBattleMap;
