import React, { useState } from "react";
import warheroes from "../data/warheroes.json";
import privateImg from "../assets/images/private.png";
import privateFirstClassImg from "../assets/images/private_first_class.png";
import corporalImg from "../assets/images/corporal.png";
import sergeantImg from "../assets/images/sergeant.png";
import staffSergeantImg from "../assets/images/staff_sergeant.png";
import sergeantFirstClassImg from "../assets/images/sergeant_first_class.png";
import masterSergeantImg from "../assets/images/master_sergeant.png";
import commandSergeantMajorImg from "../assets/images/command_sergeant_major.png";
import secondLieutenantImg from "../assets/images/second_lieutenant.png";
import firstLieutenantImg from "../assets/images/first_lieutenant.png";
import captainImg from "../assets/images/captain.png";
import majorImg from "../assets/images/major.png";
import lieutenantColonelImg from "../assets/images/lieutenant_colonel.png";
import colonelImg from "../assets/images/colonel.png";
import brigadierGeneralImg from "../assets/images/brigadier_general.png";
import majorGeneralImg from "../assets/images/major_general.png";
import lieutenantGeneralImg from "../assets/images/lieutenant_general.png";
import generalImg from "../assets/images/general.png";
import defaultImage from "../assets/images/default.png"; // 기본 이미지

// 계급별 이미지 매핑 객체
const rankImages = {
  "이등병": privateImg,
  "일등병": privateFirstClassImg,
  "상병": corporalImg,
  "병장": sergeantImg,
  "하사": staffSergeantImg,
  "중사": sergeantFirstClassImg,
  "상사": masterSergeantImg,
  "원사": commandSergeantMajorImg,
  "소위": secondLieutenantImg,
  "중위": firstLieutenantImg,
  "대위": captainImg,
  "소령": majorImg,
  "중령": lieutenantColonelImg,
  "대령": colonelImg,
  "준장": brigadierGeneralImg,
  "소장": majorGeneralImg,
  "중장": lieutenantGeneralImg,
  "대장": generalImg,
};

// 계급 이미지 매핑 함수
const getRankImage = (rank) => {
  const normalizedRank = rank.trim(); // 공백 제거
  const matchedRank = Object.keys(rankImages).find((key) =>
    normalizedRank.includes(key) // 키워드 포함 여부 확인
  );
  return matchedRank ? rankImages[matchedRank] : defaultImage; // 매칭된 이미지 반환 또는 기본 이미지
};

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* 모달 콘텐츠 */}
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-4xl w-full">
        <h3 className="text-xl font-bold mb-4">상세 내용</h3>
        <div
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: content }} // HTML 렌더링
        ></div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
};


const HeroCards = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 20; // 한 페이지당 표시할 아이템 수
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [selectedContent, setSelectedContent] = useState(""); // 선택된 카드의 내용

  // 데이터 처리
  const heroData = warheroes.DATA.map((item) => ({
    title: item.title || "이름 없음",
    hanName: item.dta_smmry || "정보 없음",
    date: item.addtn_itm_5 || "날짜 없음",
    location: item.addtn_itm_6 || "지역 없음",
    rank: item.addtn_itm_7 || "계급 없음",
    medal: item.addtn_itm_8 || "상훈 없음",
    content: item.ctnt || "내용 없음", // ctnt 필드 추가
  }));

  // 페이지 수 계산
  const totalPages = Math.ceil(heroData.length / itemsPerPage);

  // 현재 페이지 데이터
  const visibleHeroes = heroData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 핸들러
  const handlePageChange = (page) => setCurrentPage(page);

  // 카드 클릭 핸들러
  const handleCardClick = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContent("");
  };

  return (
    <div className="bg-gray-400 p-10 mt-40">
      <h2 className="text-2xl font-bold text-center mb-6">
        한국전쟁 호국선열 목록
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {visibleHeroes.map((hero, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer flex items-center"
            onClick={() => handleCardClick(hero.content)}
          >
            {/* 왼쪽 텍스트 영역 */}
            <div className="flex-1">
              <h3 className="text-xl font-bold">{hero.title}</h3>
              <p>
                <strong>한문 이름:</strong> {hero.hanName}
              </p>
              <p>
                <strong>날짜:</strong> {hero.date}
              </p>
              <p>
                <strong>지역:</strong> {hero.location}
              </p>
              <p>
                <strong>계급:</strong> {hero.rank}
              </p>
              <p>
                <strong>상훈:</strong> {hero.medal}
              </p>
            </div>

            {/* 오른쪽 이미지 영역 */}
            <div className="flex-shrink-0 ml-4">
              <img
                src={getRankImage(hero.rank)}
                alt={`${hero.rank} 이미지`}
                className="w-auto h-auto max-w-full max-h-16"
              />
            </div>
          </div>
        ))}
      </div>
      {/* 페이지 번호 */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400 hover:text-white`}
          >
            {page}
          </button>
        ))}
      </div>
      {/* 모달 컴포넌트 */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={selectedContent}
      />
    </div>
  );
};

export default HeroCards;
