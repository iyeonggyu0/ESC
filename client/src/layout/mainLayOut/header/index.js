import { useContext, useState } from 'react';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';

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

const LayOutHeader = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const toggleTheme = useContext(ThemeContext);

  const [menu, setMenu] = useState('none');
  const [mobileMenu1, setMobileMenu1] = useState('none');
  const [mobileMenu2, setMobileMenu2] = useState('none');
  const [mobileMenu3, setMobileMenu3] = useState('none');

  const navigate = useNavigate();

  const Navigate = (link) => {
    navigate(link);
  };

  return (
    <>
      {media.isPc && (
        <div>
          <Header colorTheme={colorTheme} media={media}>
            {/* 메뉴 */}
            <HeaderSection>
              <Logo className={`${colorTheme}`} onClick={() => Navigate('/')}></Logo>
              <Ul>
                <li onClick={() => Navigate('/estimate')}>견적내기</li>
                <li onClick={() => Navigate('/product')}>전체상품</li>
                <li onClick={() => Navigate('/community')}>커뮤니티</li>
                <li onClick={() => Navigate('/service')}>고객센터</li>
              </Ul>
              <SectionUl>
                <div onClick={() => toggleTheme.toggleTheme()}>
                  {colorTheme === 'game' && <span>BASIC</span>}
                  {colorTheme === 'basic' && <span>GAME</span>}
                </div>
                <span onClick={() => Navigate('/login')}>LOGIN</span>
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
                    <li onClick={() => Navigate('/')}>취향찾기</li>
                  </MenuUl>
                  <MenuUl>
                    <li onClick={() => Navigate('/')}>글쓰기</li>
                  </MenuUl>
                  <MenuUl>
                    <li onClick={() => Navigate('/')}>CASE</li>
                    <li onClick={() => Navigate('/')}>PCB</li>
                    <li onClick={() => Navigate('/')}>PLATE</li>
                    <li onClick={() => Navigate('/')}>SWITCHES</li>
                    <li onClick={() => Navigate('/')}>KEYCAPS</li>
                  </MenuUl>
                  <MenuUl>
                    <li onClick={() => Navigate('/')}>커스텀 과정</li>
                    <li onClick={() => Navigate('/')}>FAQ</li>
                    <li onClick={() => Navigate('/')}>채팅 상담</li>
                  </MenuUl>
                </div>
                <div>
                  <MenuUl>
                    <li onClick={() => Navigate('/signup')}>회원가입</li>
                    <li onClick={() => Navigate('/')}>로그아웃</li>
                    <li onClick={() => Navigate('/')}>장바구니</li>
                    <li onClick={() => Navigate('/')}>결제내역</li>
                  </MenuUl>
                </div>
              </MenuDiv>
            </HeaderMenu>
          )}
        </div>
      )}

      {(media.isMobile || media.isTablet) && (
        <div>
          <Header colorTheme={colorTheme} media={media}>
            <HeaderSection colorTheme={colorTheme}>
              <Logo className={`${colorTheme}`} onClick={() => Navigate('/')}></Logo>
              <MobileHeader>
                <span onClick={() => Navigate('/login')}>LOGIN</span>
                {/* <span>MYPAGE</span> */}
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
                <span>견적내기</span>
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
                    <p>취향찾기</p>
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
                    <p>CASE</p>
                    <p>PCB</p>
                    <p>PLATE</p>
                    <p>SWITCHES</p>
                    <p>KEYCAPS</p>
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
                    <p>채팅 상담</p>
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
