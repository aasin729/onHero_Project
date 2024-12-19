import React from "react";
import SeoulMemorialAPI from "./components/SeoulMemorialAPI";
import BurialData from "./components/BurialData";
import NaverMap from "./components/NaverMap";


function App() {
  return (
    <div className="App">
      <SeoulMemorialAPI />
      <NaverMap />
      <BurialData />
    </div>
  );
}

export default App;
