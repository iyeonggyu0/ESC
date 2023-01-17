import React, { createContext, useContext, useEffect, useState } from 'react';
import Layout from '../layout/mainLayOut';

export const ModalIsOpen = createContext(null);

// Cp
import MyPageMain from '../components/MyPageCP';
import { ThemeContext } from '../App';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const Login = useContext(ThemeContext).userInfo.login;
  const userData = useContext(ThemeContext).userInfo.userData;
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData !== null) {
      setAddress(userData.address);
    }
  }, [userData]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [logintime, setlogin] = useState(0);

  useEffect(() => {
    if (!Login) {
      setTimeout(function () {
        if (!Login) {
          setlogin(1);
        }
      }, 3000);
    }
  });

  return (
    <>
      {Login && (
        <Layout>
          <ModalIsOpen.Provider value={{ modalIsOpen, setModalIsOpen, address, setAddress }}>
            <MyPageMain></MyPageMain>
          </ModalIsOpen.Provider>
        </Layout>
      )}
      {!Login && logintime === 0 && (
        <div
          style={{
            width: '100%',
            height: 'calc(100vh - 70px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          회원 정보를 로딩중입니다
        </div>
      )}
      {!Login && logintime === 1 && (
        <div
          style={{
            width: '100%',
            height: 'calc(100vh - 70px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          로그인 세션이 만료되었습니다.
          <br /> (클릭 시 메인페이지로 이동)
        </div>
      )}
    </>
  );
};
export default MyPage;
