// Footer.js
import { FaFacebookF, FaInstagram, FaTwitter, FaBloggerB  } from 'react-icons/fa';
import React from 'react';

const Footer = () => {
  return (
  <footer className="bg-gray-800 text-white py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      {/* 왼쪽 로고 및 문구 */}
      <div className="flex items-center space-x-6">
        <img src="/img/logo1.png" alt="Logo" className="w-40 h-18" />
        <div className="text-base py-4">
          <p className="mt-2">
            해당 웹사이트는 나라를 위해 헌신하신 모든 호국영령을 위한 마음을 담아 개인 프로젝트로 제작을 하였습니다.
          </p>
          <p>&copy; 2025 Aasin. All rights reserved.</p>
        </div>
      </div>
  
      {/* 아이콘 부분 */}
      <div className="flex space-x-4">
        <a href="https://www.facebook.com/" className="text-gray-400 hover:text-white">
          <FaFacebookF size={35} />
        </a>
        <a href="https://www.instagram.com/" className="text-gray-400 hover:text-white">
          <FaInstagram size={35} />
        </a>
        <a href="https://twitter.com/" className="text-gray-400 hover:text-white">
          <FaTwitter size={35} />
        </a>
        <a href="https://blog.naver.com/" className="text-gray-400 hover:text-white">
          <FaBloggerB size={35} />
        </a>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
