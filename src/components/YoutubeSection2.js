import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// 이미지 import
import image1 from "../assets/images/cemetary1.png";
import image2 from "../assets/images/cemetary2.png";
import image3 from "../assets/images/cemetary3.png";

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
      src: "https://www.youtube.com/embed/oFmwQxwp394?si=wjS4QS0W8VWiYsWM",
      title: "국립 서울 현충원",
      description: "국립 서울 현충원에 대한 영상 소개",
      image: image1,
    },
    {
      id: 2,
      src: "https://www.youtube.com/embed/Q6v35jy3VnE?si=UY23-9e32etu4pWb",
      title: "국방부 군악대대 영상",
      description: "국방부 군악대의 멋진 공연 영상",
      image: image2,
    },
    {
      id: 3,
      src: "https://www.youtube.com/embed/FKw-HYjsWfA?si=Lf6etgpekggHIros",
      title: "국립 서울 현충원 의장대",
      description: "국립 서울 현충원의 의장대 소개 영상",
      image: image3,
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
    <div className="bg-black pb-20">

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4" data-aos="fade" >
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
