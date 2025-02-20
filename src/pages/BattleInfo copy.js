import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import HeroCards from "../components/HeroCards";
import Footer from "../shared/footer";

const BattleInfo = () => {
  const [battleData, setBattleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5); // 초기에 표시할 그룹 수
  const [selectedBattle, setSelectedBattle] = useState(null); // 선택된 전투 정보
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const fetchBattleInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const API_KEY = "3230313638333132383734373732313039";
      const API_URL = `/${API_KEY}/json/DS_WARHSTR_KORWAR_CBT_IN/1/1000`;

      const response = await axios.get(API_URL);
      const result = response.data.DS_WARHSTR_KORWAR_CBT_IN.row;

      const filteredData = result
        .filter((item) => item.addtn_itm_2)
        .map((item) => {
          const period = item.addtn_itm_2;
          const match = period.match(/(\d{4})\.(\d{1,2})(?:\.(\d{1,2}))?/);

          if (match) {
            const year = match[1];
            const month = match[2].padStart(2, "0");
            const day = match[3] ? match[3].padStart(2, "0") : "01";
            const parsedDate = new Date(`${year}-${month}-${day}`);
            item.parsedDate = !isNaN(parsedDate) ? parsedDate : null;
          } else {
            item.parsedDate = null;
          }
          return item;
        })
        .filter((item) => item.parsedDate)
        .sort((a, b) => b.parsedDate - a.parsedDate); // 내림차순 정렬
        // .sort((a, b) => a.parsedDate - b.parsedDate); // 오름차순 정렬


      const groupedData = groupByDate(filteredData);
      setBattleData(groupedData);
    } catch (err) {
      console.error("Error fetching battle information:", err);
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const groupByDate = (data) => {
    return data.reduce((acc, item) => {
      const dateKey = item.parsedDate.toISOString().split("T")[0];
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: item.parsedDate,
          battles: [],
        };
      }
      acc[dateKey].battles.push({
        title: item.title || "제목 없음",
        region: item.addtn_itm_3 || "정보 없음",
        person: item.addtn_itm_4 || "정보 없음",
        content: item.ctnt || "내용 없음",
      });
      return acc;
    }, {});
  };

  useEffect(() => {
    fetchBattleInfo();
  }, []);

  return (
    <>
      {/* 🔥 유튜브 동영상 자동 실행 */}
      <div className="relative w-full mt-20" style={{ height: "90vh" }}>
  <iframe
    className="absolute top-0 left-0 w-full h-full"
    src="https://www.youtube.com/embed/Dbrn-bDeJJ0?autoplay=1&mute=1&controls=1&loop=1&playlist=Dbrn-bDeJJ0"
    title="전투 역사 영상"
    frameBorder="0"
    allow="autoplay; encrypted-media; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>



      {/* HeroCards */}
      <HeroCards />

      <div className="app-wrapper bg-gray-600 text-white p-10">
        <h1 className="text-3xl text-gray-900 font-bold mb-20">전투 정보 타임라인</h1>

        {loading && <p className="text-center mt-10">로딩 중...</p>}
        {error && <p className="text-center mt-10 text-red-500">{error}</p>}

        {/* 타임라인 */}
        <div className="relative px-20">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300"></div>

          {Object.keys(battleData).slice(0, visibleCount).map((dateKey, index) => {
            const group = battleData[dateKey];
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex items-center w-3/4 mx-auto mb-10 ${isLeft ? "justify-start" : "justify-end"}`}
              >
                <div className={`relative w-1/2 p-4 bg-gray-800 rounded-lg shadow-md ${isLeft ? "ml-10" : "mr-10"}`}>
                  <p className="text-orange-400 font-semibold text-lg mb-2">{dateKey}</p>
                  {group.battles.map((battle, i) => (
                    <div key={i} className="mt-4 p-4 bg-gray-700 rounded-lg shadow-md cursor-pointer">
                      <h3 className="text-lg font-bold">{battle.title}</h3>
                      <p className="text-sm mt-1"><strong>전투 지역:</strong> {battle.region}</p>
                      <p className="text-sm"><strong>주요 인물:</strong> {battle.person}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 버튼 영역 */}
        <div className="text-center mt-10">
          <button onClick={() => setVisibleCount((prev) => prev + 5)} className="px-6 py-2 bg-orange-500 text-white rounded-lg mr-4">
            더 보기
          </button>
          <button onClick={() => setVisibleCount(5)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">
            다시 올리기
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BattleInfo;
