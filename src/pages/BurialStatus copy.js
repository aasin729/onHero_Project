import React, { useState } from "react";
import SeoulMemorialAPI from "../components/SeoulMemorialAPI";
import NationalMemorialMap from "../components/NationalMemorialMap";
import Footer from "../shared/footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import YoutubeSection2 from "../components/YoutubeSection2";

const BurialStatus = () => {

  const slideImages = [
    "../assets/images/slide1.jpg",
    "../assets/images/slide2.jpg",
    "../assets/images/slide3.jpg",
  ];

  return (
    <div>
      {/* 상단 콘텐츠 섹션 */}
      <div className="w-full bg-gray-400 py-40 mt-20">
        <div className="container mx-auto flex flex-row items-center gap-8">
          {/* 소개 글 */}
          <div className="w-1/2 text-gray-800">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">국립 서울 현충원</h2>
            <p className="text-gray-600 mb-8">
              국립서울현충원은 지난 1955년 7월, 국군묘지로 창설된 이래 국가와 민족을
              위하여 희생하신 순국선열과 호국영령들의 충정과 위훈을 기리는 민족의 성지로 자리매김하여
              왔습니다. 그리고 ‘국민에게 사랑받는 열린 호국추모공원 조성’을 목표로 다양한 국민 친화적
              호국행사를 실시하고 쾌적하고 편리한 참배환경을 조성하며 고객 중심의 안장ㆍ추모 서비스를
              제공하는 등 국민과 함께 호흡하는 호국공원으로 거듭나고 있습니다.
            </p>
          </div>
          {/* 이미지 슬라이드 */}
          <div className="w-1/2">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="rounded-lg shadow-lg overflow-hidden"
            >
              {slideImages.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-72 object-cover"
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
