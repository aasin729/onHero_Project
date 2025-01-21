import React, { useState, useEffect } from "react";
import axios from "axios";

const NationalMemorialMap = () => {
  const [burialData, setBurialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 검색 및 필터링 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMilitary, setSelectedMilitary] = useState("");

  const [militaryOptions, setMilitaryOptions] = useState([]); // 동적 군별 옵션

  // 페이징 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const maxPageButtons = 4; // 최대 페이지 버튼 개수

  // API 호출 함수
  const fetchBurialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = "3230313638333132383734373732313039";
      const totalDataCount = 60000; // 대략적인 데이터 수
      const API_URL = `/${API_KEY}/json/DS_TB_MND_NTNLMMCMT_BURALPRSTS/1/${totalDataCount}`;

      const response = await axios.get(API_URL);
      const result = response.data.DS_TB_MND_NTNLMMCMT_BURALPRSTS.row;
      const reversedData = result.reverse() || []; // 데이터 역순으로 정렬
      setBurialData(reversedData);
      setFilteredData(reversedData); // 필터링 데이터 초기화

      // 군별 옵션 추출
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

        // 마커 추가
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(37.50130234388042, 126.97336693184688),
          map: map,
          title: "국립서울현충원",
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

  // 검색 및 필터 실행 핸들러
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
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 페이지 번호 목록 생성
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
    <div className="container mx-auto p-4  bg-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">서울국립현충원</h1>

      {/* 지도 */}
      <div className="w-full h-96 mb-6">
        <div id="map" className="w-full h-full rounded shadow-lg"></div>
      </div>

      {/* 검색 및 필터링 */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="이름으로 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedMilitary}
          onChange={(e) => setSelectedMilitary(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          검색
        </button>
      </div>

      {/* 안장자 현황 데이터 */}
      <div className="container">
        <h3 className="text-lg font-semibold mb-4">국립서울현충원 안장자 현황</h3>
        {loading && <p className="text-center">로딩 중...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse border border-gray-300 shadow-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 text-xl py-2 text-center">순번</th>
                    <th className="border border-gray-300 px-4 text-xl py-2 text-center">묘역</th>
                    <th className="border border-gray-300 px-4 text-xl py-2 text-center">성명</th>
                    <th className="border border-gray-300 px-4 text-xl py-2 text-center">군별</th>
                    <th className="border border-gray-300 px-4 text-xl py-2 text-center">계급</th>
                    <th className="border border-gray-300 px-4 text-xl py-2 text-center">사망일</th>
                    <th className="border border-gray-300 px-4 text-xl py-2 text-center">안장일</th>
                    <th className="border border-gray-300 px-4 text-xl py-2 text-center">안장 위치</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((row, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-100 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="border border-gray-300 px-4 py-2 text-center">{row.seq}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{row.dvs}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{row.stmt}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{row.mildsc}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{row.rank}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{row.dthdt}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{row.buraldate}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{row.buralpstn}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                      >
                        데이터가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center items-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {"<"}
              </button>
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border rounded mx-1 ${
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
                className={`px-4 py-2 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {">"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NationalMemorialMap;
