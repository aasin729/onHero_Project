import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from "react-apexcharts";
import Slider from "react-slick";
import YoutubeSection from "../Excavation/component/YoutubeSection";
import Footer from "../../shared/footer";

const Excavation = () => {
  useEffect(() => {
    // AOS 초기화
    AOS.init({
      duration: 800, // 애니메이션 지속 시간
      once: false, // 애니메이션 반복 실행
      easing: "ease-in-out", // 애니메이션 효과
      offset: 50, // 애니메이션 시작 지점
    });
  }, []);

  const [data, setData] = useState([]);
  const [totals, setTotals] = useState({
    ourfrcs_roka: 0,
    ourfrcs_unmil: 0,
    et_nk: 0,
    et_chn: 0,
    idntycfmtn_kia: 0,
  });
  const [animatedTotals, setAnimatedTotals] = useState({
    ourfrcs_roka: 0,
    ourfrcs_unmil: 0,
    et_nk: 0,
    et_chn: 0,
    idntycfmtn_kia: 0,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const totalsSectionRef = useRef();
  const [isInView, setIsInView] = useState(false);

  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
  // 해당변수는 호스트가 localhost에서 클라이언트 서버를 열면 값이 없지만 다른 호스트를 사용시에는 netlify.toml에 설정해둔
  // proxy값을 할당 받는다.

  const fetchData = async () => {
    try {
      setLoading(true);
      const API_KEY = process.env.REACT_APP_API_KEY;
      const SERVICE = "DS_625_KIA_COPSEXCVT_PRS";
      const MAX_INDEX = 100;
      let startIndex = 1;
      let endIndex = MAX_INDEX;
      let allData = [];

      while (true) {
        const API_URL = `${PROXY}/${API_KEY}/json/${SERVICE}/${startIndex}/${endIndex}`;
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
            (t) =>
              t.std_date === item.std_date && t.excvt_year === item.excvt_year
          )
        );
      });

      const totals = uniqueData.reduce(
        (acc, item) => {
          acc.ourfrcs_roka += parseInt(item.ourfrcs_roka || 0);
          acc.ourfrcs_unmil += parseInt(item.ourfrcs_unmil || 0);
          acc.et_nk += parseInt(item.et_nk || 0);
          acc.et_chn += parseInt(item.et_chn || 0);
          acc.idntycfmtn_kia += parseInt(item.idntycfmtn_kia || 0);
          return acc;
        },
        {
          ourfrcs_roka: 0,
          ourfrcs_unmil: 0,
          et_nk: 0,
          et_chn: 0,
          idntycfmtn_kia: 0,
        }
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

  const animateValue = (key, start, end, duration = 50) => {
    // start가 항상 0이 되도록 고정하고, end 값을 그대로 사용
    const startValue = 0;
    const endValue = end;

    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // currentValue가 0부터 end까지 자연스럽게 증가하도록 처리
      const currentValue = Math.max(
        0,
        Math.round(startValue + (endValue - startValue) * progress)
      );

      setAnimatedTotals((prev) => ({ ...prev, [key]: currentValue }));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (totalsSectionRef.current) {
      observer.observe(totalsSectionRef.current);
    }

    return () => {
      if (totalsSectionRef.current) {
        observer.unobserve(totalsSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      Object.keys(totals).forEach((key) =>
        animateValue(key, 0, totals[key], 50)
      );
    }
  }, [isInView, totals]);

  const generateChartOptions = (chunk) => ({
    chart: { type: "bar", stacked: true },
    xaxis: {
      categories: chunk.map((item) => item.year),
      labels: {
        style: {
          fontSize: "13px", // 폰트 크기 설정
          fontWeight: "bold", // 폰트 굵기 설정
        },
      },
    },
    yaxis: {
      max: 100, // y축 최대값 설정
      labels: {
        formatter: (value) => `${value}%`, // y축 레이블에 % 표시
        style: {
          fontSize: "13px", // 폰트 크기 설정
          fontWeight: "bold", // 폰트 굵기 설정
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => `${value}%`, // 데이터 레이블에 % 표시
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      y: {
        formatter: (value, { seriesIndex, dataPointIndex }) => {
          const keys = [
            "ourfrcs_roka",
            "ourfrcs_unmil",
            "et_nk",
            "et_chn",
            "idntycfmtn_kia",
          ];
          const key = keys[seriesIndex];
          const rawValue = parseInt(chunk[dataPointIndex][key] || 0, 10); // 실제 값 참조, 0 처리
          const percentage = rawValue === 0 ? 0 : value.toFixed(2); // 0명일 때 퍼센트도 0%

          return `${rawValue.toLocaleString()}명 (${percentage}%)`;
        },
      },
    },
  });

  const generateChartSeries = (chunk) => [
    {
      name: "아군 국군",
      data: chunk.map((item) => parseFloat(item.ourfrcs_roka)),
    },
    {
      name: "아군 UN군",
      data: chunk.map((item) => parseFloat(item.ourfrcs_unmil)),
    },
    { name: "적군 북한", data: chunk.map((item) => parseFloat(item.et_nk)) },
    { name: "적군 중국", data: chunk.map((item) => parseFloat(item.et_chn)) },
    {
      name: "신원확인 전사자",
      data: chunk.map((item) => parseFloat(item.idntycfmtn_kia)),
    },
  ];

  const formattedData = data.map((item) => {
    const total =
      parseInt(item.ourfrcs_roka || 0) +
      parseInt(item.ourfrcs_unmil || 0) +
      parseInt(item.et_nk || 0) +
      parseInt(item.et_chn || 0) +
      parseInt(item.idntycfmtn_kia || 0);

    return {
      year: item.excvt_year,
      ourfrcs_roka: ((parseInt(item.ourfrcs_roka || 0) / total) * 100).toFixed(
        2
      ),
      ourfrcs_unmil: (
        (parseInt(item.ourfrcs_unmil || 0) / total) *
        100
      ).toFixed(2),
      et_nk: ((parseInt(item.et_nk || 0) / total) * 100).toFixed(2),
      et_chn: ((parseInt(item.et_chn || 0) / total) * 100).toFixed(2),
      idntycfmtn_kia: (
        (parseInt(item.idntycfmtn_kia || 0) / total) *
        100
      ).toFixed(2),
    };
  });

  const sortedData = formattedData.sort((a, b) => b.year - a.year);
  const chunkedData = [];
  for (let i = 0; i < sortedData.length; i += 10) {
    chunkedData.push(sortedData.slice(i, i + 10));
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="mt-24 relative">
        {/* 로딩 메시지 */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <p className="bg-white text-xl font-semibold p-10 rounded-lg shadow-lg">
              데이터를 불러오는 중입니다...
            </p>
          </div>
        )}
        <div
          ref={totalsSectionRef}
          className="w-full bg-black py-20"
          data-aos="fade"
        >
          <div className="max-w-[100rem] mx-auto">
            <h1 className="text-center text-3xl font-extrabold text-white mb-4">
              전사자 유해 발굴 합계 현황
            </h1>
            <p className="text-center text-xl font-semibold text-white mb-8">
              (2000년 ~ 2021년)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 py-4 gap-8">
              {/* 대한민국 국기 */}
              <div className="bg-white shadow-lg rounded-xl p-8 text-center relative overflow-hidden">
                {/* 배경 이미지 */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://flagcdn.com/w320/kr.png')",
                  }}
                ></div>
                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-black opacity-40"></div>
                {/* 텍스트 콘텐츠 */}
                <div className="relative z-10">
                  <p className="text-white text-xl font-semibold mb-4">
                    총 아군 국군
                  </p>
                  <p className="text-5xl font-extrabold text-white">
                    {animatedTotals.ourfrcs_roka.toLocaleString()}명
                  </p>
                </div>
              </div>

              {/* UN 국기 */}
              <div className="bg-white shadow-lg rounded-xl p-8 text-center relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://flagcdn.com/w320/un.png')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10">
                  <p className="text-white text-xl font-semibold mb-4">
                    총 아군 UN군
                  </p>
                  <p className="text-5xl font-extrabold text-white">
                    {animatedTotals.ourfrcs_unmil.toLocaleString()}명
                  </p>
                </div>
              </div>

              {/* 신원확인 전사자 */}
              <div className="bg-white shadow-lg rounded-xl p-8 text-center relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://flagcdn.com/w320/un.png')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10">
                  <p className="text-white text-xl font-semibold mb-4">
                    총 신원확인 전사자
                  </p>
                  <p className="text-5xl font-extrabold text-white">
                    {animatedTotals.idntycfmtn_kia.toLocaleString()}명
                  </p>
                </div>
              </div>

              {/* 북한 국기 */}
              <div className="bg-white shadow-lg rounded-xl p-8 text-center relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://flagcdn.com/w320/kp.png')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10">
                  <p className="text-white text-xl font-semibold mb-4">
                    총 적군 북한
                  </p>
                  <p className="text-5xl font-extrabold text-white">
                    {animatedTotals.et_nk.toLocaleString()}명
                  </p>
                </div>
              </div>

              {/* 중국 국기 */}
              <div className="bg-white shadow-lg rounded-xl p-8 text-center relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://flagcdn.com/w320/cn.png')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10">
                  <p className="text-white text-xl font-semibold mb-4">
                    총 적군 중국
                  </p>
                  <p className="text-5xl font-extrabold text-white">
                    {animatedTotals.et_chn.toLocaleString()}명
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 차트 영역 */}
        <div className="w-full bg-white">
          <div className=" max-w-[90rem] mx-auto py-16" data-aos="fade">
            <Slider {...settings}>
              {chunkedData.map((chunk, index) => (
                <div key={index} className="p-4">
                  <Chart
                    options={generateChartOptions(chunk)}
                    series={generateChartSeries(chunk)}
                    type="bar"
                    height={500}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* 유해 발굴단 소개 컴포넌트 */}
      <YoutubeSection />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Excavation;
