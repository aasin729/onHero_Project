import React from "react";
import videoFile from "../assets/videos/movie1.mp4";
import Header from "../components/Header";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Hero Section (Video Background) */}
      <div className="relative flex items-center justify-center min-h-screen pt-16">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
       \
      </div>

      {/* Section: 한국전쟁 정보 */}
      <section className="py-8 px-4 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4">한국전쟁</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <p className="text-gray-700 text-center md:text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer too.
          </p>
          <div className="w-full md:w-1/2 h-48 bg-gray-300 rounded-lg"></div>
        </div>
      </section>

      {/* Section: Poem */}
      <section className="py-8 px-4 bg-gray-200 text-center">
        <p className="text-gray-800 leading-relaxed">
          이 강산은 내가 지키노라 당신의 그 충정 <br />
          하늘 보며 힘껏 흔들었던 평화의 깃발 <br />
          아 다시 선 이 땅엔, 당신 심은 푸른 소나무 <br />
          이 목숨 바쳐 큰 나라 위해 끝까지 싸우리라
        </p>
      </section>

      {/* Section: Ads */}
      <section className="py-8 px-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-red-100 rounded-lg shadow-md text-center">
            <p className="text-gray-800 mb-4">
              지금, 참전용사와 그 가족의 안녕을 위해
              <br />
              국가보훈처와 함께해주세요
            </p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
              후원하기
            </button>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow-md text-center">
            <p className="text-gray-800 mb-4">
              영웅의 귀환을
              <br />
              DNA로 함께 밝혀요!
            </p>
            <p className="font-bold text-lg">1577-5625</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
            <p className="text-gray-800 mb-4">
              6.25 전사자 유해 찾기 프로젝트
              <br />
              유전자 시료채취 참여 안내
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              자세히 보기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        사이버 추모
      </footer>
    </div>
  );
};

export default MainPage;
