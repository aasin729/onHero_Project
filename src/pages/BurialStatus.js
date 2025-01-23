import React from "react";
import SeoulMemorialAPI from "../components/SeoulMemorialAPI";
import NationalMemorialMap from "../components/NationalMemorialMap";
import Footer from "../components/footer";

const BurialStatus = () => {
  return (
    <div>
      {/* <h1>안장 현황</h1>
      <p>국립묘지의 안장 현황과 관련된 정보를 여기에 표시합니다.</p> */}
      <SeoulMemorialAPI/>
         {/* 콘텐츠 3 */}
         <div className="w-full bg-blue-300 my-10 text-white flex items-center justify-center z-0" style={{ height: "500px" }}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <p className="text-gray-700 text-center md:text-left">
           <h2 className="text-2xl font-semibold text-center mb-4">국립 서울 현충원 의장대</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer too.
          </p>
          <div className="w-full md:w-1/2 h-48 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
       <NationalMemorialMap />
        
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BurialStatus;
