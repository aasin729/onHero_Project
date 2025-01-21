import React from "react";

const RelatedSites = () => {
  const sites = [
    {
      name: "국방부",
      logo: "https://i.namu.wiki/i/u8TaOgiNGBM_aEWiYJlD61zTCytP8ZD7tzVhyPeG_knxhaHoptPqA0ZTbNE95j-IGGcR6syUKVTqqmt-s6YBJL_7T0BHXo2q5yGz20kmocR3MI4A8-Rjkp37jl74EBsaFCmUQk6H2j345CNqUTVjXg.svg",
      link: "https://www.mnd.go.kr",
    },
    {
      name: "육군",
      logo: "https://i.namu.wiki/i/1EdD2_f5XGp6iZs6FsYO-8prJKNp0fqNzGhbUr7MZ2nZnQYsOlx04rY99Uof8Jt-d-DnlTWVsvmdARMBUMm8GbhBRWc-E9sVZccFLEbwEGHQAdM8zzJ2mvWVUGfQvRMoNQaeKwKzoXhhnAyiYkdqjQ.svg",
      link: "https://www.army.mil.kr",
    },
    {
      name: "해군",
      logo: "https://i.namu.wiki/i/E7gfNxFyzPtSO72U2Rn0Q5Dn6cd8HfCRlx4Ck6TqxRI7uNqWPCF7MXbgmBLI_dM_NBxj1LpoZeJxfkhjG81MBV4Us0uBZ4UOXL0TBihAFV19o4nQb5HdmCFVCSZj67JkkmvCbFmlPqrkZ_YhgdhX4w.svg",
      link: "https://www.navy.mil.kr",
    },
    {
      name: "공군",
      logo: "https://i.namu.wiki/i/v7kzEZOl5TYgPUFOVS77C8N50J0a-GVXmh6QCZRimXJJ-XMyUkTrW0Om8rskOWG8ogWQKzzKcQ9LtAsgNu9N1Bkh-lmuvnmRh1mjyHFecUGmMctAtqwv5kkg5ZQ_03zwz1ni6-R6Xn4LJipqTpFstg.svg",
      link: "https://www.airforce.mil.kr",
    },
    {
      name: "해병대",
      logo: "https://i.namu.wiki/i/V8tWYXMjMt4lvTxwMh0YeP1DTmyrLfRf3Xl_t0PhCwMo61Akl-uUVmgb5iIJJ9EKc-NTbl61v5sLrptXDysKMeXnN_1JHLEQQGhql1N6Fl4gSkLK4D0rO4BQU5uGVjOEBgAkr2kYauNqWWeH9tBW2g.svg",
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
