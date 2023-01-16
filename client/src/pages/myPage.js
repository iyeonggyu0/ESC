import React, { createContext, useContext, useEffect, useState } from 'react';
import Layout from '../layout/mainLayOut';

export const ModalIsOpen = createContext(null);

// Cp
import MyPageMain from '../components/MyPageCP';
import { ThemeContext } from '../App';

const MyPage = () => {
  const userData = useContext(ThemeContext).userInfo.userData;
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (userData !== null) {
      setAddress(userData.address);
    }
  }, [userData]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      {userData !== null && (
        <Layout>
          <ModalIsOpen.Provider value={{ modalIsOpen, setModalIsOpen, address, setAddress }}>
            <MyPageMain></MyPageMain>
          </ModalIsOpen.Provider>
        </Layout>
      )}
    </>
  );
};
export default MyPage;
