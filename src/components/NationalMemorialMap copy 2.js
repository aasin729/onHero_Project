import React, { useEffect, useState } from "react";

const NationalMemorialMap = () => {
  const [markers, setMarkers] = useState([]); // 마커 데이터를 저장할 상태

  useEffect(() => {
    // 네이버 맵 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=8q6h69e47y";
    script.async = true;
    script.onload = () => {
      if (window.naver) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.50130234388042, 126.97336693184688),
          zoom: 17,
          mapTypeId: window.naver.maps.MapTypeId.SATELLITE,
        };

        const map = new window.naver.maps.Map("map", mapOptions);

        // 지도 클릭 이벤트
        window.naver.maps.Event.addListener(map, "click", (e) => {
          const lat = e.coord.lat(); // 위도 값
          const lng = e.coord.lng(); // 경도 값

          // 디버깅용 로그: 클릭한 위치 확인
          console.log("클릭한 위치:", { lat, lng });

          // 묘역명 입력받기
          const burialName = prompt("묘역명을 입력하세요:");
          if (!burialName) {
            alert("묘역명을 입력하지 않아 마커가 추가되지 않았습니다.");
            return;
          }

          // 새로운 마커 데이터 생성
          const newMarker = {
            lat: lat,
            lng: lng,
            burialName: burialName, // 묘역명 추가
          };

          // 디버깅용 로그: 추가될 마커 데이터 확인
          console.log("추가할 마커 데이터:", newMarker);

          // 상태 업데이트: 기존 마커에 새 마커 추가
          setMarkers((prevMarkers) => {
            const updatedMarkers = [...prevMarkers, newMarker];
            console.log("업데이트된 마커 리스트:", updatedMarkers); // 업데이트된 리스트 로그
            return updatedMarkers;
          });

          // 지도에 마커 표시
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(lat, lng),
            map: map,
            title: burialName, // 마커에 묘역명 표시
          });
        });
      } else {
        console.error("네이버 지도 객체를 로드하지 못했습니다.");
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // JSON 다운로드 함수
  const downloadJSON = () => {
    // 디버깅용 로그: 저장되는 데이터 확인
    console.log("저장할 데이터:", markers);

    const blob = new Blob([JSON.stringify(markers, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "markers.json"; // 파일 이름
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">서울국립현충원 마커 추가</h1>

      {/* 지도 */}
      <div className="w-full h-[600px] mb-6">
        <div id="map" className="w-full h-full rounded shadow-lg"></div>
      </div>

      {/* JSON 저장 버튼 */}
      <div className="text-center">
        <button
          onClick={downloadJSON}
          className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          disabled={markers.length === 0} // 마커가 없으면 버튼 비활성화
        >
          JSON 저장 ({markers.length}개 마커)
        </button>
      </div>
    </div>
  );
};

export default NationalMemorialMap;
