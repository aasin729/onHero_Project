import React, { useState } from "react";

// 이미지 import
import excavation1 from "../assets/images/excavation1.png";
import excavation2 from "../assets/images/excavation2.png";
import excavation3 from "../assets/images/excavation3.png";

const YoutubeSection = () => {
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
    <div className="bg-gray-400 mt-20 py-10">
      <div className="flex items-center justify-center gap-4 mb-10">
          {/* <h2 className="text-3xl font-bold text-gray-900 text-center">
            국방부 유해발굴감식단
          </h2> */}
        <img
          src="https://i.namu.wiki/i/u8TaOgiNGBM_aEWiYJlD61zTCytP8ZD7tzVhyPeG_knxhaHoptPqA0ZTbNE95j-IGGcR6syUKVTqqmt-s6YBJL_7T0BHXo2q5yGz20kmocR3MI4A8-Rjkp37jl74EBsaFCmUQk6H2j345CNqUTVjXg.svg"
          alt="국방부 유해발굴감식단"
          className="h-12"
        />
      </div>
      <p className="text-center text-gray-500 font-semibold mb-10">
        국방부 유해발굴감식단(MND Agency for KIA Recovery & Identification)은 <br />
        6.25 전쟁 당시 전사하였으나 미수습된 전사자의 유해를 발굴, 감식하여 <br />
        가족의 품으로 보내는 보훈 사업을 수행하는 대한민국 국방부의 직할부대입니다.
      </p>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
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
