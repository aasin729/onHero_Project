import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import videoFile from "../assets/videos/movie1.mp4";
import Header from "../shared/Header";
import RelatedSites from "../components/RelatedSites";
import Footer from "../shared/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


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
        className="relative flex items-center justify-center min-h-screen pt-16"
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
      <section className="py-20 px-6 bg-black">
      <div className="max-w-screen-xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 py-10"  data-aos="fade">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl text-gray-100 font-bold mb-10">한국전쟁 (6.25 전쟁)<p className="text-2xl text-yellow-500 mt-2">THE KOREAN WAR</p></h2>
            <p className="text-gray-300 font-semibold text-lg  mb-4">
              6.25전쟁은 1950년 6월 25일 북한군의 기습 남침으로 시작된 한반도의 비극적인 전쟁으로, 남북한 간의 이념 갈등과 냉전 시대의 국제적 대리전 성격을 띠고 있었습니다. 약 3년간 진행되며 한반도는 38선을 중심으로 치열한 공방전이 이어졌고, UN군과 중공군이 개입하며 국제전으로 확대되었습니다. 이 전쟁은 약 300만 명 이상의 사상자와 난민을 발생시키고, 국토의 80%가 초토화되는 막대한 피해를 남긴 채 1953년 7월 27일 정전협정을 통해 휴전되었습니다.
            </p>
          </div>
          <div className="w-full md:w-1/2">
              <div className="relative w-full aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/MmsB7vMcjzk"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
        </div>

        {/* Info Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"  data-aos="fade">
            {[
              {
                number: '01',
                title: '남한 공산화 침략',
                description: '북한이 남한을 공산화하기 위해 벌인 전면적 군사 침략.',
              },
              {
                number: '02',
                title: '치밀한 사전 준비',
                description: '북한이 계획적으로 준비한 철저한 군사적 공격.',
              },
              {
                number: '03',
                title: '동족상잔의 비극',
                description: '같은 민족 간 이념 갈등으로 인해 벌어진 비극적인 전쟁.',
              },
              {
                number: '04',
                title: 'UN 최초 개입',
                description: 'UN군이 군사적으로 개입한 첫 국제 분쟁.',
              },
              {
                number: '05',
                title: '냉전의 시작',
                description: '냉전 체제 아래 벌어진 첫 번째 대규모 전면전.',
              },
              {
                number: '06',
                title: '강대국 대리전',
                description: '미국과 소련의 이익 충돌로 벌어진 국제적 대리전.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105"
              >
                {/* 번호 */}
                <div className="text-blue-800 text-3xl font-bold mb-4">{item.number}</div>
                {/* 타이틀 */}
                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                {/* 내용 */}
                <p className="text-gray-400 text-sm font-bold leading-relaxed">{item.description}</p>
              </div>
          ))}
        </div>
      </div>
    </section>

   {/* Section: Ads */}
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto" data-aos="fade">
            <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true} 
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
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
          {/* 광고 배너 1 */}
          <SwiperSlide>
            <div
              className="p-4 bg-red-100 rounded-lg shadow-md h-72 text-center border-2 border-gray-300 transition-all duration-300 hover:border-blue-900 cursor-pointer"
              style={{
                backgroundImage: "url('/img/banner1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p className="text-gray-600 text-lg font-bold mb-4 mt-20 text-left">
                참전용사의 안녕을 위해
                <br />
                국가공헌협회와 함께해주세요.
              </p>
              <button
                className="px-6 py-3 bg-red-500 rounded-lg font-bold text-white hover:bg-red-400 transition duration-300 ease-in-out transform"
                onClick={() => window.open("https://www.kkh.or.kr/business/veteran.php", "_blank")}
              >
                기부하기
              </button>
            </div>
          </SwiperSlide>

           {/* 광고 배너 2 */}
           <SwiperSlide>
            <div
              className="p-4 rounded-lg shadow-md h-72 text-center bg-blue-600 border-2 border-gray-300 transition-all duration-300 hover:border-blue-900 cursor-pointer"
              style={{
                backgroundImage: "url('/img/banner5.png')",
                backgroundSize: "100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
            </div>
          </SwiperSlide>  

          {/* 광고 배너 3 */}
          <SwiperSlide>
            <div
              className="p-4 rounded-lg shadow-md  h-72 text-center border-2 border-gray-300 transition-all duration-300 hover:border-blue-900 cursor-pointer"
              style={{
                backgroundImage: "url('/img/banner4.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >   
            </div>
          </SwiperSlide>

          {/* 광고 배너 4 */}
          <SwiperSlide>
            <div
              className="p-4  rounded-lg shadow-md  h-72 text-center border-2 border-gray-300 transition-all duration-300 hover:border-blue-900 cursor-pointer"
              style={{
                backgroundImage: "url('/img/banner3.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
            </div>
          </SwiperSlide>
            
          {/* 광고 배너 5 */}
          <SwiperSlide>
            <div className="flex items-center p-4 rounded-lg shadow-md h-72 border-2 border-gray-300 transition-all duration-300 hover:border-blue-900 cursor-pointer">
              <div className="flex-1 text-left">
                <p className="text-gray-600 text-lg font-bold mb-4">
                  영웅의 귀환을
                  <br />
                  DNA로 함께 밝혀요!
                  <br />
                  여러분의 관심과 참여가<br /> 필요합니다!
                  <br />
                  <strong className="text-blue-700 text-3xl font-bold">1577-5625</strong>
                </p>
              </div>
              <div className="flex-shrink-0 w-1/2">
                <img
                  src="/img/DNAbanner.jpg"
                  alt="DNA Banner"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            </div>
          </SwiperSlide>

          {/* 광고 배너 6 */}
          <SwiperSlide>
            <div
              className="p-4  rounded-lg shadow-md  h-72 text-center border-2 border-gray-300 transition-all duration-300 hover:border-blue-900 cursor-pointer"
              style={{
                backgroundImage: "url('/img/banner6.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
            </div>
          </SwiperSlide>
            
          {/* 광고 배너 7 */}
          <SwiperSlide>
            <div
              className="p-4 rounded-lg shadow-md h-72 text-center border-2 border-gray-300 transition-all duration-300 hover:border-blue-900 cursor-pointer"
              style={{
                backgroundImage: "url('/img/banner2.png')",
                backgroundSize: "100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div>
                  <h2 className="text-3xl text-white font-bold mb-2">6.25 전사자 유가족 찾기</h2>
                  <p className="text-xl text-gray-200 font-semibold mb-6">유전자 시료채취 참여 안내</p>
                  <button
                    className="px-4 py-3 bg-blue-900 rounded-lg font-bold text-white hover:bg-blue-800 transition duration-300 ease-in-out transform"
                    onClick={() => window.open("https://www.withcountry.mil.kr/mbshome/mbs/withcountry/subview.jsp?id=withcountry_030100000000", "_blank")}
                  >
                    자세히 보기
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          
        </Swiper>
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
           minHeight: "400px",
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

      {/* Related Sites Section */}
      <RelatedSites data-aos="fade" />

      {/* Footer */}
     <Footer />

      
    </div>
  );
};

export default MainPage;
