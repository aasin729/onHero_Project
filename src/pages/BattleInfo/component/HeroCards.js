import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import warheroes from "../../../data/warheroes.json";

const rankImages = {
  "이등병": "private.png",
  "일등병": "private_first_class.png",
  "상병": "corporal.png",
  "병장": "sergeant.png",
  "하사": "staff_sergeant.png",
  "중사": "sergeant_first_class.png",
  "상사": "master_sergeant.png",
  "원사": "command_sergeant_major.png",
  "소위": "second_lieutenant.png",
  "중위": "first_lieutenant.png",
  "대위": "captain.png",
  "소령": "major.png",
  "중령": "lieutenant_colonel.png",
  "대령": "colonel.png",
  "준장": "brigadier_general.png",
  "소장": "major_general.png",
  "중장": "lieutenant_general.png",
  "대장": "general.png",
  "경위": "inspector.png",
  "경무관": "senior_superintendent_general.png",
  "총경": "superintendent.png",
};

const getRankImage = (rank) => {
  const normalizedRank = rank.trim();
  const matchedRank = Object.keys(rankImages).find((key) =>
    normalizedRank.includes(key)
  );
  
  // public 폴더의 img 경로로 설정
  return matchedRank
    ? `${process.env.PUBLIC_URL}/img/${rankImages[matchedRank]}`
    : `${process.env.PUBLIC_URL}/img/default.png`;
};


const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 반투명 배경 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* 모달 창 */}
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl z-10 max-w-4xl w-full animate-fade-in scale-95 transition-transform duration-300 transform">
     
        {/* 모달 내용 */}
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          상세 내용
        </h3>
        <div
          className="text-gray-600 text-base font-semibold  leading-relaxed max-h-96 overflow-y-auto px-2"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        {/* 하단 버튼 */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-opacity-75"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

const HeroCards = () => {
    useEffect(() => {
      // AOS 초기화
      AOS.init({
        duration: 800,
        once: false,
        easing: "ease-in-out", 
        offset: 50,
      });
    }, []);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [armyType, setArmyType] = useState(""); // 군별 필터링 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [filteredHeroes, setFilteredHeroes] = useState(null);

  const itemsPerPage = 20;

  const heroData = warheroes.DATA.map((item) => ({
    title: item.title || "이름 없음",
    hanName: item.dta_smmry || "정보 없음",
    date: item.addtn_itm_5 || "날짜 없음",
    location: item.addtn_itm_6 || "지역 없음",
    rank: item.addtn_itm_7 || "계급 없음",
    medal: item.addtn_itm_8 || "상훈 없음",
    content: item.ctnt || "내용 없음",
  }));

  const filterHeroes = () => {
    const filtered = heroData.filter((hero) => {
      const isNameMatch = hero.title.includes(searchKeyword);
      const isArmyTypeMatch =
        !armyType ||
        (armyType === "경찰"
          ? hero.rank &&
            !["육군", "해군", "해병대", "해병", "공군"].some((type) =>
              hero.rank.includes(type)
            )
          : armyType === "해병대"
          ? hero.rank && (hero.rank.includes("해병대") || hero.rank.includes("해병"))
          : hero.rank && hero.rank.includes(armyType));
      return isNameMatch && isArmyTypeMatch;
    });
    setFilteredHeroes(filtered.length > 0 ? filtered : []);
    setCurrentPage(1);
  };

  // 군별 필터링 상태 변경 시 자동 필터링
  useEffect(() => {
    filterHeroes();
  }, [armyType]);

  const handleSearch = () => {
    filterHeroes();
  };

  const heroesToRender = filteredHeroes || heroData;

  const totalPages = Math.ceil(heroesToRender.length / itemsPerPage);
  const visibleHeroes = heroesToRender.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const handleCardClick = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContent("");
  };

  return (
    <div className="bg-gray-200 min-h-[calc(80vh)] p-4 sm:p-6 md:p-10">
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-10" data-aos="fade">
      {/* 왼쪽 제목 */}
      <h2 className="text-2xl sm:text-3xl mt-4 sm:mt-10 text-gray-900 font-bold text-center md:text-left">
        한국전쟁 호국선열 목록
      </h2>
  
      {/* 오른쪽 검색 필드 */}
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 mt-4 md:mt-0">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="이름을 입력하세요"
          className="px-4 h-10 sm:h-12 w-56 sm:w-64 py-2 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 h-10 sm:h-12 w-24 sm:w-28 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
        >
          조회
        </button>
        <select
          value={armyType}
          onChange={(e) => setArmyType(e.target.value)}
          className="px-4 py-2 h-10 sm:h-12 border rounded-lg cursor-pointer"
        >
          <option value="">군별 전체</option>
          <option value="육군">육군</option>
          <option value="해군">해군</option>
          <option value="해병대">해병대</option>
          <option value="공군">공군</option>
          <option value="경찰">경찰</option>
        </select>
      </div>
    </div>
  
    {/* 카드 섹션 (반응형) */}
    <div className="bg-gray-300 p-6 sm:p-10 rounded-xl shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" data-aos="fade">
        {visibleHeroes.map((hero, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-xl hover:scale-105 transition-transform cursor-pointer flex items-center"
            onClick={() => handleCardClick(hero.content)}
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold">{hero.title}</h3>
              <p><strong>한문 이름:</strong> {hero.hanName}</p>
              <p><strong>날짜:</strong> {hero.date}</p>
              <p><strong>지역:</strong> {hero.location}</p>
              <p><strong>계급:</strong> {hero.rank}</p>
              <p><strong>상훈:</strong> {hero.medal}</p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <img
                src={getRankImage(hero.rank)}
                alt={`${hero.rank} 이미지`}
                className="w-auto h-auto max-w-16 max-h-16"
              />
            </div>
          </div>
        ))}
      </div>
  
      {/* 페이지네이션 */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400 hover:text-white`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  
    {/* 모달 */}
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} content={selectedContent} />
  </div>
  
  );
};

export default HeroCards;
