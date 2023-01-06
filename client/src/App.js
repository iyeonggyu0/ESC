import React, { createContext, useEffect, useState } from 'react';
import GlobalStyle from './style/globalStyle';

// library
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 나중에 삭제하기 * 폰트 어썸
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid, regular, light, thin, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

// page
import MainPage from './pages/mainPage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';

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

    return (
        <ThemeContext.Provider value={{ colorTheme, toggleTheme }}>
            <BrowserRouter>
                <GlobalStyle colorTheme={colorTheme} />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

export default App;
