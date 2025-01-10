import React, { useState, useEffect } from "react";
import UNGlobe from "../components/UNGlobe";
import axios from "axios";


const Participation = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // API 요청 정보
          const API_KEY = "3230313638333132383734373732313039";
          const TYPE = "json";
          const SERVICE = "DS_TB_MND_UNMIL_ENTWR_N_DAMAGEP";
          const START_INDEX = 1;
          const END_INDEX = 30;
  
          // API 호출 URL
          const API_URL = `/${API_KEY}/${TYPE}/${SERVICE}/${START_INDEX}/${END_INDEX}`;
          const response = await axios.get(API_URL);
  
          console.log("API Response:", response.data);
          const result = response.data?.DS_TB_MND_UNMIL_ENTWR_N_DAMAGEP?.row || [];
          setData(result);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.message || "API 호출 실패");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>오류: {error}</p>;



  return (
    <div className="p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">UN군 참전 현황</h1>
      <p className="text-gray-600">
        UN군 참전과 관련된 정보를 여기에 표시합니다.
        <UNGlobe />
      </p>
        {/* 데이터 테이블 */}
       <div className="mt-10 h-8 w-full">
          <table>
          <thead>
            <tr>
              <th>행번호</th>
              <th>지원구분</th>
              <th>참전 국명</th>
              <th>참전 연인원</th>
              <th>참전 형태</th>
              <th>피해 계</th>
              <th>전사</th>
              <th>부상</th>
              <th>실종</th>
              <th>포로</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.rowno}</td>
                <td>{item.applydvs}</td>
                <td>{item.entwr_natnnm}</td>
                <td>{Math.floor(item.entwr_yypsnnl).toLocaleString()}</td> {/* 참전 연인원 */}
                <td>{item.entwr_shape}</td>
                <td>{Math.floor(item.damage_sbsc).toLocaleString()}</td> {/* 피해 계 */}
                <td>{Math.floor(item.dthbttl).toLocaleString()}</td> {/* 전사 */}
                <td>{Math.floor(item.wound).toLocaleString()}</td> {/* 부상 */}
                <td>{Math.floor(item.miss).toLocaleString()}</td> {/* 실종 */}
                <td>{Math.floor(item.pow).toLocaleString()}</td> {/* 포로 */}
              </tr>
            ))}
          </tbody>
        </table>
       </div>
    </div>
  );
};

export default Participation;
