import React, { createContext, useRef, useState } from "react";
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
  let colorThemeRef = useRef("game");
  const [colorTheme, setColorTheme] = useState(colorThemeRef.current);
  const toggleTheme = () => {
    setColorTheme((curr) => (curr === "game" ? "basic" : "game"));
    colorTheme.current = colorTheme;
  };

  return (
    <ThemeContext.Provider value={{ colorTheme, toggleTheme }}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
