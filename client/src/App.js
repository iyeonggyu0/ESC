import React, { createContext, useEffect, useState } from 'react';
import GlobalStyle from './style/globalStyle';
import { useDispatch } from 'react-redux';
import { getUserData } from '@reducer/userReducer';
import { useSelector } from 'react-redux';
import PrivateRoute from './util/privateRoute';

// library
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 나중에 삭제하기 * 폰트 어썸
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid, regular, light, thin, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

// page
import MainPage from './pages/mainPage';
import LoginPage from './pages/loginPage.js';
import SignupPage from './pages/signupPage.js';
import NotFountPage from '@common/error/404';
import FindPasswordPage from './pages/findPasswordPage.js';
import MyPage from './pages/myPage';
import ProductPage from './pages/productMain.js';
import ProductEnrollmentPage from './pages/productEnrollment.js';
import ProductModifyPage from './pages/productModify';
import ProductDetailPage from './pages/productDetaliPage';
import ScrollToTop from './components/_common/scrollToTop';
import AdminPage from './pages/adminPage';
import EstimatePage from './pages/estimatePage';
import PreferencePage from './pages/preferencePage';

export const ThemeContext = createContext(null);

function App() {
  const [colorTheme, setColorTheme] = useState(localStorage.getItem('theme'));
  const [userLoginData, setUserLoginData] = useState('none');
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getUserData({ userLoginData, setUserLoginData }));
    // eslint-disable-next-line
  }, [dispatch]);
  const { userInfo } = useSelector((state) => state.user);
  // console.log(userInfo);

  return (
    <ThemeContext.Provider value={{ colorTheme, toggleTheme, userInfo }}>
      <BrowserRouter>
        <ScrollToTop />
        <GlobalStyle colorTheme={colorTheme} />
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<MainPage />} />

          {/* 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/find-password" element={<FindPasswordPage />} />

          {/* 상품 */}
          <Route path="/product/list/:filter" element={<ProductPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/product/enrollment" element={<ProductEnrollmentPage />} />
          <Route path="/product/modify/:productId" element={<ProductModifyPage />} />

          {/* 견적내기 */}
          <Route path="/estimate/:pageNum" element={<EstimatePage />} />
          <Route path="/preference/:pageNum" element={<PreferencePage />} />

          {/* 로그인 필수 페이지 */}
          <Route element={<PrivateRoute auth={userInfo} />}>
            {/* 마이페이지 */}
            <Route path="/mypage/:page" element={<MyPage />} />
            {/* 어드민 */}
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          {/* 404 */}
          <Route path={'/*'} element={<NotFountPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
