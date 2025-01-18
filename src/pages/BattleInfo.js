import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import HeroCards from "../components/HeroCards";

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
        content: item.ctnt || "내용 없음",
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

  const handleReset = () => {
    setVisibleCount(5); // visibleCount를 초기값으로 리셋
  };

  const openModal = (battle) => {
    setSelectedBattle(battle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBattle(null);
    setIsModalOpen(false);
  };

  const filterContent = (content) => {
    const lines = content.split("\n");
    const filteredLines = lines.filter((line) => !line.trim().startsWith("3."));
    return filteredLines.join("\n");
  };

  if (loading) return <p className="text-center mt-10">로딩 중...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const visibleData = Object.keys(battleData).slice(0, visibleCount);

  return (
    <>
      <HeroCards />

       {/* 콘텐츠 3 */}
       <div className="w-full bg-blue-300 text-white flex items-center justify-center z-0" style={{ height: "300px" }}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <p className="text-gray-700 text-center md:text-left">
           <h2 className="text-2xl font-semibold text-center mb-4">콘텐츠</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer too.
          </p>
          <div className="w-full md:w-1/2 h-48 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      <div className="app-wrapper bg-gray-900 text-white p-10">
        <h1 className="text-3xl font-bold mb-10 text-center">전투 정보 타임라인</h1>

        {/* 타임라인 */}
        <div className="relative px-20">
          {/* 중앙 라인 */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300"></div>

          {visibleData.map((dateKey, index) => {
            const group = battleData[dateKey];
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex items-center w-3/4 mx-auto mb-10 ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                {/* 전투 정보 카드 */}
                <div
                  className={`relative w-1/2 p-4 bg-gray-800 rounded-lg shadow-md ${
                    isLeft ? "ml-10 text-center" : "mr-10 text-center"
                  }`}
                >
                  {/* 아이콘 */}
                  <div
                    className={`absolute w-6 h-6 bg-pink-500 rounded-full top-1/2 transform -translate-y-1/2 ${
                      isLeft ? "-left-3" : "-right-3"
                    }`}
                  ></div>

                  <p className="text-pink-400 font-semibold mb-2">{dateKey}</p>
                  {group.battles.map((battle, i) => (
                    <div
                      key={i}
                      className="mt-4 p-4 bg-gray-700 rounded-lg shadow-md transition-opacity duration-300 hover:opacity-75 cursor-pointer"
                      onClick={() => openModal(battle)}
                    >
                      <h3 className="text-lg font-bold">{battle.title}</h3>
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

        {/* 버튼 영역 */}
        <div className="text-center mt-10">
          {visibleCount < Object.keys(battleData).length && (
            <button
              onClick={handleShowMore}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors mr-4"
            >
              더 보기
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            다시 올리기
          </button>
        </div>

        {/* 모달 */}
        {isModalOpen && selectedBattle && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg w-1/2 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{selectedBattle.title}</h2>
              <p className="text-sm mb-4">
                <strong>전투 지역:</strong> {selectedBattle.region}
              </p>
              <p className="text-sm mb-4">
                <strong>주요 인물:</strong> {selectedBattle.person}
              </p>
              <p className="text-sm">
                <strong>전투 내용:</strong>
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(filterContent(selectedBattle.content)),
                  }}
                  className="block mt-2"
                />
              </p>
              <div className="text-right mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BattleInfo;
