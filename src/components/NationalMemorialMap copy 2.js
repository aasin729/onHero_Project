import React, { useState, useEffect } from "react";
import axios from "axios";
import burialLocations from "../data/burialLocations";

const NationalMemorialMap = () => {
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

  const itemsPerPage = 15;
  const maxPageButtons = 4;

  const fetchBurialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = "3230313638333132383734373732313039";
      const totalDataCount = 60000;
      const API_URL = `/${API_KEY}/json/DS_TB_MND_NTNLMMCMT_BURALPRSTS/1/${totalDataCount}`;

      const response = await axios.get(API_URL);
      const result = response.data.DS_TB_MND_NTNLMMCMT_BURALPRSTS.row;
      const reversedData = result.reverse() || [];
      setBurialData(reversedData);
      setFilteredData(reversedData);

      const militarySet = new Set(reversedData.map((item) => item.mildsc));
      setMilitaryOptions([...militarySet]);
    } catch (error) {
      console.error("API 호출 실패:", error);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto p-6 bg-gray-100">
      <div className="col-span-2 mb-6">
        <h2 className="text-xl font-bold mb-4">검색 및 필터링</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="이름 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSelectedMilitary("")}
            className="w-full px-4 py-2 mb-2 border rounded shadow focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={selectedMilitary}
            onChange={(e) => setSelectedMilitary(e.target.value)}
            onClick={() => setSearchQuery("")}
            className="w-full px-4 py-2 border rounded shadow focus:ring-2 focus:ring-blue-400"
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
            className="w-full px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            검색
          </button>
        </div>
      </div>

      <div className="col-span-1 flex flex-col" style={{ height: "750px" }}>
        <h2 className="text-xl font-bold mb-4">서울국립현충원 지도</h2>
        <div id="map" className="w-full flex-grow rounded shadow-lg border"></div>
      </div>

      <div className="col-span-1 flex flex-col" style={{ height: "700px" }}>
        <h2 className="text-xl font-bold mb-4">안장자 현황</h2>
        {loading ? (
          <p className="text-center">로딩 중...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-center">묘역</th>
                  <th className="border px-4 py-2 text-center">성명</th>
                  <th className="border px-4 py-2 text-center">군별</th>
                  <th className="border px-4 py-2 text-center">계급</th>
                  <th className="border px-4 py-2 text-center">안장일</th>
                  <th className="border px-4 py-2 text-center">안장 위치</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer ${
                      selectedRowIndex === index
                        ? "bg-blue-200"
                        : "hover:bg-gray-300"
                    }`}
                    onClick={() => handleRowClick(index, row.dvs)}
                  >
                    <td className="border px-4 py-2 text-center">{row.dvs}</td>
                    <td className="border px-4 py-2 text-center">{row.stmt}</td>
                    <td className="border px-4 py-2 text-center">{row.mildsc}</td>
                    <td className="border px-4 py-2 text-center">{row.rank}</td>
                    <td className="border px-4 py-2 text-center">{row.buraldate}</td>
                    <td className="border px-4 py-2 text-center">{row.buralpstn}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="flex justify-center items-center mt-4 space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                이전
              </button>
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                다음
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NationalMemorialMap;
