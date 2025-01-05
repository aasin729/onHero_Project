import React, { useState, useEffect } from "react";
import axios from "axios";

const FallenSoldiers = () => {
  const [data, setData] = useState([]); // API 데이터를 저장할 상태
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // 로딩 상태

  const fetchData = async () => {
    try {
      setLoading(true); // 로딩 시작
      const API_KEY = "3230313638333132383734373732313039"; // 발급받은 API 키
      const SERVICE = "DS_625_KIA_COPSEXCVT_PRS"; // 서비스명
      const MAX_INDEX = 100; // API에서 한 번에 요청 가능한 데이터 크기
      let startIndex = 1;
      let endIndex = MAX_INDEX;
      let allData = [];

      // 데이터 반복적으로 가져오기
      while (true) {
        const API_URL = `/${API_KEY}/json/${SERVICE}/${startIndex}/${endIndex}`;

        const response = await axios.get(API_URL);

        // API 응답에서 데이터 추출
        const result = response.data[SERVICE]?.row || [];
        allData = [...allData, ...result]; // 기존 데이터에 추가

        // 데이터가 더 이상 없으면 종료
        if (result.length < MAX_INDEX) break;

        // 다음 요청 범위 설정
        startIndex = endIndex + 1;
        endIndex += MAX_INDEX;
      }

      // 중복 제거: std_date와 excvt_year를 기준으로 고유한 데이터만 남김
      const uniqueData = allData.filter((item, index, self) => {
        return (
          index ===
          self.findIndex(
            (t) => t.std_date === item.std_date && t.excvt_year === item.excvt_year
          )
        );
      });

      setData(uniqueData); // 상태에 저장
    } catch (error) {
      console.error("API 호출 실패:", error);
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>전사자 유해 발굴 현황</h1>
      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}

      <table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>기준 일자</th>
            <th>발굴 년도</th>
            <th>아군 국군</th>
            <th>아군 UN군</th>
            <th>적군 북한</th>
            <th>적군 중국</th>
            <th>신원확인 전사자</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.std_date || "N/A"}</td>
                <td>{item.excvt_year}</td>
                <td>{item.ourfrcs_roka}</td>
                <td>{item.ourfrcs_unmil || "0"}</td>
                <td>{item.et_nk}</td>
                <td>{item.et_chn}</td>
                <td>{item.idntycfmtn_kia}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FallenSoldiers;
