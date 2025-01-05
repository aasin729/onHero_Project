import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const FallenSoldiersDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [years, setYears] = useState([]);

  const fetchData = async () => {
    try {
      const API_KEY = "3230313638333132383734373732313039";
      const SERVICE = "DS_625_KIA_COPSEXCVT_PRS";
      const MAX_INDEX = 100;
      let startIndex = 1;
      let endIndex = MAX_INDEX;
      let allData = [];

      // 데이터 가져오기
      while (true) {
        const API_URL = `/${API_KEY}/json/${SERVICE}/${startIndex}/${endIndex}`;
        const response = await axios.get(API_URL);
        const result = response.data[SERVICE]?.row || [];
        allData = [...allData, ...result];

        if (result.length < MAX_INDEX) break;
        startIndex = endIndex + 1;
        endIndex += MAX_INDEX;
      }

      // 데이터 연도별 그룹화
      const groupedData = allData.reduce((acc, curr) => {
        const year = curr.excvt_year;
        if (!acc[year]) {
          acc[year] = {
            ourfrcs_roka: 0,
            ourfrcs_unmil: 0,
            et_nk: 0,
            et_chn: 0,
            idntycfmtn_kia: 0,
          };
        }
        acc[year].ourfrcs_roka += parseInt(curr.ourfrcs_roka || 0, 10);
        acc[year].ourfrcs_unmil += parseInt(curr.ourfrcs_unmil || 0, 10);
        acc[year].et_nk += parseInt(curr.et_nk || 0, 10);
        acc[year].et_chn += parseInt(curr.et_chn || 0, 10);
        acc[year].idntycfmtn_kia += parseInt(curr.idntycfmtn_kia || 0, 10);
        return acc;
      }, {});

      setChartData(groupedData);
      setYears(Object.keys(groupedData)); // 연도 목록 저장
      setSelectedYear(Object.keys(groupedData)[0]); // 기본 선택 연도 설정
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateChartData = () => {
    if (!selectedYear || !chartData[selectedYear]) return { labels: [], series: [] };

    const yearData = chartData[selectedYear];
    return {
      labels: ["아군 국군", "아군 UN군", "적군 북한", "적군 중국", "신원확인 전사자"],
      series: [
        yearData.ourfrcs_roka,
        yearData.ourfrcs_unmil,
        yearData.et_nk,
        yearData.et_chn,
        yearData.idntycfmtn_kia,
      ],
    };
  };

  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["아군 국군", "아군 UN군", "적군 북한", "적군 중국", "신원확인 전사자"],
    title: {
      text: `발굴년도별 인원 비율 (${selectedYear})`,
      align: "center",
    },
  };

  const chartSeries = generateChartData().series;

  return (
    <div>
      <h1>전사자 유해 발굴 현황</h1>
      <div>
        <label>발굴년도 선택: </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {chartSeries.length > 0 ? (
        <ApexCharts options={chartOptions} series={chartSeries} type="donut" height={400} />
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default FallenSoldiersDashboard;
