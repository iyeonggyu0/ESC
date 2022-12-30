import React, { createContext, useEffect, useState } from "react";
import GlobalStyle from "./styles/globalStyle";

// library
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 나중에 삭제하기 * 폰트 어썸
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid, regular, light, thin, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

// page
import MainPage from "./pages/mainPage";

export const ThemeContext = createContext(null);

function App() {
  const [colorTheme, setColorTheme] = useState(localStorage.getItem("theme"));

  const toggleTheme = () => {
    if (colorTheme === "game") {
      setColorTheme("basic");
      localStorage.setItem("theme", "basic");
      console.log("theme:", localStorage.getItem("theme"));
    } else if (colorTheme === "basic") {
      setColorTheme("game");
      localStorage.setItem("theme", "game");
      console.log("theme:", localStorage.getItem("theme"));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "game");
      setColorTheme("game");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <BrowserRouter>
        <GlobalStyle colorTheme={colorTheme} />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
