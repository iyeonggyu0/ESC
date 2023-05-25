import { useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { useMedia } from '../../hooks/useMedia';
import { useProfile } from '../../hooks/useProfile';
import { logOutUser, quitup } from '@reducer/userReducer';
import { useDispatch } from 'react-redux';
import FileUpload from '../_common/multer';

import MyPageMain from './main';

import { MyPageMainPageStyle, BG, MobileStyle } from './style';
import { ModalIsOpen } from '../../pages/myPage';
import PostCode from '../_common/postCode';
import CommonLoadingPage from '../_common/loadingPage';
import ShoppingBagMain from './shoppingBag';
import OrderList from './orderList';

const MyPageMainPage = () => {
  //hook
  const page = useParams('').page;
  const media = useMedia();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const profileImg = useProfile();
  const modalIsOpen = useContext(ModalIsOpen).modalIsOpen;

  const onLogoutHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logOutUser({ navigate: navigate }));
    },
    [dispatch, navigate],
  );

  const onQuitupHandler = useCallback(
    (e) => {
      e.preventDefault();
      const data = {
        email: userData.email,
      };
      dispatch(quitup({ data, navigate: navigate }));
    },
    // eslint-disable-next-line
    [dispatch, navigate],
  );

  return (
    <>
      {modalIsOpen && <PostCode />}
      {userData === null && <CommonLoadingPage />}
      {userData !== null && media.isPc && (
        <MyPageMainPageStyle colorTheme={colorTheme} media={media} profileImg={profileImg}>
          <div>
            <div>
              {/* 사이드 바 */}
              <div>
                {/* 프로필 */}
                <div style={{ cursor: 'pointer' }}>
                  {/* 프로필 이미지 */}
                  <FileUpload profileImg={profileImg} />
                </div>
                <p onClick={() => navigate('/mypage/main')}>
                  {/* 닉네임 */}
                  {userData.userName}
                </p>
                <span>
                  {/* 회원 등급 */}
                  {userData.authority === 'user' ? '일반회원' : '관리자'}
                </span>
              </div>
              <div>
                {/* 메뉴 */}
                <p>쇼핑</p>
                <ul>
                  <li onClick={() => navigate('/mypage/orderList')}>주문목록 / 배송조회</li>
                  <li>취소 / 반품 / 교환 내역</li>
                  <li onClick={() => navigate('/mypage/shopping-bag')}>장바구니</li>
                </ul>
                <p>계정</p>
                <ul>
                  <li onClick={onLogoutHandler}>로그아웃</li>
                  <li onClick={onQuitupHandler}>회원탈퇴</li>
                </ul>
              </div>
            </div>

            <div>
              {/* 메인 세션 */}
              {page === 'main' && <MyPageMain />}
              {page === 'shopping-bag' && <ShoppingBagMain />}
              {page === 'orderList' && <OrderList />}
            </div>
          </div>
          <BG></BG>
        </MyPageMainPageStyle>
      )}

      {userData !== null && media.isMobile && (
        <MobileStyle colorTheme={colorTheme}>
          {userData !== null && !media.isMobile && (
            <div>
              <FileUpload profileImg={profileImg} />
            </div>
          )}
          <div>
            {/* 메인 세션 */}
            {page === 'main' && <MyPageMain />}
            {page === 'shopping-bag' && <ShoppingBagMain />}
            {page === 'orderList' && <OrderList />}
          </div>
        </MobileStyle>
      )}
    </>
  );
};
export default MyPageMainPage;
