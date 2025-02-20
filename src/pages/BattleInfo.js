import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroCards from "../components/HeroCards";
import Footer from "../shared/footer";
import KoreanWarBattleMap from "../components/KoreanWarBattleMap";

const BattleInfo = () => {
   useEffect(() => {
      // AOS 초기화
      AOS.init({
        duration: 800, // 애니메이션 지속 시간
        once: false, // 애니메이션 반복 실행
        easing: "ease-in-out", // 애니메이션 효과
        offset: 50, // 애니메이션 시작 지점
      });
    }, []);
  const [battleData, setBattleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  // 🔥 배경 이미지 리스트
  const backgrounds = [
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/4.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
  ];

  useEffect(() => {
    fetchBattleInfo();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        // .sort((a, b) => b.parsedDate - a.parsedDate);
        .sort((a, b) => a.parsedDate - b.parsedDate);

      const groupedData = groupByDate(filteredData);
      setBattleData(groupedData);
    } catch (err) {
      console.error("Error fetching battle information:", err);
      // setError("데이터를 가져오는 중 오류가 발생했습니다.");
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

  // 🔥 스크롤 이벤트 핸들러: 타임라인이 스크롤될 때 배경 변경
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight * 0.8) {
      setVisibleCount((prev) => prev + 3);
    }

    // 🔄 스크롤 위치에 따라 배경 이미지 변경
    const scrollPosition = Math.floor(window.scrollY / 1000); // 1000px 단위로 변경
    const newIndex = scrollPosition % backgrounds.length; // 순환하도록 설정
    setCurrentBackgroundIndex(newIndex);
  };

  return (
    <>
      {/* 🔥 유튜브 동영상 자동 실행 */}
      <div className="relative w-full mt-28" style={{ height: "90vh" }}>
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

      {/* KoreanWarBattleMap */}
      {/* <KoreanWarBattleMap /> */}

      {/* 🔥 타임라인 배경을 동적으로 변경 */}
      <div
        id="timeline-section"
        className="app-wrapper bg-gray-600 text-white p-10 transition-all duration-700"
        style={{
          backgroundImage: `url(${backgrounds[currentBackgroundIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // 배경 고정 효과 추가
        }}
      >
        {/* <h1 className="text-4xl text-gray-100 font-bold text-center mb-20">전투 정보 타임라인</h1> */}

        {loading && <p className="text-center mt-10">로딩 중...</p>}
        {error && <p className="text-center mt-10 text-red-500">{error}</p>}

        {/* 타임라인 */}
        <div className="relative px-20" data-aos="fade">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300"></div>

          {Object.keys(battleData).slice(0, visibleCount).map((dateKey, index) => {
            const group = battleData[dateKey];
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex items-center w-3/4 mx-auto mb-10 ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`relative w-1/2 p-4 bg-gray-800 rounded-lg shadow-md ${
                    isLeft ? "ml-10" : "mr-10"
                  }`}
                >
                  <p className="text-gray-400 font-semibold text-xl mb-2">{dateKey}</p>
                  {group.battles.map((battle, i) => (
                    <div key={i} className="mt-4 p-4 bg-gray-700 rounded-lg shadow-md cursor-pointer">
                      <h3 className="text-xl font-bold">{battle.title}</h3>
                      <p className="text-lg mt-1">
                        <strong>전투 지역:</strong> {battle.region}
                      </p>
                      <p className="text-base">
                        <strong>주요 인물:</strong> {battle.person}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BattleInfo;
