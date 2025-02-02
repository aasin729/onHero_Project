import React, { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import * as THREE from "three";
import ApexCharts from "react-apexcharts";
import { countries } from "../data/countries";
import Footer from "../components/footer";
import AOS from "aos";
import "aos/dist/aos.css";

const Participation = () => {
  const globeEl = useRef();
  const totalsSectionRef = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    personnel: 0,
    deaths: 0,
    injuries: 0,
    missing: 0,
    prisoners: 0,
  });
  // const [activeTab, setActiveTab] = useState("personnel");

    // 겹치는 유럽 국가 위치 조정
    const adjustedCountries = countries.map((country) => {
      if (["영국", "프랑스", "벨기에", "네덜란드"].includes(country.country)) {
        // 겹치는 국가들에 대해 조정
        if (country.country === "영국") {
          return { ...country, lat: country.lat + 1, lng: country.lng - 1 };
        }
        if (country.country === "프랑스") {
          return { ...country, lat: country.lat - 1, lng: country.lng + 8 };
        }
        if (country.country === "벨기에") {
          return { ...country, lat: country.lat + 1, lng: country.lng + 5 };
        }
        if (country.country === "네덜란드") {
          return { ...country, lat: country.lat - 4, lng: country.lng - 4 };
        }
      }
      return country;
    });

  const totals = countries.reduce(
    (acc, country) => ({
      personnel: acc.personnel + country.personnel,
      deaths: acc.deaths + country.deaths,
      injuries: acc.injuries + country.injuries,
      missing: acc.missing + country.missing,
      prisoners: acc.prisoners + country.prisoners,
    }),
    { personnel: 0, deaths: 0, injuries: 0, missing: 0, prisoners: 0 }
  );

  const animateValue = (key, start, end, duration) => {
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = Math.floor(start + (end - start) * progress);

      setAnimatedValues((prev) => ({ ...prev, [key]: currentValue }));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const getChartData = (key) => {
    if (!totals[key] || totals[key] === 0) {
      return [];
    }
    return countries
      .map((country) => ({
        x: country.country,
        y: parseFloat(((country[key] / totals[key]) * 100).toFixed(2)) || 0,
      }))
      .sort((a, b) => b.y - a.y) // 내림차순 정렬
      .slice(0, 5); // 상위 5개만 선택
  };

  const chartOptions = (key) => ({
    labels: getChartData(key).map((d) => d.x),
    legend: {
      position: "right", // 범례를 오른쪽으로 배치
      offsetY: 0, // 수직 위치 조정 (중앙 정렬)
      fontSize: "14px",
      fontFamily: "Arial, sans-serif",
      labels: {
        colors: "#333", // 범례 텍스트 색상
      },
      markers: {
        width: 10,
        height: 10,
      },
      itemMargin: {
        vertical: 5, // 항목 간 간격
      },
    },
    chart: {
      type: "donut", // 도넛 차트
    },
    colors: ["#ea4f4f", "#e5842f", "#6e376e", "#77ac85", "#0288d1", ],
    plotOptions: {
      pie: {
        donut: {
          size: "60%", // 도넛 크기 조정
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontWeight: 600,
              color: "#333",
              offsetY: -10, // 타이틀 위치 조정
            },
            value: {
              show: false, // 중앙 값 숨김
            },
            total: {
              show: true,
              label: chartTitles[key], // 중앙 타이틀
              fontSize: "20px",
              fontWeight: 600,
              color: "#666",
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value.toFixed(2)}%`, // 퍼센트 표시 형식
      },
      style: {
        fontSize: "14px",
        fontFamily: "Arial, sans-serif",
      },
    },
  });
  
  const chartTitles = {
    personnel: "총 인원 비율",
    deaths: "전사 비율",
    injuries: "부상 비율",
    missing: "실종 비율",
    prisoners: "포로 비율",
  };

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
      animateValue("personnel", 0, totals.personnel, 2000);
      animateValue("deaths", 0, totals.deaths, 2000);
      animateValue("injuries", 0, totals.injuries, 2000);
      animateValue("missing", 0, totals.missing, 2000);
      animateValue("prisoners", 0, totals.prisoners, 2000);
    }
  }, [isInView]);

  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .customLayerData(adjustedCountries)
      .customThreeObject(({ flag }) => {
        const texture = new THREE.TextureLoader().load(flag);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(10, 7, 1);
        return sprite;
      })
      .customThreeObjectUpdate((obj, { lat, lng }) => {
        const { x, y, z } = globe.getCoords(lat, lng, 0.05);
        obj.position.set(x, y, z);
      });

    globe.onCustomLayerClick((event) => {
      setSelectedCountry(event);
    });

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 2;
    globe.controls().enableZoom = false;
  }, []); 
   
  useEffect(() => {
    AOS.init({
         duration: 1000, // 애니메이션 지속 시간
         once: false, // 애니메이션 반복 실행
         easing: "ease-in-out", // 애니메이션 효과
         offset: 50, // 애니메이션 시작 지점
       });
  }, []);

  return (
    <div className="">
      <div className="relative w-full h-screen bg-gray-950 flex items-center justify-center">
          <div className="relative w-full h-full flex justify-center items-center">
              {/* 지구본 */}
              <div
                ref={globeEl}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-1"
              />

              {/* 왼쪽 오버레이 문구 */}
              <div
                className="absolute top-1/2 left-10 bg-balck bg-opacity-70 text-white p-4 rounded-lg shadow-lg w-[25%] z-20 transform -translate-y-1/2"
                style={{
                  maxHeight: "80vh",
                  overflowY: "auto",
                }}
              >
                <h2 className="text-5xl font-bold text-center mb-6" data-aos="fade">6.25전쟁 UN참전국</h2>
                <p className="text-center text-xl" data-aos="fade">
                  국기를 클릭하면 각 국가의 <br /> 참전 정보를 확인할 수 있습니다.
                </p>
              </div>
              
              {/* 선택된 국가 정보 */}
              {selectedCountry && (
                <div
                  className="absolute top-1/2 right-10 bg-white p-6 rounded-lg shadow-lg w-[24%] z-20 transform -translate-y-1/2"
                  style={{
                    maxHeight: "80vh",
                    overflowY: "auto",
                  }}
                >
                  <div className="flex items-center">
                    {/* 왼쪽: 국기와 국명 */}
                    <div className="flex-1 text-center">
                      <img
                        src={selectedCountry.flag}
                        alt={selectedCountry.country}
                        className="w-32 h-24 mx-auto mb-4"
                      />
                      <h2 className="text-lg font-bold">{selectedCountry.country}</h2>
                    </div>
                    
                    {/* 오른쪽: 텍스트 정보 */}
                    <div className="flex-1">
                      <p>지원 구분: <span className="text-base font-bold ml-2">{selectedCountry.supportType}</span></p>
                      <p>참전 연인원: <span className="text-base font-bold ml-2">{selectedCountry.personnel.toLocaleString()}명</span></p>
                      <p>참전 형태: <span className="text-base font-bold ml-2">{selectedCountry.role}</span></p>
                      <p>피해 계: <span className="text-base font-bold ml-2">{selectedCountry.casualties.toLocaleString()}명</span></p>
                      <p>전사: <span className="text-base font-bold ml-2">{selectedCountry.deaths.toLocaleString()}명</span></p>
                      <p>부상: <span className="text-base font-bold ml-2">{selectedCountry.injuries.toLocaleString()}명</span></p>
                      <p>실종: <span className="text-base font-bold ml-2">{selectedCountry.missing.toLocaleString()}명</span></p>
                      <p>포로: <span className="text-base font-bold ml-2">{selectedCountry.prisoners.toLocaleString()}명</span></p>
                    </div>
                  </div>
                </div>
              )}
          </div>
      </div>

        {/* 참전 현황부분 */}
      <div ref={totalsSectionRef} className="w-full bg-white text-black flex flex-col items-center justify-center py-20 border-t border-gray-300">
        <h2 className="text-3xl font-bold mb-12">UN군 총 참전 현황</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center">
          <div className="bg-gray-900 rounded-lg shadow-lg p-7 hover:shadow-xl transition-shadow duration-300">
            <p className="text-xl text-gray-400 font-semibold mb-8">참전 총인원</p>
            <p className="text-4xl text-white  font-bold min-w-[6em] text-center">
              {animatedValues.personnel.toLocaleString()}명
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-lg p-7 hover:shadow-xl transition-shadow duration-300">
            <p className="text-xl text-gray-400 font-semibold mb-8">전사 총인원</p>
            <p className="text-4xl text-white  font-bold min-w-[6em] text-center">
              {animatedValues.deaths.toLocaleString()}명
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-lg p-7 hover:shadow-xl transition-shadow duration-300">
            <p className="text-xl text-gray-400 font-semibold mb-8">부상 총인원</p>
            <p className="text-4xl text-white font-bold min-w-[6em] text-center">
              {animatedValues.injuries.toLocaleString()}명
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-lg p-7 hover:shadow-xl transition-shadow duration-300">
            <p className="text-xl text-gray-400 font-semibold mb-8">실종 총인원</p>
            <p className="text-4xl text-white  font-bold min-w-[6em] text-center">
              {animatedValues.missing.toLocaleString()}명
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-lg p-7 hover:shadow-xl transition-shadow duration-300">
            <p className="text-xl text-gray-400 font-semibold mb-8">포로 총인원</p>
            <p className="text-4xl text-white  font-bold min-w-[6em] text-center">
              {animatedValues.prisoners.toLocaleString()}명
            </p>
          </div>
        </div>
      </div>

        {/* 차트부분 */}
      <div
        className="w-full py-20 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/img/unhero.png')" }}
      >
        <h2 className="text-3xl text-center text-white font-bold mb-4" data-aos="fade">UN 참전국가별 비율 차트 (상위 5개국가)</h2>
        <p className="text-xl text-center text-gray-200 font-semibold mb-8" data-aos="fade">* 상위 5개 국가까지만 차트에 표시됩니다.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 w-4/6 mx-auto" data-aos="fade">
          {Object.keys(chartTitles).map((key) => (
            <div 
              key={key} 
              className="p-4 shadow-md rounded-xl bg-white bg-opacity-70"
            >
              <h3 className="text-lg font-semibold text-center mb-4 text-black">
                {chartTitles[key]}
              </h3>
              <ApexCharts
                options={chartOptions(key)}
                series={getChartData(key).map((d) => d.y)}
                type="donut"
                height={300}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 콘텐츠 3 */}
      <div className="w-full bg-blue-400 text-white flex items-center justify-center" style={{ height: "500px" }} >
        <div className="container flex flex-col md:flex-row items-center justify-between px-4 md:px-8" data-aos="fade">

          {/* 왼쪽 섹션: 문구 */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
            <h2 className="text-3xl font-bold mb-4">유엔참전용사 국제추모의 날</h2>
            <h3 className="text-4xl font-extrabold mb-6">Turn Toward Busan</h3>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-blue-600 text-white rounded-md w-16 h-16 flex items-center justify-center text-3xl font-bold">11</div>
              <span className="text-3xl font-bold">월</span>
              <div className="bg-blue-600 text-white rounded-md w-16 h-16 flex items-center justify-center text-3xl font-bold">11</div>
              <span className="text-3xl font-bold">일</span>
              <div className="bg-blue-600 text-white rounded-md w-16 h-16 flex items-center justify-center text-3xl font-bold">11</div>
              <span className="text-3xl font-bold">시</span>
            </div>
            <p className="text-center font-semibold mt-6 text-gray-100 text-base md:text-lg px-4">
              6·25전쟁에서 대한민국의 자유와 평화를 위해<br /> 헌신한 유엔참전용사를 기억하기 위해<br />
              매년 11월 11시 부산을 향하여 1분간 묵념하는 추모식을 거행합니다.
            </p>
          </div>

          {/* 오른쪽 섹션: 유튜브 영상 */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <iframe
          className="w-full max-w-xl h-[300px] md:h-[350px]"  // 너비와 높이 조정
          src="https://www.youtube.com/embed/qJPQLl6npMs?si=lHwIfeOHw-k5O_A3"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
  </div>
</div>

    {/* Footer */}
     <Footer />
    </div>
  );
};

export default Participation;
