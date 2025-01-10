import React, { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import * as THREE from "three";

const Participation = () => {
  const globeEl = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);

  // 참전국 데이터 (한국어로 변경 및 국기 이미지 URL 추가) supportType(지원구분), personnel(참전 연인원), role(참전 형태), casualties(피해 계), deaths(전사), injuries(부상), missing(실종), prisoners(포로) 추가.
  const countries = [
    { country: "대한민국", lat: 37.5665, lng: 126.978, flag: "https://flagcdn.com/w320/kr.png", supportType: "전투지원", personnel: 1789000, role: "육해공군", casualties: 133996, deaths: 33686, injuries: 92134, missing: 3737, prisoners: 4439 },
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
    { country: "이탈리아", lat: 41.9028, lng: 12.4964, flag: "https://flagcdn.com/w320/it.png", supportType: "의료지원", personnel: 128, role: "적십자병원", casualties: 0, deaths: 0, injuries: 0, missing: 0, prisoners: 0 },
    { country: "벨기에", lat: 50.8503, lng: 4.3517, flag: "https://flagcdn.com/w320/be.png", supportType: "전투지원", personnel: 3498, role: "육군", casualties: 440, deaths: 99, injuries: 336, missing: 4, prisoners: 1 },
    { country: "에티오피아", lat: 9.145, lng: 40.4897, flag: "https://flagcdn.com/w320/et.png", supportType: "전투지원", personnel: 3518, role: "육군", casualties: 658, deaths: 122, injuries: 536, missing: 0, prisoners: 0 },
    { country: "룩셈부르크", lat: 49.8153, lng: 6.1296, flag: "https://flagcdn.com/w320/lu.png", supportType: "전투지원", personnel: 100, role: "육군", casualties: 15, deaths: 2, injuries: 13, missing: 0, prisoners: 0 },
    { country: "인도", lat: 20.5937, lng: 78.9629, flag: "https://flagcdn.com/w320/in.png", supportType: "의료지원", personnel: 627, role: "야전병원", casualties: 26, deaths: 0, injuries: 0, missing: 0, prisoners: 0 },
    { country: "노르웨이", lat: 60.472, lng: 8.4689, flag: "https://flagcdn.com/w320/no.png", supportType: "의료지원", personnel: 623, role: "이동외과병원", casualties: 3, deaths: 0, injuries: 0, missing: 0, prisoners: 0 },
    { country: "덴마크", lat: 56.2639, lng: 9.5018, flag: "https://flagcdn.com/w320/dk.png", supportType: "의료지원", personnel: 630, role: "병원선", casualties: 0, deaths: 0, injuries: 0, missing: 0, prisoners: 0 },
    { country: "스웨덴", lat: 60.1282, lng: 18.6435, flag: "https://flagcdn.com/w320/se.png", supportType: "의료지원", personnel: 1124, role: "적십자병원", casualties: 0, deaths: 0, injuries: 0, missing: 0, prisoners: 0 }
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

  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .customLayerData(adjustedCountries) // 조정된 데이터 적용
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

    globe.controls().autoRotate = true; // 자동 애니메이션  
    globe.controls().autoRotateSpeed = 2; // 애니메이션 속도 조절
    globe.controls().enableZoom = false; // 줌 비활성화
  }, []);


  return (
    <div className="relative h-screen flex flex-col">
    {/* Globe 영역 */}
    <div ref={globeEl} className="w-full flex-1 m-auto"/>
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
    {/* 콘텐츠 영역 */}
    <div
      className="w-full bg-gray-500 text-white flex items-center justify-center z-0"
      style={{ height: "300px" }}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">추가 콘텐츠 영역</h2>
        <p className="text-lg">콘텐츠1</p>
      </div>
    </div>
    {/* 콘텐츠 영역 */}
    <div
      className="w-full bg-blue-400 text-white flex items-center justify-center z-0"
      style={{ height: "300px" }}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">추가 콘텐츠 영역</h2>
        <p className="text-lg">콘텐츠2</p>
      </div>
    </div>
  </div>
  
  );
  
  
};

export default Participation;
