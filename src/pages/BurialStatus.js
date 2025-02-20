import React, { useEffect } from "react";
import SeoulMemorialAPI from "../components/SeoulMemorialAPI";
import NationalMemorialMap from "../components/NationalMemorialMap";
import Footer from "../shared/footer";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import YoutubeSection2 from "../components/YoutubeSection2";

const BurialStatus = () => {

   useEffect(() => {
      // AOS 초기화
      AOS.init({
        duration: 800, // 애니메이션 지속 시간
        once: false, // 애니메이션 반복 실행
        easing: "ease-in-out", // 애니메이션 효과
        offset: 50, // 애니메이션 시작 지점
      });
    }, []);

  const slideImages = [
    "/img/cemetaryimg1.png",
    "/img/cemetaryimg2.png",
    "/img/cemetaryimg3.png",
  ];

  return (
    <div>
      {/* 상단 콘텐츠 섹션 */}
      <div className="w-full bg-black py-20 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4" data-aos="fade">
          {/* 소개 글 */}
          <div className="w-full md:w-1/2 text-gray-100 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              국립 서울 현충원
              <p className="text-2xl text-yellow-500 mt-2">SEOUL NATIONAL CEMETERY</p>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-semibold mb-8 leading-relaxed">
              국립서울현충원은 지난 1955년 7월, 국군묘지로 창설된 이래 국가와 민족을
              위하여 희생하신 순국선열과 호국영령들의 충정과 위훈을 기리는 민족의 성지로 자리매김하여 왔습니다.
              그리고 ‘국민에게 사랑받는 열린 호국추모공원 조성’을 목표로 다양한 국민 친화적
              호국행사를 실시하고 쾌적하고 편리한 참배환경을 조성하며 고객 중심의 안장ㆍ추모 서비스를
              제공하는 등 국민과 함께 호흡하는 호국공원으로 거듭나고 있습니다.
            </p>
            <ul className="text-gray-400 text-base leading-6 space-y-2">
              <li><strong>⯈ 전화번호:</strong> 1522-1555</li>
              <li><strong>⯈ 이용시간:</strong> 06:00 ~ 18:00 (정문, 동문, 통문 5개소)</li>
              <li><strong>⯈ 휴무일:</strong> 11월 공휴일, 12~2월 토요일, 공휴일은 전시관 휴관</li>
              <li><strong>⯈ 주소:</strong> 06984 서울 동작구 현충로 210 (동작동, 국립현충원)</li>
              <li><strong>⯈ 교통 정보:</strong> 4, 9호선 동작역 8번 출구에서 약 62m (도보 1분)</li>
            </ul>
          </div>

          {/* 이미지 슬라이드 */}
          <div className="w-full md:w-1/2">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="rounded-lg shadow-lg overflow-hidden"
            >
              <style>
                {`
                  .swiper-button-prev, .swiper-button-next {
                    color: white !important;
                    background-color: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    transition: background-color 0.3s ease-in-out;
                  }
                  .swiper-button-prev:hover, .swiper-button-next:hover {
                    background-color: rgba(255, 255, 255, 0.7);
                  }
                  .swiper-button-prev::after, .swiper-button-next::after {
                    font-size: 20px;
                    font-weight: bold;
                  }
                  .swiper-pagination {
                    display: none !important;
                  }
                `}
              </style>
              {slideImages.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-80 object-cover bg-white"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* 유튜브 섹션 */}
      <YoutubeSection2 />

      {/* 서울 현충원 API 및 지도 */}
      <SeoulMemorialAPI />
      <NationalMemorialMap />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BurialStatus;
