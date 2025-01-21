import React from "react";

const RelatedSites = () => {
  const sites = [
    {
      name: "국방부",
      logo: "https://i.namu.wiki/i/IJBNbIG_c2HGNxHCOuS4veoC8lFXO9ZEPsaoznNLWnTGETjIw1nZm9LhiJTxoUa_XT34NBgWySIFU-HC3dUmSnRhCVHBPEIin1_3H4bDbuuInQ3MPTpGhnlMhWUAruxt4_8peMnqlZho11naMN8Oxg.svg",
      link: "https://www.mnd.go.kr",
    },
    {
      name: "육군",
      logo: "https://i.namu.wiki/i/rdXqteN4mCOP4WKewnoTD9DyDwCDrK6S587A5PJwW31zevHDGkkTA8lpzAEYWzNpHHH4uDWYiOCTfmI0QLC6AmdtGDkmzyFpg4Gi4JE87Pey5SVCmOd8AC39JTAWXNkQyS4EZyyvgOQ0ti_HW_cGeA.svg",
      link: "https://www.army.mil.kr",
    },
    {
      name: "해군",
      logo: "https://i.namu.wiki/i/8EGKX4e0So6FN6bttSFEgh3p_NUcjrqSiDVIDS7g1D1W0LA-0vpzTh55upGBEe4Es58cgwQk9VV_wyK2h2JEFVmjUAPhH-VKlT5I9RGYaejwbhcrIxGehRAi1ii3b4OQ6KynH5lyQYGA83QWUY_YuQ.svg",
      link: "https://www.navy.mil.kr",
    },
    {
      name: "공군",
      logo: "https://i.namu.wiki/i/uxQOz1V8BQ8EHIctAoD8zFojQL0fVXXOKiLEQLQSioQMQD47X1CyRvMdp6BJ7u0dGcGOpwwhyQqAaNHKuB55wDQcFTyxihxIqpe9DGtaQI_TqDtEOn1OcOZntYXD_Va8_mGtg1kQGcZJxpLI2mmEqQ.svg",
      link: "https://www.airforce.mil.kr",
    },
    {
      name: "해병대",
      logo: "https://i.namu.wiki/i/Oy7slOgI1QOvXTm_2tYZkEG3-5xts4PSNuyq1HDXKMwiRA0OrI7Q5PX_MednUshm14NUPh9edNtK_HOxArUYIZbAPFjI7Tu-9VgDJy5jjBTzcYPPBuK_ET24i8XOvYq98nebUc3izfYWxuMqB1PNIg.svg",
      link: "https://www.rokmc.mil.kr",
    },
    {
      name: "국가보훈처",
      logo: "https://i.namu.wiki/i/fgyAqUpYDFoAcEYU9ARBPXmD2KfoPY3xlKQtqAqABcXEmEYXgbSlqltu9Wav99YbFV4yRUGrW8PvMHlPYZRMJLDXCyLa16zYZChFRE03xudQv0ZwNVot8HR0vbhpYbf6HbbAv1Xkr8GmtStjArxSVQ.svg",
      link: "https://www.mpva.go.kr",
    },
    {
      name: "UN평화기념관",
      logo: "https://i.namu.wiki/i/Cb6UkLb3qHMA74nzZnOm0c7H4aIgKu6GeP6ACaN9mAjGnH9gFRSWe-waz8VEKm9K0CICW2wCdChFcTB8Vv21YfPpDFMPINM3IViN6dNpjZTHzIUlthvFoBgu9yAMfWgpIHdkYTMrDO1J6_RQQGnT2g.svg",
      link: "https://www.unpm.or.kr",
    },
    {
      name: "전쟁기념관",
      logo: "https://i.namu.wiki/i/5PXGTAx89OTOr7MoKfiTTR4wfp1FvWhrcnwrjeQU_9tbm8BUwFy8nsdaTGMGrmQEb09cq8Nq-8qUasAo9icixlv9Ac_MjLvX_FbK3lzZ6N8UR3Rf1H5rVh4ywtzavmowbGRAffKyyxFS65GVk9NptQ.svg",
      link: "https://www.warmemo.or.kr",
    },
    {
      name: "국립서울현충원",
      logo: "https://i.namu.wiki/i/WlULwJ_jDkcpXpGgTQ9-MML3mGPdfqrX5__M5wLQC_t5x-N-0b_rAZFXBJdK4q_69h_Y0lvMeR_zEXvAUm-Vys96lFryRkF5vTrU0zKxo1_Mj5Wb3qWJY0REOWWaBysQOvdm5jcB_qAacDlUlYP51w.svg",
      link: "https://www.snmb.mil.kr",
    },
    {
      name: "국가공헌협회",
      logo: "https://i.namu.wiki/i/m_rthQFIqDs5mfv22ibfdaLXu8I3UZZlVzMyqNyBu6_wJbw9vZ5dcdd9lpFObYvVEEn_NPN3YBFGM8BP2v3DbmfD61N5VfF3WHMmAUXULHe2SYlnoz7hHlGIT7vMvC7jDlAZFGCm6PVRHXXJBRMtqQ.svg",
      link: "https://www.contribution.or.kr",
    },
    {
      name: "국방부유해발굴단",
      logo: "https://i.namu.wiki/i/jtdE05Z7itpFehtTjPeHEd_xJjvQK_HOwDxPMIYpuoAMJgjTnEJ0UD-KXukVTFXld15dx9St6Piy2NvTg04oqHqEnC4aj08goz_UfD2an8bTjjHa5Z1dPAm7fCKvHUKpPlSwwHzrbsMYvbU3T1QGGw.svg",
      link: "https://www.dpaa.mil",
    },
  ];

  return (
    <section className="py-8 px-4 bg-white">
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
            className="relative block w-full h-32 bg-gray-200 rounded-md shadow-md hover:shadow-lg transition flex items-center justify-center"
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
