import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import * as THREE from "three";

const UNGlobe = () => {
  const globeEl = useRef();

  // 참전국 데이터 (한국어로 변경 및 국기 이미지 URL 추가)
  const countries = [
    { country: "대한민국", lat: 37.5665, lng: 126.978, flag: "https://flagcdn.com/w320/kr.png" },
    { country: "미국", lat: 38.9072, lng: -77.0369, flag: "https://flagcdn.com/w320/us.png" },
    { country: "영국", lat: 51.5074, lng: -0.1278, flag: "https://flagcdn.com/w320/gb.png" },
    { country: "터키", lat: 39.9208, lng: 32.8541, flag: "https://flagcdn.com/w320/tr.png" },
    { country: "캐나다", lat: 45.4215, lng: -75.6972, flag: "https://flagcdn.com/w320/ca.png" },
    { country: "호주", lat: -35.2809, lng: 149.1300, flag: "https://flagcdn.com/w320/au.png" },
    { country: "프랑스", lat: 48.8566, lng: 2.3522, flag: "https://flagcdn.com/w320/fr.png" },
    { country: "필리핀", lat: 14.5995, lng: 120.9842, flag: "https://flagcdn.com/w320/ph.png" },
    { country: "그리스", lat: 37.9838, lng: 23.7275, flag: "https://flagcdn.com/w320/gr.png" },
    { country: "네덜란드", lat: 52.3676, lng: 4.9041, flag: "https://flagcdn.com/w320/nl.png" },
    { country: "뉴질랜드", lat: -41.2865, lng: 174.7762, flag: "https://flagcdn.com/w320/nz.png" },
    { country: "태국", lat: 13.7563, lng: 100.5018, flag: "https://flagcdn.com/w320/th.png" },
    { country: "남아프리카 공화국", lat: -25.7461, lng: 28.1881, flag: "https://flagcdn.com/w320/za.png" },
    { country: "이탈리아", lat: 41.9028, lng: 12.4964, flag: "https://flagcdn.com/w320/it.png" },
    { country: "벨기에", lat: 50.8503, lng: 4.3517, flag: "https://flagcdn.com/w320/be.png" },
    { country: "콜롬비아", lat: 4.7110, lng: -74.0721, flag: "https://flagcdn.com/w320/co.png" },
    { country: "인도", lat: 28.6139, lng: 77.2090, flag: "https://flagcdn.com/w320/in.png" },
    { country: "에티오피아", lat: 9.1450, lng: 40.4897, flag: "https://flagcdn.com/w320/et.png" },
    { country: "룩셈부르크", lat: 49.8153, lng: 6.1296, flag: "https://flagcdn.com/w320/lu.png" },
    { country: "덴마크", lat: 55.6761, lng: 12.5683, flag: "https://flagcdn.com/w320/dk.png" },
    { country: "노르웨이", lat: 59.9139, lng: 10.7522, flag: "https://flagcdn.com/w320/no.png" },
    { country: "스웨덴", lat: 60.1282, lng: 18.6435, flag: "https://flagcdn.com/w320/se.png"}
  ];

  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png");

    // Custom Objects 추가
    globe.customLayerData(countries)
      .customThreeObject(({ flag }) => {
        const texture = new THREE.TextureLoader().load(flag); // 이미지 텍스처 로드
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);

        // 국기 크기 조정
        sprite.scale.set(10, 7, 1); // 가로 0.5, 세로 0.3으로 설정
        return sprite;
      })
      .customThreeObjectUpdate((obj, { lat, lng }) => {
        const { x, y, z } = globe.getCoords(lat, lng, 0.05); // 이미지 위치 설정 (0.02로 높이를 낮춤)
        obj.position.set(x, y, z);
      });

    // 지구본 회전 설정
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 4;
  }, []);

  return <div ref={globeEl} style={{ width: "100%", height: "600px" }} />;
};

export default UNGlobe;