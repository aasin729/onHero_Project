import React, { useState } from "react";
import warheroes from "../data/warheroes.json";

const HeroCards = () => {
  const [visibleCount, setVisibleCount] = useState(10); // 한 번에 표시할 카드 수

  // 데이터 처리
  const heroData = warheroes.DATA.map((item) => ({
    title: item.title || "이름 없음",
    hanName: item.dta_smmry || "정보 없음",
    date: item.addtn_itm_5 || "날짜 없음",
    location: item.addtn_itm_6 || "지역 없음",
    rank: item.addtn_itm_7 || "계급 없음",
    medal: item.addtn_itm_8 || "상훈 없음",
  }));

  // 표시할 데이터 제한
  const visibleHeroes = heroData.slice(0, visibleCount);

  const handleShowMore = () => setVisibleCount((prev) => prev + 10);

  return (
    <div className="bg-gray-400 p-10 mt-40">
      <h2 className="text-2xl font-bold text-center mb-6">
        한국전쟁 호국선열 목록
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {visibleHeroes.map((hero, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-bold">{hero.title}</h3>
            <p><strong>한문 이름:</strong> {hero.hanName}</p>
            <p><strong>날짜:</strong> {hero.date}</p>
            <p><strong>지역:</strong> {hero.location}</p>
            <p><strong>계급:</strong> {hero.rank}</p>
            <p><strong>상훈:</strong> {hero.medal}</p>
          </div>
        ))}
      </div>
      {visibleCount < heroData.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            더 보기
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroCards;
