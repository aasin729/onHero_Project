import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import burialLocations from "../../../data/burialLocations";
import intermentStatus from "../../../data/IntermentStatus.json";

const NationalMemorialMap = () => {

    useEffect(() => {
      // AOS 초기화
      AOS.init({
        duration: 800, // 애니메이션 지속 시간
        once: false, // 애니메이션 반복 실행
        easing: "ease-in-out", // 애니메이션 효과
        offset: 50, // 애니메이션 시작 지점
      });
    }, []);

  const [burialData, setBurialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMilitary, setSelectedMilitary] = useState("");
  const [militaryOptions, setMilitaryOptions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const toggleMapModal = () => {
    setIsMapModalOpen(!isMapModalOpen);
  };

  const itemsPerPage = 15;
  const maxPageButtons = 4;

    // ✅ API 호출
    const fetchBurialData = async () => {
      setLoading(true);
      try {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const totalDataCount = 60000;
        const API_URL = `/${API_KEY}/json/DS_TB_MND_NTNLMMCMT_BURALPRSTS/1/${totalDataCount}`;
  
        const response = await axios.get(API_URL);
        const result = response?.data?.DS_TB_MND_NTNLMMCMT_BURALPRSTS?.row;
  
        if (result && Array.isArray(result)) {
          const reversedData = result.reverse();
          setBurialData(reversedData);
          setFilteredData(reversedData);
  
          const militarySet = new Set(reversedData.map((item) => item.mildsc));
          setMilitaryOptions([...militarySet]);
        } else {
          throw new Error("API 데이터 형식 오류");
        }
      } catch (error) {
        console.error("API 호출 실패:", error);
        fetchBackupData(); // ✅ API 실패 시 JSON 백업 데이터 불러오기
      } finally {
        setLoading(false);
      }
    };

   // ✅ JSON 파일에서 백업 데이터 불러오기
   const fetchBackupData = () => {
    try {
      console.log("백업 JSON 응답:", intermentStatus);
      const backupData = intermentStatus?.DATA;

      if (backupData && Array.isArray(backupData)) {
        setBurialData(backupData);
        setFilteredData(backupData);

        const militarySet = new Set(backupData.map((item) => item.mildsc));
        setMilitaryOptions([...militarySet]);
      } else {
        throw new Error("백업 JSON 데이터 형식 오류");
      }
    } catch (error) {
      console.error("백업 JSON 로드 실패:", error);
    }
  };

  useEffect(() => {
    fetchBurialData();

    const script = document.createElement("script");
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=8q6h69e47y";
    script.async = true;
    script.onload = () => {
      if (window.naver) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.499, 126.97336693184688),
          zoom: 16,
          mapTypeId: window.naver.maps.MapTypeId.SATELLITE,
        };

        const mapInstance = new window.naver.maps.Map("map", mapOptions);
        setMap(mapInstance);

        const createdMarkers = burialLocations.map((location) => {
          const isTitleOnly = [
            "봉안식장",
            "제1충혼당",
            "제2충혼당",
            "현충문",
            "현충관",
          ].includes(location.burialName);

          const markerOptions = {
            position: new window.naver.maps.LatLng(location.lat, location.lng),
            map: mapInstance,
            title: location.burialName,
          };

          if (!isTitleOnly) {
            markerOptions.icon = {
              url: "/img/light.png",
              size: new window.naver.maps.Size(35, 35),
              scaledSize: new window.naver.maps.Size(35, 35),
              origin: new window.naver.maps.Point(0, 0),
              anchor: new window.naver.maps.Point(16, 32),
            };
          }

          const marker = new window.naver.maps.Marker(markerOptions);

          const infoWindow = new window.naver.maps.InfoWindow({
            content: `<div style="padding:5px;">${location.burialName}</div>`,
            disableAnchor: true,
          });

          window.naver.maps.Event.addListener(marker, "mouseover", () => {
            infoWindow.open(mapInstance, marker);
          });

          window.naver.maps.Event.addListener(marker, "mouseout", () => {
            infoWindow.close();
          });

          return { marker, location };
        });

        setMarkers(createdMarkers);
      } else {
        console.error("네이버 지도 객체를 로드하지 못했습니다.");
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchAndFilter = () => {
    let filtered = burialData;

    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.stmt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedMilitary) {
      filtered = filtered.filter((item) => item.mildsc === selectedMilitary);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleRowClick = (index, burialName) => {
    setSelectedRowIndex(index);
    if (!map || markers.length === 0) return;

    markers.forEach(({ marker, location }) => {
      if (location.burialName === burialName) {
        marker.setMap(map);
        map.setCenter(marker.getPosition());
        map.setZoom(18);
      } else {
        marker.setMap(null);
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto p-4 md:p-20">

       <div className="col-span-2 mb-6" data-aos="fade">
          <div className="bg-white shadow-lg rounded-lg p-10 mx-auto">
            <h2 className="text-xl font-bold mb-4">검색 및 필터링</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="이름 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSelectedMilitary("")}
                className="w-full h-14 px-4 border rounded-lg shadow focus:ring-2 focus:ring-blue-400"
              />

              <select
                value={selectedMilitary}
                onChange={(e) => setSelectedMilitary(e.target.value)}
                onClick={() => setSearchQuery("")}
                className="w-full h-14 px-4 border rounded-lg shadow focus:ring-2 focus:ring-blue-400"
              >
                <option value="">군별 선택</option>
                {militaryOptions.map((military, index) => (
                  <option key={index} value={military}>
                    {military}
                  </option>
                ))}
              </select>
              
              <button
                onClick={handleSearchAndFilter}
                className="w-full h-14 px-6 bg-blue-900 text-white font-bold rounded-lg shadow hover:bg-blue-800"
              >
                검색
              </button>
              
              <button
                onClick={toggleMapModal}
                className="w-full h-14 px-6 bg-green-700 text-white font-bold rounded-lg shadow hover:bg-green-600"
              >
                현충원 지도보기
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col hidden md:flex" style={{ height: "750px" }}> 
          <h2 className="text-xl font-bold mb-4">서울국립현충원 지도</h2>
          <div id="map" className="w-full flex-grow rounded shadow-lg border"></div>
        </div>

        <div className="col-span-1 flex flex-col h-full md:h-[700px]">
          <h2 className="text-xl font-bold mb-4">안장자 현황</h2>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-blue-500 border-solid border-opacity-90"></div>
              <p className="mt-8 text-center text-gray-600 text-xl font-semibold">
                현재 안장자 데이터를 로딩중입니다... 잠시만 기다려주십시오.
              </p>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              {/* 모바일 화면에서 가로 스크롤 적용 */}
              <div className="md:overflow-visible overflow-x-auto w-full">
                <table className="table-auto min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2 text-center hidden md:table-cell">묘역</th>
                      <th className="border px-4 py-2 text-center">성명</th>
                      <th className="border px-4 py-2 text-center">군별</th>
                      <th className="border px-4 py-2 text-center hidden md:table-cell">계급</th>
                      <th className="border px-4 py-2 text-center">안장일</th>
                      <th className="border px-4 py-2 text-center">안장 위치</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((row, index) => (
                      <tr
                        key={index}
                        className={`cursor-pointer ${
                          selectedRowIndex === index ? "bg-blue-200" : "hover:bg-gray-300"
                        }`}
                        onClick={() => handleRowClick(index, row.dvs)}
                      >
                        <td className="border px-4 py-2 text-center hidden md:table-cell">{row.dvs}</td>
                        <td className="border px-4 py-2 text-center">{row.stmt}</td>
                        <td className="border px-4 py-2 text-center">{row.mildsc}</td>
                        <td className="border px-4 py-2 text-center hidden md:table-cell">{row.rank}</td>
                        <td className="border px-4 py-2 text-center">{row.buraldate}</td>
                        <td className="border px-4 py-2 text-center">{row.buralpstn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 페이지네이션 */}
              <div className="flex justify-center items-center mt-4 space-x-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded ${
                    currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  이전
                </button>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === page ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded ${
                    currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  다음
                </button>
              </div>
            </>
          )}
        </div>
        
        {/* 현충원 지도 보기 이미지 모달 */}
        {isMapModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={toggleMapModal} // 배경 클릭 시 모달 닫기
          >
            <div
              className="bg-white rounded-lg shadow-lg max-w-7xl w-full p-6 relative"
              onClick={(e) => e.stopPropagation()} // 이벤트 전파 차단
            >
              <button
                onClick={toggleMapModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">서울국립현충원 지도</h2>
              <div className="flex justify-center">
                <img
                  src="/img/cemetaryMap.png" // 여기에 실제 이미지 경로를 설정
                  alt="서울국립현충원 지도"
                  className="rounded-lg border shadow-lg"
                />
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default NationalMemorialMap;
