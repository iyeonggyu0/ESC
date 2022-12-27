import React from "react";
import { ThemeProvider } from "styled-components";

// library
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 나중에 삭제하기 * 폰트 어썸
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid, regular, light, thin, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

// style
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme.js";

// page
import MainPage from "./pages/mainPage";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
