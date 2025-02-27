import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Mainpage/MainPage";
import Participation from "./pages/Participation/Participation";
import Excavation from "./pages/Excavation/Excavation";
import BurialStatus from "./pages/BurialStatus/BurialStatus";
import BattleInfo from "./pages/BattleInfo/BattleInfo";
import Header from "./shared/Header";
import ScrollToTop from "./shared/component/ScrollToTop";

const App = () => {
  return (
    <Router>
       <ScrollToTop /> {/* 페이지 이동 시 자동으로 스크롤 맨 위로 */}
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/participation" element={<Participation />} />
        <Route path="/excavation" element={<Excavation />} />
        <Route path="/burial-status" element={<BurialStatus />} />
        <Route path="/battle-info" element={<BattleInfo />} />
        {/* <Route path="/cyber-memorial" element={<CyberMemorial />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
