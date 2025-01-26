import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // 리액트 아이콘 사용

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full fixed top-0 z-50  transition-all duration-300 ${isScrolled ? "bg-white text-black" : "bg-transparent text-gray-300"}`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* 로고 부분 */}
        <div className="flex items-center">
          <img src="/img/koreaflag.png" alt="Logo" className="h-10" />
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
          {/* <li>
            <Link to="/cyber-memorial" className="text-xl hover:text-gray-300">
              사이버추모
            </Link>
          </li> */}
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
        {/* <li>
          <Link to="/cyber-memorial" className="block py-2 text-lg font-semibold hover:text-gray-300">
            사이버추모
          </Link>
        </li> */}
      </ul>
    </header>
  );
};

export default Header;
