import React, { createContext, useEffect, useState } from 'react';
import GlobalStyle from './style/globalStyle';
// import PrivateRoute from './util/privateRoute';

// library
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 나중에 삭제하기 * 폰트 어썸
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid, regular, light, thin, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

// page
import MainPage from './pages/mainPage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
// import { useSelector } from 'react-redux';
import NotFountPage from '@common/error/404';

export const ThemeContext = createContext(null);

function App() {
  const [colorTheme, setColorTheme] = useState(localStorage.getItem('theme'));

  const toggleTheme = () => {
    if (colorTheme === 'game') {
      setColorTheme('basic');
      localStorage.setItem('theme', 'basic');
      console.log('theme:', localStorage.getItem('theme'));
    } else if (colorTheme === 'basic') {
      setColorTheme('game');
      localStorage.setItem('theme', 'game');
      console.log('theme:', localStorage.getItem('theme'));
    }
  };

  useEffect(() => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'game');
      setColorTheme('game');
    }
  }, []);

  // const { userInfo } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const token = TokenService.prototype.get();
  //   if (token) {
  //     // dispatch(reLoginUser(token));
  //     // 다시 로그인, 기존 토큰을 그대로 전송 로그인 정보 받아옴
  //     // 세션 만료시간 초기화
  //     // 토큰 30분 후 삭제, 토큰 만료 시 랜더링 발생
  //     // refreshToken 전달 새로운 토큰 발급
  //     // 단, refreshToken은 서버에서 쿠키로 저장하여 헤더에 전달
  //     // 실제로 인증으로 사용될 accessToken은 axios header에 값을 전달
  //   }
  // }, []);

  return (
    <ThemeContext.Provider value={{ colorTheme, toggleTheme }}>
      <BrowserRouter>
        <GlobalStyle colorTheme={colorTheme} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route element={<PrivateRoute auth={userInfo} />}> */}
          <Route path="/" element={<MainPage />} />
          {/* </Route> */}
          <Route path={'/*'} element={<NotFountPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
