import React, { useState } from "react";
import SeoulMemorialAPI from "../components/SeoulMemorialAPI";
import NationalMemorialMap from "../components/NationalMemorialMap";
import Footer from "../shared/footer";
import image1 from "../assets/images/cemetary1.png";
import image2 from "../assets/images/cemetary2.png";
import image3 from "../assets/images/cemetary3.png";

const BurialStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

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

  return (
    <div>
 

      {/* 콘텐츠 섹션 */}
      <div className="w-full bg-gray-400 py-10 mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">국립 서울 현충원</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        국립서울현충원은 지난 1955년 7월, 국군묘지로 창설된 이래 국가와 민족을 위하여 희생하신 순국선열과 호국영령들의 충정과 위훈을 기리는 민족의 성지로 자리매김하여 왔습니다.

그리고 ‘국민에게 사랑받는 열린 호국추모공원 조성’을 목표로 다양한 국민 친화적 호국행사를 실시하고 쾌적하고 편리한 참배환경을 조성하며 고객 중심의 안장ㆍ추모 서비스를 제공하는 등 국민과 함께 호흡하는 호국공원으로 거듭나고 있습니다.
        </p>

        {/* 비디오 섹션 */}
        <div className="flex justify-center gap-6 flex-wrap">
          {videos.map((video) => (
            <div
              key={video.id}
              className="w-80 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              onClick={() => openModal(video.src)}
            >
              <img
                src={video.image}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              {/* <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.description}</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
      <SeoulMemorialAPI />
      <NationalMemorialMap />

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

      <Footer />
    </div>
  );
};

export default BurialStatus;
