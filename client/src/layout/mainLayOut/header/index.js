import { useContext, useState, useCallback } from 'react';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { logOutUser, quitup } from '@reducer/userReducer';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import {
  Header,
  HeaderSection,
  Logo,
  Ul,
  SectionUl,
  HeaderMenu,
  MenuDiv,
  MenuUl,
  MobileHeader,
  MobileMenu,
  MobileMenuDiv,
} from './style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LayOutHeader = () => {
  const media = useMedia();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const toggleTheme = useContext(ThemeContext);
  const userLoginData = useContext(ThemeContext).userInfo;
  const userData = useContext(ThemeContext).userInfo.userData;

  const [menu, setMenu] = useState('none');
  const [mobileMenu1, setMobileMenu1] = useState('none');
  const [mobileMenu2, setMobileMenu2] = useState('none');
  const [mobileMenu3, setMobileMenu3] = useState('none');
  const [mobileMenu4, setMobileMenu4] = useState('none');

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

  // document.getElementsByTagName('li').onclick = function () {
  //   console.log('클릭');
  //   setMenu('none');
  // };

  return (
    <>
      {media.isPc && (
        <div>
          <Header colorTheme={colorTheme} media={media}>
            {/* 메뉴 */}
            <HeaderSection>
              <Logo className={`${colorTheme}`} onClick={() => navigate('/')}></Logo>
              <Ul>
                <li onClick={() => navigate('/estimate/1')}>견적내기</li>
                <li onClick={() => navigate('/product/list/ALL')}>전체상품</li>
                <li onClick={() => navigate('/community')}>커뮤니티</li>
                <li onClick={() => navigate('/service')}>고객센터</li>
              </Ul>
              <SectionUl>
                <div onClick={() => toggleTheme.toggleTheme()}>
                  {colorTheme === 'game' && <span>BASIC</span>}
                  {colorTheme === 'basic' && <span>GAME</span>}
                </div>
                {!userLoginData.login && <span onClick={() => navigate('/login')}>LOGIN</span>}
                {userLoginData.login && (
                  <span onClick={() => navigate('/mypage/main')}>MYPAGE</span>
                )}
                <div>
                  {menu === 'none' && (
                    <FontAwesomeIcon
                      icon={solid('bars')}
                      className={'bars'}
                      onClick={() => setMenu('block')}
                    />
                  )}
                  {menu === 'block' && (
                    <FontAwesomeIcon
                      icon={solid('xmark')}
                      className={'xmark'}
                      onClick={() => setMenu('none')}
                    />
                  )}
                </div>
              </SectionUl>
            </HeaderSection>
          </Header>
          {menu === 'block' && (
            <HeaderMenu colorTheme={colorTheme}>
              {/* 드롭메뉴 */}
              <MenuDiv colorTheme={colorTheme}>
                <div>
                  <MenuUl>
                    <li onClick={() => navigate('/preference/1')}>취향찾기</li>
                  </MenuUl>
                  <MenuUl>
                    <li onClick={() => navigate('/product/list/CASE')}>CASE</li>
                    <li onClick={() => navigate('/product/list/PCB')}>PCB</li>
                    <li onClick={() => navigate('/product/list/PLATE')}>PLATE</li>
                    <li onClick={() => navigate('/product/list/SWITCHES')}>SWITCHES</li>
                    <li onClick={() => navigate('/product/list/KEYCAPS')}>KEYCAPS</li>
                  </MenuUl>
                  <MenuUl>
                    <li onClick={() => navigate('/')}>글쓰기</li>
                  </MenuUl>
                  <MenuUl>
                    <li onClick={() => navigate('/')}>커스텀 과정</li>
                    <li onClick={() => navigate('/')}>FAQ</li>
                  </MenuUl>
                </div>
                <div>
                  <MenuUl>
                    {!userLoginData.login && <li onClick={() => navigate('/signup')}>회원가입</li>}
                    {userLoginData.login && <li onClick={onLogoutHandler}>로그아웃</li>}
                    {userLoginData.login && (
                      <li onClick={() => navigate('/mypage/shopping-bag')}>장바구니</li>
                    )}
                    {userLoginData.login && (
                      <li onClick={() => navigate('/mypage/orderList')}>결제내역</li>
                    )}
                    {userLoginData.login && userLoginData.userData.authority === 'admin' && (
                      <li onClick={() => navigate('/admin/dashboard')}>ADMIN</li>
                    )}
                  </MenuUl>
                </div>
              </MenuDiv>
            </HeaderMenu>
          )}
        </div>
      )}

      {media.isMobile && (
        <div>
          <Header colorTheme={colorTheme} media={media}>
            <HeaderSection colorTheme={colorTheme}>
              <Logo className={`${colorTheme}`} onClick={() => navigate('/')}></Logo>
              <MobileHeader>
                {!userLoginData.login && <span onClick={() => navigate('/login')}>LOGIN</span>}
                {userLoginData.login && (
                  <span onClick={() => navigate('/mypage/main')}>MYPAGE</span>
                )}
                <div>
                  {menu === 'none' && (
                    <FontAwesomeIcon
                      icon={solid('bars')}
                      className={'bars'}
                      onClick={() => setMenu('block')}
                    />
                  )}
                  {menu === 'block' && (
                    <FontAwesomeIcon
                      icon={solid('xmark')}
                      className={'xmark'}
                      onClick={() => setMenu('none')}
                    />
                  )}
                </div>
              </MobileHeader>
            </HeaderSection>
          </Header>
          {menu === 'block' && (
            <MobileMenu colorTheme={colorTheme}>
              {/* Menu */}
              <MobileMenuDiv onClick={() => toggleTheme.toggleTheme()}>
                {colorTheme === 'game' && <span>BASIC</span>}
                {colorTheme === 'basic' && <span>GAME</span>}
              </MobileMenuDiv>

              <MobileMenuDiv>
                <span onClick={() => navigate('/estimate/1')}>견적내기</span>
                {mobileMenu1 === 'none' && (
                  <FontAwesomeIcon
                    icon={solid('caret-down')}
                    className={'icon'}
                    onClick={() => setMobileMenu1('block')}
                  />
                )}
                {mobileMenu1 === 'block' && (
                  <FontAwesomeIcon
                    icon={solid('caret-up')}
                    className={'icon'}
                    onClick={() => setMobileMenu1('none')}
                  />
                )}
                {mobileMenu1 === 'block' && (
                  <div>
                    <p onClick={() => navigate('/preference/1')}>취향찾기</p>
                  </div>
                )}
              </MobileMenuDiv>

              <MobileMenuDiv>
                <span>전체상품</span>
                {mobileMenu2 === 'none' && (
                  <FontAwesomeIcon
                    icon={solid('caret-down')}
                    className={'icon'}
                    onClick={() => setMobileMenu2('block')}
                  />
                )}
                {mobileMenu2 === 'block' && (
                  <FontAwesomeIcon
                    icon={solid('caret-up')}
                    className={'icon'}
                    onClick={() => setMobileMenu2('none')}
                  />
                )}
                {mobileMenu2 === 'block' && (
                  <div>
                    <p onClick={() => navigate('/product/list/ALL')}>전체상품</p>
                    <p onClick={() => navigate('/product/list/CASE')}>CASE</p>
                    <p onClick={() => navigate('/product/list/PCB')}>PCB</p>
                    <p onClick={() => navigate('/product/list/PLATE')}>PLATE</p>
                    <p onClick={() => navigate('/product/list/SWITCHES')}>SWITCHES</p>
                    <p onClick={() => navigate('/product/list/KEYCAPS')}>KEYCAPS</p>
                  </div>
                )}
              </MobileMenuDiv>
              <MobileMenuDiv>
                <p>커뮤니티</p>
              </MobileMenuDiv>
              <MobileMenuDiv>
                <span>고객센터</span>
                {mobileMenu3 === 'none' && (
                  <FontAwesomeIcon
                    icon={solid('caret-down')}
                    className={'icon'}
                    onClick={() => setMobileMenu3('block')}
                  />
                )}
                {mobileMenu3 === 'block' && (
                  <FontAwesomeIcon
                    icon={solid('caret-up')}
                    className={'icon'}
                    onClick={() => setMobileMenu3('none')}
                  />
                )}
                {mobileMenu3 === 'block' && (
                  <div>
                    <p>커스텀 과정</p>
                    <p>FAQ</p>
                    {userLoginData.login && userLoginData.userInfo.authority === 'admin' && (
                      <p onClick={() => navigate('/admin/dashboard')}>ADMIN</p>
                    )}
                  </div>
                )}
              </MobileMenuDiv>
              <MobileMenuDiv>
                <span>MYPAGE</span>
                {mobileMenu4 === 'none' && (
                  <FontAwesomeIcon
                    icon={solid('caret-down')}
                    className={'icon'}
                    onClick={() => setMobileMenu4('block')}
                  />
                )}
                {mobileMenu4 === 'block' && (
                  <FontAwesomeIcon
                    icon={solid('caret-up')}
                    className={'icon'}
                    onClick={() => setMobileMenu4('none')}
                  />
                )}
                {mobileMenu4 === 'block' && (
                  <div style={{ fontSize: '0.8rem' }}>
                    <p onClick={() => navigate('/mypage/orderList')}>주문목록 / 배송조회</p>
                    <p>취소 / 반품 / 교환 내역</p>
                    <p onClick={() => navigate('/mypage/shopping-bag')}>장바구니</p>
                    <p>찜</p>
                    <p>문의내역</p>
                    <p>리뷰</p>
                    <p>상품QnA내역</p>
                    <p>작성한 글</p>
                    <p>작성한 제품추천</p>
                    <p>작성한 조합추천</p>
                    <p onClick={onLogoutHandler}>로그아웃</p>
                    <p onClick={onQuitupHandler}>회원탈퇴</p>
                  </div>
                )}
              </MobileMenuDiv>
            </MobileMenu>
          )}
        </div>
      )}
    </>
  );
};
export default LayOutHeader;
