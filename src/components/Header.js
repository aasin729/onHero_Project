import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaArrowUp  } from "react-icons/fa";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤 이동
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full fixed top-0 z-50 font-bold transition-all duration-300 ${
        isScrolled ? "bg-white text-black" : "bg-transparent text-gray-300"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* 로고 부분 */}
        <div className="flex items-center">
          {/* 스크롤에 따라 로고 변경 */}
          <img
            src={isScrolled ? "/img/logo2.png" : "/img/logo1.png"}
            alt="Logo"
            className="h-10"
          />
        </div>

        {/* 메뉴바 */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className="text-xl hover:text-gray-300">
              메인페이지
            </Link>
          </li>
          <li>
            <Link to="/participation" className="text-xl hover:text-gray-300">
              UN군 참전 현황
            </Link>
          </li>
          <li>
            <Link to="/excavation" className="text-xl hover:text-gray-300">
              유해발굴
            </Link>
          </li>
          <li>
            <Link to="/burial-status" className="text-xl hover:text-gray-300">
              안장현황
            </Link>
          </li>
          <li>
            <Link to="/battle-info" className="text-xl hover:text-gray-300">
              전투/선열정보
            </Link>
          </li>
        </ul>

        {/* 햄버거 메뉴 버튼 */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars className="h-6 w-6" />
        </button>
      </nav>

      {/* 사이드 메뉴 (반응형) */}
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-0 left-0 w-full bg-gray-800 text-white p-4`}
      >
        {/* 닫기 버튼 추가 */}
        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <FaTimes className="h-6 w-6" />
        </button>

        <li>
          <Link to="/" className="block py-2 text-lg font-semibold hover:text-gray-300">
            메인페이지
          </Link>
        </li>
        <li>
          <Link to="/participation" className="block py-2 text-lg font-semibold hover:text-gray-300">
            UN군 참전 현황
          </Link>
        </li>
        <li>
          <Link to="/excavation" className="block py-2 text-lg font-semibold hover:text-gray-300">
            유해발굴
          </Link>
        </li>
        <li>
          <Link to="/burial-status" className="block py-2 text-lg font-semibold hover:text-gray-300">
            안장현황
          </Link>
        </li>
        <li>
          <Link to="/battle-info" className="block py-2 text-lg font-semibold hover:text-gray-300">
            전투/선열정보
          </Link>
        </li>
      </ul>

      {/* 오른쪽 하단 스크롤 버튼 */}
      <button
      onClick={scrollToTop}
      className="fixed bottom-9 right-9 bg-blue-900 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 transition-all"
    >
      <FaArrowUp size={25} />
    </button>

    </header>
  );
};

export default Header;
