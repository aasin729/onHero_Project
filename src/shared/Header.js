import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaArrowUp } from "react-icons/fa";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 사이드 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // 화면 크기 변경 시 자동으로 메뉴 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full fixed top-0 z-50 font-bold transition-all duration-300 ${
        isScrolled ? "bg-white text-black" : "bg-transparent text-white"
      }`}
    >
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* 로고 */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={isScrolled ? "/img/logo2.png" : "/img/logo1.png"}
              alt="Logo"
              className="h-14"
            />
          </Link>
        </div>

        {/* 메뉴바 */}
        <ul className="hidden md:flex space-x-8">
          <li><Link to="/" className="text-xl hover:text-gray-400 transition duration-300">메인페이지</Link></li>
          <li><Link to="/participation" className="text-xl hover:text-gray-400 transition duration-300">UN군 참전 현황</Link></li>
          <li><Link to="/excavation" className="text-xl hover:text-gray-400 transition duration-300">유해발굴</Link></li>
          <li><Link to="/burial-status" className="text-xl hover:text-gray-400 transition duration-300">안장현황</Link></li>
          <li><Link to="/battle-info" className="text-xl hover:text-gray-400 transition duration-300">전투/선열정보</Link></li>
        </ul>

        {/* 햄버거 메뉴 버튼 */}
        <button className={`md:hidden ${isScrolled ? "text-black" : "text-white"}`} onClick={() => setIsMenuOpen(true)}>
          <FaBars className="h-10 w-10" />
        </button>
      </nav>

      {/* 사이드 메뉴 + 배경 */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 w-3/5 h-screen bg-gray-900 text-white p-6 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
          onClick={(e) => e.stopPropagation()} // 메뉴 내부 클릭 시 닫히지 않음
        >
          {/* 닫기 버튼 */}
          <button className="absolute top-5 right-5 text-white" onClick={() => setIsMenuOpen(false)}>
            <FaTimes className="h-10 w-10" />
          </button>

          {/* 메뉴 리스트 */}
          <ul className="mt-28 space-y-6 text-lg font-semibold">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-gray-400">메인페이지</Link></li>
            <li><Link to="/participation" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-gray-400">UN군 참전 현황</Link></li>
            <li><Link to="/excavation" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-gray-400">유해발굴</Link></li>
            <li><Link to="/burial-status" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-gray-400">안장현황</Link></li>
            <li><Link to="/battle-info" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-gray-400">전투/선열정보</Link></li>
          </ul>
        </div>
      </div>

      {/* 스크롤 버튼 */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-9 right-9 bg-blue-900 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-300"
      >
        <FaArrowUp size={25} />
      </button>
    </header>
  );
};

export default Header;
