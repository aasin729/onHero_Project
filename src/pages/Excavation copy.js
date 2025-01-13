import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const Excavation = () => {
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState({}); // 총합계
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const API_KEY = "3230313638333132383734373732313039";
      const SERVICE = "DS_625_KIA_COPSEXCVT_PRS";
      const MAX_INDEX = 100;
      let startIndex = 1;
      let endIndex = MAX_INDEX;
      let allData = [];

      while (true) {
        const API_URL = `/${API_KEY}/json/${SERVICE}/${startIndex}/${endIndex}`;
        const response = await axios.get(API_URL);
        const result = response.data[SERVICE]?.row || [];
        allData = [...allData, ...result];
        if (result.length < MAX_INDEX) break;
        startIndex = endIndex + 1;
        endIndex += MAX_INDEX;
      }

      const uniqueData = allData.filter((item, index, self) => {
        return (
          index ===
          self.findIndex(
            (t) => t.std_date === item.std_date && t.excvt_year === item.excvt_year
          )
        );
      });

      // 총합계 계산
      const totals = uniqueData.reduce(
        (acc, item) => {
          acc.ourfrcs_roka += parseInt(item.ourfrcs_roka || 0);
          acc.ourfrcs_unmil += parseInt(item.ourfrcs_unmil || 0);
          acc.et_nk += parseInt(item.et_nk || 0);
          acc.et_chn += parseInt(item.et_chn || 0);
          acc.idntycfmtn_kia += parseInt(item.idntycfmtn_kia || 0);
          return acc;
        },
        { ourfrcs_roka: 0, ourfrcs_unmil: 0, et_nk: 0, et_chn: 0, idntycfmtn_kia: 0 }
      );

      setTotals(totals);
      setData(uniqueData);
    } catch (error) {
      console.error("API 호출 실패:", error);
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 차트 데이터 생성
  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
    },
    xaxis: {
      categories: data.map((item) => item.excvt_year),
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    colors: ["#1E90FF", "#32CD32", "#FF6347", "#FFD700", "#6A5ACD"],
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`,
    },
  };

  const chartSeries = [
    {
      name: "아군 국군",
      data: data.map((item) =>
        Math.round((parseInt(item.ourfrcs_roka || 0) / totals.ourfrcs_roka) * 100)
      ),
    },
    {
      name: "아군 UN군",
      data: data.map((item) =>
        Math.round((parseInt(item.ourfrcs_unmil || 0) / totals.ourfrcs_roka) * 100)
      ),
    },
    {
      name: "적군 북한",
      data: data.map((item) =>
        Math.round((parseInt(item.et_nk || 0) / totals.et_nk) * 100)
      ),
    },
    {
      name: "적군 중국",
      data: data.map((item) =>
        Math.round((parseInt(item.et_chn || 0) / totals.et_chn) * 100)
      ),
    },
    {
      name: "신원확인 전사자",
      data: data.map((item) =>
        Math.round((parseInt(item.idntycfmtn_kia || 0) / totals.idntycfmtn_kia) * 100)
      ),
    },
  ];

  return (
    <div className="mt-20">
      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}

      <div style={{ textAlign: "center" }}>
        <h1>전사자 유해 발굴 현황 (2000 ~ 2019)</h1>
        <p>총 아군 국군: {totals.ourfrcs_roka}명</p>
        <p>총 아군 UN군: {totals.ourfrcs_unmil}명</p>
        <p>총 적군 북한: {totals.et_nk}명</p>
        <p>총 적군 중국: {totals.et_chn}명</p>
        <p>총 신원확인 전사자: {totals.idntycfmtn_kia}명</p>
      </div>

      <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />

      <table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
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
              <td colSpan="6">데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Excavation;