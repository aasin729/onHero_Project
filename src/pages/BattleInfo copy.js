import React, { useState, useEffect } from "react";
import axios from "axios";

const BattleInfo = () => {
  const [battleData, setBattleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5); // 초기에 표시할 그룹 수

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
        .sort((a, b) => b.parsedDate - a.parsedDate);

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
      });
      return acc;
    }, {});
  };

  useEffect(() => {
    fetchBattleInfo();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // 한 번에 5개씩 더 보기
  };

  if (loading) return <p className="text-center mt-10">로딩 중...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  // 표시할 데이터만 잘라서 보여줌
  const visibleData = Object.keys(battleData).slice(0, visibleCount);

  return (
    <div className="app-wrapper mt-20 bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-10 text-center">전투 정보 타임라인</h1>
      <div className="relative">
        {visibleData.map((dateKey, index) => {
          const group = battleData[dateKey];
          const isLeft = index % 2 === 0; // 홀수/짝수에 따라 좌/우 변경

          return (
            <div key={index} className={`flex ${isLeft ? "justify-start" : "justify-end"} mb-10`}>
              <div
                className={`relative w-1/2 p-6 bg-gray-800 rounded-lg shadow-md ${
                  isLeft ? "ml-10" : "mr-10"
                }`}
              >
                <div
                  className={`absolute w-6 h-6 bg-pink-500 rounded-full top-1/2 transform -translate-y-1/2 ${
                    isLeft ? "-left-3" : "-right-3"
                  }`}
                ></div>
                <p className="text-pink-400 font-semibold mb-2">{dateKey}</p>
                {group.battles.map((battle, i) => (
                  <div key={i} className="mt-4">
                    <h3 className="text-xl font-bold">{battle.title}</h3>
                    <p className="text-sm mt-1">
                      <strong>전투 지역:</strong> {battle.region}
                    </p>
                    <p className="text-sm">
                      <strong>주요 인물:</strong> {battle.person}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {visibleCount < Object.keys(battleData).length && (
        <div className="text-center mt-10">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            더 보기
          </button>
        </div>
      )}
    </div>
  );
};

export default BattleInfo;
