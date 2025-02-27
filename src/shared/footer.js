// Footer.js
import { FaFacebookF, FaInstagram, FaTwitter, FaBloggerB } from 'react-icons/fa';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 space-y-6 md:space-y-0">
        
        {/* 왼쪽 로고 및 문구 */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
          <img src="/img/logo1.png" alt="Logo" className="w-32 md:w-40 h-auto" />
          <div className="text-base">
          <p className="leading-relaxed text-sm md:text-base">
            해당 웹사이트는 나라를 위해 헌신하신 모든 호국영령을 위한 마음을 담아 제작을 하였습니다.
          </p>
          <p className="mt-2">&copy; 2025 KIM SANG HWAN | 010-0000-0000 | All rights reserved. </p>
          </div>
        </div>

        {/* 아이콘 부분 */}
        <div className="flex space-x-6">
          <a href="https://www.facebook.com/" className="text-gray-400 hover:text-white">
            <FaFacebookF size={28} />
          </a>
          <a href="https://www.instagram.com/" className="text-gray-400 hover:text-white">
            <FaInstagram size={28} />
          </a>
          <a href="https://twitter.com/" className="text-gray-400 hover:text-white">
            <FaTwitter size={28} />
          </a>
          <a href="https://blog.naver.com/" className="text-gray-400 hover:text-white">
            <FaBloggerB size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
