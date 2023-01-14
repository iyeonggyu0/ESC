import { useCallback, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { useMedia } from '../../hooks/useMedia';
import { useProfile } from '../../hooks/useProfile';
import { logOutUser } from '@reducer/userReducer';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import MyPageMain from './main';

import { MyPageMainPageStyle, BG } from './style';

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
  console.log(userData);
  console.log(page);

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  });

  const onLogoutHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logOutUser({ navigate: navigate }));
    },
    [dispatch, navigate],
  );

  return (
    <>
      {userData !== null && (
        <MyPageMainPageStyle colorTheme={colorTheme} media={media} profileImg={profileImg}>
          <div>
            <div>
              {/* 사이드 바 */}
              <div>
                {/* 프로필 */}
                <div>
                  {/* 프로필 이미지 */}
                  <FontAwesomeIcon icon={solid('pen')} />
                </div>
                <p>
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
                  <li>주문목록 / 배송조회</li>
                  <li>취소 / 반품 / 교환 내역</li>
                  <li>장바구니</li>
                  <li>찜</li>
                </ul>

                <p>활동</p>
                <ul>
                  <li>문의내역</li>
                  <li>리뷰</li>
                  <li>상품QnA내역</li>
                </ul>

                <p>커뮤니티</p>
                <ul>
                  <li>작성한 글</li>
                  <li>작성한 제품추천</li>
                  <li>작성한 조합추천</li>
                </ul>

                <p>계정</p>
                <ul>
                  <li onClick={onLogoutHandler}>로그아웃</li>
                  <li>회원탈퇴</li>
                </ul>
              </div>
            </div>

            <div>
              {/* 메인 세션 */}
              {page === 'main' && <MyPageMain />}
            </div>
          </div>
          <BG></BG>
        </MyPageMainPageStyle>
      )}
      {userData === null && (
        <div
          style={{
            width: '100%',
            height: 'calc(100vh - 70px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          로그인이 필요합니다
        </div>
      )}
    </>
  );
};
export default MyPageMainPage;
