import React, { createContext, useState } from "react";
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
  const [currentTheme, setCurrentTheme] = useState("dark");
  const toggleTheme = () => {
    setCurrentTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
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
