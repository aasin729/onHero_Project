import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import videoFile from "../assets/videos/movie1.mp4";
import Header from "../shared/Header";
import KoreaWar from "../assets/images/koreawar.png";
import RelatedSites from "../components/RelatedSites";
import Footer from "../shared/footer";

const MainPage = () => {
  useEffect(() => {
    // AOS 초기화
    AOS.init({
      duration: 800, // 애니메이션 지속 시간
      once: false, // 애니메이션 반복 실행
      easing: "ease-in-out", // 애니메이션 효과
      offset: 50, // 애니메이션 시작 지점
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section (Video Background) */}
      <div
        className="relative flex items-center justify-center min-h-screen mb-20 pt-16"
        data-aos="fade"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Section: 한국전쟁 정보 */}
      <section className="py-8 px-4 bg-white" data-aos="fade-up">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">한국전쟁 (6.25 전쟁)</h2>
          <p className="text-gray-500 text-center text-xl font-semibold mb-20">
            1950년 6월 25일 새벽에 북한 공산군이 남북군사분계선이던 38선 전역에 걸쳐 불법 남침함으로써 일어난 한반도에서의 전쟁
          </p>

          
{/* Circle Grid Section */}
<div className="flex justify-center items-center mb-40">
  <div className="grid grid-cols-3 gap-8">
    {[
      "남한 공산화를 위한 침략 전쟁",
      "북한의 치밀한 사전준비에 의한 계획된 전쟁",
      "민족간의 이념 갈등에 의한 동족상잔의 전쟁",
      "UN연합군이 본격적으로 개입한 최초의 전쟁",
      "냉전시대의 개막을 알린 첫 번째 전면전",
      "미·소 양강대국의 국가이익이 충돌된 국제 대리전",
    ].map((text, index) => (
      <div
        key={index}
        className="flex items-center justify-center w-60 h-60 rounded-full shadow-lg text-center transition-transform duration-300 transform hover:scale-105 bg-gradient-to-r from-gray-400 to-gray-700"
        data-aos="fade-up"
        data-aos-delay={`${index * 100}`}
      >
        <span className="px-4 text-white font-semibold text-lg leading-relaxed drop-shadow-lg">
          {index + 1}. {text}
        </span>
      </div>
    ))}
  </div>
</div>




          {/* Image and Text Section */}
          <div
            className="flex flex-col md:flex-row items-center gap-6 mb-20"
            data-aos="fade-right"
          >
               <div className="bg-gray-300 h-80 w-full md:w-1/2 rounded-lg flex items-center justify-center">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/MmsB7vMcjzk?si=ckJw23N8M2VgZfvo"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-gray-700 text-lg leading-loose md:w-1/2">
              6·25 전쟁은 1950년 6월 25일 북한군의 기습남침으로 시작되어 1953년 7월 27일 휴전이 성립되기까지 약 3년 1개월 2일간 계속되었다.
              기간 중 한반도는 38도선을 각각 3회씩이나 넘나드는 낙동강에서 압록강까지 오르내렸으며, 이로 인한 사상 북측에 145만 명의
              사상자를 포함해 항공기부터 탱크 1,756대의 파괴로 전 국토의 80%가 초토화되었다.
            </p>
          </div>

          {/* YouTube Video Section */}
          <div
            className="flex flex-col md:flex-row items-center gap-6 mb-20"
            data-aos="fade-left"
          >
            <p className="text-gray-700 text-lg leading-loose md:w-1/2">
              전쟁 결과 한국과 유엔군은 전사 17만 6,000명, 부상 55만 5,000여명, 실종 및 포로 약 4만 2,000명의 인명 피해를 입었고,
              북한과 중국군은 사망 36만 명, 부상 111만여명, 실종 및 포로 14만 5천명의 피해를 입은 것으로 추정된다. 전국의 61만 가옥과
              4203개의 학교와 파괴되고 삶의 터전을 잃은 350만 명의 난민과 300만명의 학동생도들이 타향에서 외로움과 가난, 고통 등을
              유중이 반세기가 지난 지금까지 끝나지 않은 전쟁으로 남아 있다.
            </p>
            <div className="bg-gray-300 h-full w-full md:w-1/2 rounded-lg flex items-center justify-center text-gray-700 overflow-hidden">
              <img
                src={KoreaWar}
                alt="6.25 전쟁 관련 이미지"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section: Poem */}
      <section
         className="text-center relative overflow-hidden"
         style={{
           backgroundImage: `url("/img/war.png")`,
           backgroundSize: "cover",
           backgroundPosition: "center",
           backgroundRepeat: "no-repeat",
           backgroundAttachment: "fixed",
           color: "white",
           minHeight: "500px",
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
         }}
         data-aos="fade"
        >       
         {/* 어두운 오버레이 */}
         <div
           style={{
             position: "absolute",
             top: 0,
             left: 0,
             width: "100%",
             height: "100%",
             backgroundColor: "rgba(0, 0, 0, 0.5)",
             zIndex: 0,
           }}
         ></div>

         {/* 텍스트 */}
         <p
           className="leading-relaxed shadow-lg font-semibold text-2xl p-4 rounded-lg inline-block"
           style={{
             fontFamily: "'Dancing Script', cursive", // Google Font 적용
             position: "absolute",
             top: "50%",
             left: "50%",
             transform: "translate(-50%, -50%)",
             zIndex: 1,
             letterSpacing: "1px", // 약간의 간격 추가
             textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // 텍스트 그림자
           }}
         >
           이 강산은 내가 지키노라 당신의 그 충정 <br />
           하늘 보며 힘껏 흔들었던 평화의 깃발 <br />
           아아 다시 선 이 땅엔, 당신 닮은 푸른 소나무 <br />
           이 목숨 바쳐 큰 나라 위해 끝까지 싸우리라 <br />
           - 푸른 소나무 -
         </p>
         
         {/* Google Fonts 링크 추가 */}
         <style>
           {`
             @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
           `}
         </style>
       </section>

      {/* Section: Ads */}
      <section className=" py-8 px-4 bg-white" data-aos="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

         <div
            className="p-4 bg-red-100 rounded-lg shadow-md h-60 text-center"
            style={{
              backgroundImage: "url('/img/banner1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="text-gray-600 text-lg font-bold mb-4 mt-20 text-left">
              참전용사와 그 가족의 안녕을 위해
              <br />
              국가공헌협회와 함께해주세요.
            </p>
            <button className="bg-red-500 text-white  px-4 py-2 rounded-md">
              후원하기
            </button>
          </div>


          <div className="flex items-center p-4 rounded-lg shadow-md h-60">
  {/* 문구 영역 */}
  <div className="flex-1 text-left">
    <p className="text-gray-600 text-lg font-bold mb-4">
      영웅의 귀환을
      <br />
      DNA로 함께 밝혀요!
      <br/>
      여러분의 관심과 참여가<br /> 필요합니다!
      <br />
      <strong className="text-blue-700 text-3xl font-bold">1577-5625</strong>
    </p>


  </div>

  {/* 이미지 영역 */}
  <div className="flex-shrink-0  w-3/5">
    <img
      src="/img/DNAbanner.jpg" // 업로드한 파일의 경로로 수정
      alt="DNA Banner"
      className="h-full w-full object-cover rounded-lg"
    />
  </div>
</div>




          {/* <div className="p-4 bg-green-100 rounded-lg shadow-md text-center">
            <p className="text-gray-800 mb-4">
              영웅의 귀환을
              <br />
              DNA로 함께 밝혀요!
            </p>
            <p className="font-bold text-lg">1577-5625</p>
          </div> */}

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

      {/* Related Sites Section */}
      <RelatedSites data-aos="fade" />

      {/* Footer */}
     <Footer />

      
    </div>
  );
};

export default MainPage;
