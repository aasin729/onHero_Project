import React, { useState, useEffect } from "react";
import axios from "axios";

const BattleInfo = () => {
  const [battleData, setBattleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBattleInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const API_KEY = "3230313638333132383734373732313039";
      const API_URL = `/${API_KEY}/json/DS_WARHSTR_KORWAR_CBT_IN/1/1000`; // 범위 증가


      const response = await axios.get(API_URL);
      const result = response.data.DS_WARHSTR_KORWAR_CBT_IN.row;
      setBattleData(result || []);
    } catch (err) {
      console.error("Error fetching battle information:", err);
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // HTML 태그를 제거하는 함수
  const removeHtmlTags = (str) => {
    if (!str) return ""; // null 또는 undefined 처리
    return str.replace(/<\/?[^>]+(>|$)/g, ""); // HTML 태그 제거
  };

  useEffect(() => {
    fetchBattleInfo();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>전투 정보</h1>
      <table border="1">
        <thead>
          <tr>
            <th>행번호</th>
            <th>전투명</th>
            {/* <th>전투내용</th> */}
            <th>기간</th>
            <th>전투지역</th>
            <th>주요인물</th>
          </tr>
        </thead>
        <tbody>
          {battleData.length > 0 ? (
            battleData.map((item, index) => (
              <tr key={index}>
                <td>{item.rowno}</td>
                <td>{item.title}</td>
                    {/* <td style={{ whiteSpace: "pre-wrap" }}>
                    {removeHtmlTags(item.ctnt)}
                    </td> */}
                <td>{item.addtn_itm_2}</td>
                <td>{item.addtn_itm_3}</td>
                <td>{item.addtn_itm_4}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BattleInfo;
