import React, { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import * as THREE from "three";
import ApexCharts from "react-apexcharts";

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
  const [activeTab, setActiveTab] = useState("personnel");

 // 참전국 데이터 (한국어로 변경 및 국기 이미지 URL 추가) supportType(지원구분), personnel(참전 연인원), role(참전 형태), casualties(피해 계), deaths(전사), injuries(부상), missing(실종), prisoners(포로) 추가.
 const countries = [
  { country: "미국", lat: 38.9072, lng: -77.0369, flag: "https://flagcdn.com/w320/us.png", supportType: "전투지원", personnel: 1789000, role: "육해공군", casualties: 133996, deaths: 33686, injuries: 92134, missing: 3737, prisoners: 4439 },
  { country: "영국", lat: 51.5074, lng: -0.1278, flag: "https://flagcdn.com/w320/gb.png", supportType: "전투지원", personnel: 56000, role: "육해군", casualties: 4909, deaths: 1078, injuries: 2674, missing: 179, prisoners: 978 },
  { country: "터키", lat: 39.9208, lng: 32.8541, flag: "https://flagcdn.com/w320/tr.png", supportType: "전투지원", personnel: 21212, role: "육군", casualties: 2365, deaths: 966, injuries: 1155, missing: 0, prisoners: 244 },
  { country: "캐나다", lat: 45.4215, lng: -75.6972, flag: "https://flagcdn.com/w320/ca.png", supportType: "전투지원", personnel: 26791, role: "육해공군", casualties: 1761, deaths: 516, injuries: 1212, missing: 1, prisoners: 32 },
  { country: "호주", lat: -35.2809, lng: 149.1300, flag: "https://flagcdn.com/w320/au.png", supportType: "전투지원", personnel: 17164, role: "육해공군", casualties: 1584, deaths: 340, injuries: 1216, missing: 0, prisoners: 28 },
  { country: "프랑스", lat: 48.8566, lng: 2.3522, flag: "https://flagcdn.com/w320/fr.png", supportType: "전투지원", personnel: 3421, role: "육해군", casualties: 1289, deaths: 262, injuries: 1008, missing: 7, prisoners: 12 },
  { country: "필리핀", lat: 14.5995, lng: 120.9842, flag: "https://flagcdn.com/w320/ph.png", supportType: "전투지원", personnel: 7420, role: "육군", casualties: 468, deaths: 112, injuries: 299, missing: 16, prisoners: 41 },
  { country: "그리스", lat: 37.9838, lng: 23.7275, flag: "https://flagcdn.com/w320/gr.png", supportType: "전투지원", personnel: 4992, role: "육공군", casualties: 738, deaths: 192, injuries: 543, missing: 0, prisoners: 3 },
  { country: "네덜란드", lat: 52.3676, lng: 4.9041, flag: "https://flagcdn.com/w320/nl.png", supportType: "전투지원", personnel: 5322, role: "육해군", casualties: 768, deaths: 120, injuries: 645, missing: 0, prisoners: 3 },
  { country: "뉴질랜드", lat: -41.2865, lng: 174.7762, flag: "https://flagcdn.com/w320/nz.png", supportType: "전투지원", personnel: 3794, role: "육해군", casualties: 103, deaths: 23, injuries: 79, missing: 1, prisoners: 0 },
  { country: "태국", lat: 13.7563, lng: 100.5018, flag: "https://flagcdn.com/w320/th.png", supportType: "전투지원", personnel: 6326, role: "육해공군", casualties: 1273, deaths: 129, injuries: 1139, missing: 5, prisoners: 0 },
  { country: "남아프리카 공화국", lat: -25.7461, lng: 28.1881, flag: "https://flagcdn.com/w320/za.png", supportType: "전투지원", personnel: 826, role: "공군", casualties: 44, deaths: 36, injuries: 0, missing: 0, prisoners: 8 },
  { country: "콜롬비아", lat: 4.711, lng: -74.0721, flag: "https://flagcdn.com/w320/co.png", supportType: "전투지원", personnel: 5100, role: "육군 및 해군", casualties: 639, deaths: 163, injuries: 448, missing: 28, prisoners: 0 },
  { country: "벨기에", lat: 50.8503, lng: 4.3517, flag: "https://flagcdn.com/w320/be.png", supportType: "전투지원", personnel: 3498, role: "육군", casualties: 440, deaths: 99, injuries: 336, missing: 4, prisoners: 1 },
  { country: "에티오피아", lat: 9.145, lng: 40.4897, flag: "https://flagcdn.com/w320/et.png", supportType: "전투지원", personnel: 3518, role: "육군", casualties: 658, deaths: 122, injuries: 536, missing: 0, prisoners: 0 },
  { country: "룩셈부르크", lat: 49.8153, lng: 6.1296, flag: "https://flagcdn.com/w320/lu.png", supportType: "전투지원", personnel: 100, role: "육군", casualties: 15, deaths: 2, injuries: 13, missing: 0, prisoners: 0 },
  { country: "이탈리아", lat: 41.9028, lng: 12.4964, flag: "https://flagcdn.com/w320/it.png", supportType: "의료지원", personnel: 128, role: "적십자병원", casualties: 0, deaths: 0, injuries: 0, missing: 0, prisoners: 0 },
  { country: "인도", lat: 20.5937, lng: 78.9629, flag: "https://flagcdn.com/w320/in.png", supportType: "의료지원", personnel: 627, role: "야전병원", casualties: 26, deaths: 0, injuries: 0, missing: 0, prisoners: 0 },
  { country: "노르웨이", lat: 60.472, lng: 8.4689, flag: "https://flagcdn.com/w320/no.png", supportType: "의료지원", personnel: 623, role: "이동외과병원", casualties: 3, deaths: 0, injuries: 0, missing: 0, prisoners: 0 },
  { country: "덴마크", lat: 56.2639, lng: 9.5018, flag: "https://flagcdn.com/w320/dk.png", supportType: "의료지원", personnel: 630, role: "병원선", casualties: 0, deaths: 0, injuries: 0, missing: 0, prisoners: 0 },
  { country: "스웨덴", lat: 60.1282, lng: 18.6435, flag: "https://flagcdn.com/w320/se.png", supportType: "의료지원", personnel: 1124, role: "적십자병원", casualties: 0, deaths: 0, injuries: 0, missing: 0, prisoners: 0 },
];


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
    return countries.map((country) => ({
      x: country.country,
      y: parseFloat(((country[key] / totals[key]) * 100).toFixed(2)) || 0,
    }));
  };

  const chartOptions = (categories) => ({
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
        borderRadius: 4, // 모서리를 둥글게 설정
        borderWidth: 2, // 바 테두리 두께 설정
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opt) => {
        const label = categories[opt.dataPointIndex] || "알 수 없음";
        return `${label}: ${val !== null ? val.toFixed(2) : 0}%`;
      },
    },
    xaxis: {
      categories,
      title: { text: "비율 (%)" },
    },
    colors: [
      "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
      "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
      "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#c5b0d5",
      "#c49c94", "#f7b6d2", "#c7c7c7", "#dbdb8d", "#9edae5"
    ],
    stroke: {
      show: true,
      width: 1, // 선 굵기 설정
    },
  });
  

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

  const chartTitles = {
    personnel: "참전 총인원 비율",
    deaths: "전사 비율",
    injuries: "부상 비율",
    missing: "실종 비율",
    prisoners: "포로 비율",
  };

  return (
    <div className="">
      <div ref={globeEl} className="w-full flex-1 m-auto" />
      {selectedCountry && (
        <div
          className="absolute top-1/2 right-10 bg-gray-100 p-4 rounded-lg shadow-lg w-1/4 z-10"
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            transform: "translateY(-50%)",
          }}
        >
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.country}
            className="w-16 h-auto mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-center mb-2">
            {selectedCountry.country}
          </h2>
          <p>지원 구분: {selectedCountry.supportType}</p>
          <p>참전 연인원: {selectedCountry.personnel.toLocaleString()}</p>
          <p>참전 형태: {selectedCountry.role}</p>
          <p>피해 계: {selectedCountry.casualties.toLocaleString()}</p>
          <p>전사: {selectedCountry.deaths.toLocaleString()}</p>
          <p>부상: {selectedCountry.injuries.toLocaleString()}</p>
          <p>실종: {selectedCountry.missing.toLocaleString()}</p>
          <p>포로: {selectedCountry.prisoners.toLocaleString()}</p>
        </div>
      )}

    <div ref={totalsSectionRef} className="w-full bg-white text-black flex flex-col items-center justify-center py-20 border-t border-gray-300">
        <h2 className="text-3xl font-bold mb-20">UN군 총 참전 현황</h2>
        <div className="grid grid-cols-5 gap-10 text-center">
          <div className="bg-gray-200 rounded-lg shadow-lg p-7 hover:shadow-xl transition-shadow duration-300">
            <p className="text-xl font-semibold mb-8">참전 총인원</p>
            <p className="text-4xl font-bold min-w-[6em] text-center">
              {animatedValues.personnel.toLocaleString()}명
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg shadow-lg p-7 hover:shadow-xl transition-shadow duration-300">
            <p className="text-xl font-semibold mb-8">전사 총인원</p>
            <p className="text-4xl font-bold min-w-[6em] text-center">
              {animatedValues.deaths.toLocaleString()}명
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg shadow-lg p-7 hover:shadow-xl transition-shadow duration-300">
            <p className="text-xl font-semibold mb-8">부상 총인원</p>
            <p className="text-4xl font-bold min-w-[6em] text-center">
              {animatedValues.injuries.toLocaleString()}명
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg shadow-lg p-7 hover:shadow-xl transition-shadow duration-300">
            <p className="text-xl font-semibold mb-8">실종 총인원</p>
            <p className="text-4xl font-bold min-w-[6em] text-center">
              {animatedValues.missing.toLocaleString()}명
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg shadow-lg p-7 hover:shadow-xl transition-shadow duration-300">
            <p className="text-xl font-semibold mb-8">포로 총인원</p>
            <p className="text-4xl font-bold min-w-[6em] text-center">
              {animatedValues.prisoners.toLocaleString()}명
            </p>
          </div>
        </div>
      </div>


      <div className="w-full bg-blue-400 text-white py-10">
        <h2 className="text-2xl text-center font-bold mb-4">국가별 비율 차트</h2>
        <div className="flex justify-center mb-4 space-x-4">
          {Object.keys(chartTitles).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded ${
                activeTab === key ? "bg-white text-blue-600" : "bg-blue-600 text-white"
              }`}
            >
              {chartTitles[key]}
            </button>
          ))}
        </div>
        <div className="w-4/5 bg-white p-4 shadow-md rounded-lg mx-auto"> {/* 너비를 80%로 설정 */}
          <h3 className="text-lg font-semibold text-center mb-4 text-black">
            {chartTitles[activeTab]}
          </h3>
          <ApexCharts
            options={{
              ...chartOptions(countries.map((c) => c.country)),
              chart: {
                ...chartOptions(countries.map((c) => c.country)).chart,
                width: "100%", // 내부 차트의 너비를 100%로 유지
              },
            }}
            series={[
              {
                name: "비율",
                data: getChartData(activeTab).map((d) => d.y),
              },
            ]}
            type="bar"
            height={countries.length * 30} // 국가 개수에 비례한 높이
          />
        </div>
      </div>

      {/* 콘텐츠 3 */}
      <div className="w-full bg-green-400 text-white flex items-center justify-center z-0" style={{ height: "300px" }}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <p className="text-gray-700 text-center md:text-left">
           <h2 className="text-2xl font-semibold text-center mb-4">턴 투어드 부산</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer too.
          </p>
          <div className="w-full md:w-1/2 h-48 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Participation;
