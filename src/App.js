import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Participation from "./pages/Participation";
import Excavation from "./pages/Excavation";
import BurialStatus from "./pages/BurialStatus";
import BattleInfo from "./pages/BattleInfo";
// import CyberMemorial from "./pages/CyberMemorial";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
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
