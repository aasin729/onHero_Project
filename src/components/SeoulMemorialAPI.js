import React, { useEffect, useState } from "react";
import axios from "axios";

const SeoulMemorialAPI = () => {
  const [data, setData] = useState([]); // API 데이터를 저장할 상태
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const API_KEY = "3230313638333132383734373732313039";
      // API 요청 URL (전체 URL 대신 상대 경로 사용)
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
    <div className="container">
      <h3>국립서울현충원 안장 현황</h3>
      {error && <p>{error}</p>}

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>조사 일자</th>
            <th>순번</th>
            <th>구분</th>
            <th>총 혼당 안장</th>
            <th>묘소 안장</th>
            <th>총 혼당 잔여능력</th>
            <th>묘소 잔여능력</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.invstg_date}</td>
                <td>{item.seq}</td>
                <td>{item.dvs}</td>
                <td>{item.lylddcmt_bural}</td>
                <td>{item.grv_bural}</td>
                <td>{item.lylddcmt_rmndrablt}</td>
                <td>{item.grv_rmndrablt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">데이터를 불러오는 중입니다...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SeoulMemorialAPI;
