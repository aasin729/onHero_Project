import React, { useState, useEffect } from "react";
import axios from "axios";

const BurialData = () => {
  const [burialData, setBurialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출 함수
  const fetchBurialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = "3230313638333132383734373732313039";
      // 통계현황 URL을 참고하여 상대 경로로 API URL 설정
      const API_URL = `/${API_KEY}/json/DS_TB_MND_NTNLMMCMT_BURALPRSTS/1/50`;

      // Axios를 사용한 API 호출
      const response = await axios.get(API_URL);

      // API 응답에서 필요한 데이터 추출
      const result = response.data.DS_TB_MND_NTNLMMCMT_BURALPRSTS.row;
      setBurialData(result || []); // 데이터 상태 업데이트
    } catch (error) {
      console.error("API 호출 실패:", error);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBurialData(); // 컴포넌트 마운트 시 호출
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h3>국립서울현충원 안장자 현황</h3>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>순번</th>
            <th>묘역</th>
            <th>성명</th>
            <th>군별</th>
            <th>계급</th>
            <th>사망일</th>
            <th>사망 장소</th>
            <th>안장일</th>
            <th>안장 위치</th>
          </tr>
        </thead>
        <tbody>
          {burialData.length > 0 ? (
            burialData.map((row, index) => (
              <tr key={index}>
                <td>{row.seq}</td>
                <td>{row.dvs}</td>
                <td>{row.stmt}</td>
                <td>{row.mildsc}</td>
                <td>{row.rank}</td>
                <td>{row.dthdt}</td>
                <td>{row.deathplc}</td>
                <td>{row.buraldate}</td>
                <td>{row.buralpstn}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BurialData;
