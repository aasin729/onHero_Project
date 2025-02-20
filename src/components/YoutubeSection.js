import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// 이미지 import
import excavation1 from "../assets/images/excavation1.png";
import excavation2 from "../assets/images/excavation2.png";
import excavation3 from "../assets/images/excavation3.png";

const YoutubeSection = () => {

  useEffect(() => {
      // AOS 초기화
      AOS.init({
        duration: 800, // 애니메이션 지속 시간
        once: false, // 애니메이션 반복 실행
        easing: "ease-in-out", // 애니메이션 효과
        offset: 50, // 애니메이션 시작 지점
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const videos = [
    {
      id: 1,
      src: "https://www.youtube.com/embed/FoqEiRN9ybw?si=zHbLyaULXVvhOT4z",
      title: "Video 1",
      image: excavation1,
    },
    {
      id: 2,
      src: "https://www.youtube.com/embed/AAOCI6BswVY?si=JOD_zGU9TGKZhs3q",
      title: "Video 2",
      image: excavation2,
    },
    {
      id: 3,
      src: "https://www.youtube.com/embed/b_hbSpEi3TA?si=P1Ng3Qlnm7NXtBLu",
      title: "Video 3",
      image: excavation3,
    },
  ];

  const openModal = (src) => {
    setVideoSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoSrc("");
  };

  const handleModalClick = (e) => {
    if (e.target.id === "modalBackground") {
      closeModal();
    }
  };

  return (
    <div className="bg-black py-10">
      <h2 className="text-center text-gray-100 text-3xl font-semibold mb-4">국방부 유해발굴감식단</h2>
      <p className="text-center text-gray-400 text-base font-semibold mb-10">
        6.25 전쟁 당시 전사하였으나 미수습된 전사자의 유해를 발굴, 감식하여 <br />
        가족의 품으로 보내는 보훈 사업을 수행하는 대한민국 국방부의 직할부대입니다.
      </p>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 px-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => openModal(video.src)}
          >
            <img
              src={video.image}
              alt={video.title}
              className="w-full h-auto transition duration-300 transform hover:scale-110 hover:opacity-90"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="modalBackground"
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleModalClick}
        >
          <div className="relative bg-white rounded-lg shadow-lg max-w-5xl w-full p-8">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black transform transition-transform duration-300 hover:scale-125"
            >
              ✖
            </button>
            <div className="aspect-w-16 aspect-h-9" style={{ height: "60vh" }}>
              <iframe
                src={videoSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubeSection;
