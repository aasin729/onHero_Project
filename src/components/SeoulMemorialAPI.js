import React, { useEffect, useState } from "react";
import axios from "axios";

const SeoulMemorialAPI = () => {
  const [data, setData] = useState([]); // API 데이터를 저장할 상태
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const API_KEY = "3230313638333132383734373732313039";
      // API 요청 URL
      const API_URL = `/${API_KEY}/json/DS_MMCMTSEOUL_BURAL_PRST/1/12`;

      // Axios를 사용한 API 호출
      const response = await axios.get(API_URL);

      // API 응답에서 필요한 데이터 추출
      const result = response.data.DS_MMCMTSEOUL_BURAL_PRST.row;
      setData(result); // 상태에 저장
    } catch (error) {
      console.error("API 호출 실패:", error);
      setError("데이터를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-20 p-4">
      <h3 className="text-2xl font-bold mb-4 text-center">국립서울현충원 안장 현황</h3>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-lg"
            >
              <div className="text-sm">
                <p className="text-xl mb-4 text-center font-semibold"> {item.dvs}</p>
                <p>
                  <span className="font-bold">총 혼당 안장:</span> {item.lylddcmt_bural}
                </p>
                <p>
                  <span className="font-bold">묘소 안장:</span> {item.grv_bural}
                </p>
                <p>
                  <span className="font-bold">총 혼당 잔여능력:</span>{" "}
                  {item.lylddcmt_rmndrablt}
                </p>
                <p>
                  <span className="font-bold">묘소 잔여능력:</span> {item.grv_rmndrablt}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">데이터를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
};

export default SeoulMemorialAPI;
