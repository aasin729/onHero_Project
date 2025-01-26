import React from "react";

const RelatedSites = () => {
  const sites = [
    {
      name: "국방부",
      logo: "/img/sublogo1.png", // 로컬 이미지 경로
      link: "https://www.mnd.go.kr",
    },
    {
      name: "육군",
      logo: "/img/sublogo2.png", // 로컬 이미지 경로
      link: "https://www.army.mil.kr",
    },
    {
      name: "해군",
      logo: "/img/sublogo3.png", // 로컬 이미지 경로
      link: "https://rokaf.airforce.mil.kr/sites/airforce/index.do",
    },
    {
      name: "공군",
      logo: "/img/sublogo4.png", // 로컬 이미지 경로
      link: "https://rokaf.airforce.mil.kr/sites/airforce/index.do",
    },
    {
      name: "해병대",
      logo: "/img/sublogo5.png", // 로컬 이미지 경로
      link: "https://www.rokmc.mil.kr",
    },
    {
      name: "국가보훈처",
      logo: "/img/sublogo6.png", // 로컬 이미지 경로
      link: "https://www.mpva.go.kr",
    },
    {
      name: "국립서울현충원",
      logo: "/img/sublogo7.png", // 로컬 이미지 경로
      link: "https://www.snmb.mil.kr",
    },
    // {
    //   name: "국방부유해발굴단",
    //   logo: "/img/sublogo8.png", // 로컬 이미지 경로
    //   link: "https://www.withcountry.mil.kr/mbshome/mbs/withcountry/",
    // },
    {
      name: "전쟁기념관",
      logo: "/img/sublogo9.png", // 로컬 이미지 경로
      link: "https://www.warmemo.or.kr",
    },
  ];

  return (
    <section className="container py-8 px-4 mt-20 mx-auto bg-white">
  <h2 className="text-2xl font-semibold text-center mb-8">자주 찾는 사이트</h2>
  <p className="text-lg font-medium text-center mb-8">
    국방부 산하 및 공공기관 사이트입니다. 로고를 클릭하면 해당 사이트로 이동합니다.
  </p>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {sites.map((site, index) => (
      <a
        key={index}
        href={site.link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full h-32 rounded-md shadow-md hover:shadow-lg border border-gray-300 hover:border-blue-900 transition-all duration-300 flex items-center justify-center"
        aria-label={site.name}
      >
        {site.logo ? (
          <img
            src={site.logo}
            alt={`${site.name} 로고`}
            className="h-16"
          />
        ) : (
          <span className="text-gray-800 text-sm font-medium">
            {site.name}
          </span>
        )}
      </a>
    ))}
  </div>
</section>

  );
};

export default RelatedSites;
