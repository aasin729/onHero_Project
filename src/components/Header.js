import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full fixed top-0 z-10 bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex justify-around items-center list-none m-0 p-0">
          <li>
            <Link to="/" className="text-lg font-semibold hover:text-gray-300">
              메인페이지
            </Link>
          </li>
          <li>
            <Link to="/participation" className="text-lg hover:text-gray-300">
              UN군 참전 현황
            </Link>
          </li>
          <li>
            <Link to="/excavation" className="text-lg hover:text-gray-300">
              유해발굴
            </Link>
          </li>
          <li>
            <Link to="/burial-status" className="text-lg hover:text-gray-300">
              안장현황
            </Link>
          </li>
          <li>
            <Link to="/battle-info" className="text-lg hover:text-gray-300">
              전투/선열정보
            </Link>
          </li>
          <li>
            <Link to="/cyber-memorial" className="text-lg hover:text-gray-300">
              사이버추모
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
