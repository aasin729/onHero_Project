import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import burialStatus from "../../../data/burialStatus.json"; 

const SeoulMemorialAPI = () => {
  const [data, setData] = useState([]); // API 데이터를 저장할 상태
  const [animatedData, setAnimatedData] = useState([]); // 애니메이션 데이터를 저장할 상태
  const [error, setError] = useState(null);

  useEffect(() => {
    // AOS 초기화
    AOS.init({
      duration: 800,
      once: false,
      easing: "ease-in-out",
      offset: 50,
    });
  }, []);

  const fetchData = async () => {
    try {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const API_URL = `/${API_KEY}/json/DS_MMCMTSEOUL_BURAL_PRST/1/12`;
  
      const response = await axios.get(API_URL);
      const result = response?.data?.DS_MMCMTSEOUL_BURAL_PRST?.row;
  
      if (result && Array.isArray(result)) {
        setData(result);
      } else {
        throw new Error("API 데이터 형식 오류");
      }
    } catch (error) {
      console.error("API 호출 실패:", error); // 콘솔에서만 확인
      fetchBackupData(); // API 실패 시 백업 데이터 호출 (UI에는 표시 안 함)
    }
  };
  
  // JSON 파일에서 데이터 가져오기
  const fetchBackupData = () => {
    try {
      console.log("백업 JSON 응답:", burialStatus);
      const backupData = burialStatus?.DATA;

      if (backupData && Array.isArray(backupData)) {
        setData(backupData);
      } else {
        throw new Error("백업 JSON 데이터 형식 오류");
      }
    } catch (error) {
      console.error("백업 JSON 로드 실패:", error);
      setData([]); // 데이터가 없을 경우 빈 배열로 설정
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 숫자 애니메이션 처리 함수
  useEffect(() => {
    if (data.length > 0) {
      const animated = data.map((item) => ({
        ...item,
        lylddcmt_bural: 0,
        grv_bural: 0,
        lylddcmt_rmndrablt: 0,
        grv_rmndrablt: 0,
      }));

      setAnimatedData(animated);

      data.forEach((item, index) => {
        const keys = ["lylddcmt_bural", "grv_bural", "lylddcmt_rmndrablt", "grv_rmndrablt"];
        keys.forEach((key) => {
          let start = 0;
          const end = parseInt(item[key], 10);
          const increment = Math.ceil(end / 100); // 애니메이션 속도 조절
          const interval = setInterval(() => {
            start += increment;
            if (start >= end) {
              start = end;
              clearInterval(interval);
            }
            setAnimatedData((prev) =>
              prev.map((animatedItem, animatedIndex) =>
                animatedIndex === index
                  ? {
                      ...animatedItem,
                      [key]: start,
                    }
                  : animatedItem
              )
            );
          }, 20); // 20ms마다 증가
        });
      });
    }
  }, [data]);

  return (
    <div
      className="flex items-center justify-center mx-auto  p-4"
      style={{
        backgroundImage: "url('/img/cemetary.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "90vh",
      }}
    >
      <div className="w-full" data-aos="fade">
        <h3 className="text-3xl font-extrabold mb-10 text-center text-gray-700">
          국립서울현충원 안장 현황
        </h3>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {animatedData.length > 0 ? (
            animatedData.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-85 text-white p-4 rounded-lg shadow-lg"
              >
                <div className="text-sm text-left px-8">
                  <p className="text-xl mb-4 font-semibold text-center">{item.dvs}</p>
                  <table className="table-auto w-full text-left">
                    <tbody>
                      <tr>
                        <td className="font-bold">총 혼당 안장</td>
                        <td className="text-right font-extrabold text-xl text-gray-400">
                          {item.lylddcmt_bural}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold">묘소 안장</td>
                        <td className="text-right font-extrabold text-xl text-gray-400">
                          {item.grv_bural}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold">총 혼당 잔여능력</td>
                        <td className="text-right font-extrabold text-xl text-gray-400">
                          {item.lylddcmt_rmndrablt}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold">묘소 잔여능력</td>
                        <td className="text-right font-extrabold text-xl text-gray-400">
                          {item.grv_rmndrablt}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-white">
              데이터를 불러오는 중입니다...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeoulMemorialAPI;
