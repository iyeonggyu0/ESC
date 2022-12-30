import { useContext, useState } from "react";
import { ThemeContext } from "../../../App";
import { useMedia } from "../../../hooks/useMedia";

// library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Header, HeaderSection, Logo, Ul, SectionUl, HeaderMenu, MenuDiv, MenuUl } from "./style";
import { useNavigate } from "react-router-dom";

const LayOutHeader = () => {
  const media = useMedia();
  const colorTheme = localStorage.getItem("theme");
  const toggleTheme = useContext(ThemeContext);

  const [menu, setMenu] = useState("none");
  const navigate = useNavigate();

  const Navigate = (link) => {
    console.log("실행", link);
    navigate(link);
  };

  return (
    <>
      {media.isPc && (
        <div>
          <Header colorTheme={colorTheme}>
            {/* 메뉴 */}
            <HeaderSection>
              <Logo className={`${colorTheme}`}></Logo>
              <Ul>
                <li onClick={() => Navigate("/estimate")}>견적내기</li>
                <li onClick={() => Navigate("/product")}>전체상품</li>
                <li onClick={() => Navigate("/community")}>커뮤니티</li>
                <li onClick={() => Navigate("/service")}>고객센터</li>
              </Ul>
              <SectionUl>
                <div onClick={() => toggleTheme.toggleTheme()}>
                  {colorTheme === "game" && <span>BASIC</span>}
                  {colorTheme === "basic" && <span>GAME</span>}
                </div>
                <span>LOGIN</span>
                <div>
                  {menu === "none" && <FontAwesomeIcon icon={solid("bars")} className={"bars"} onClick={() => setMenu("block")} />}
                  {menu === "block" && <FontAwesomeIcon icon={solid("xmark")} className={"xmark"} onClick={() => setMenu("none")} />}
                </div>
              </SectionUl>
            </HeaderSection>
          </Header>
          {menu === "block" && (
            <HeaderMenu colorTheme={colorTheme}>
              {/* 드롭메뉴 */}
              <MenuDiv colorTheme={colorTheme}>
                <div>
                  <MenuUl>
                    <li onClick={() => Navigate("/")}>취향찾기</li>
                  </MenuUl>
                  <MenuUl>
                    <li onClick={() => Navigate("/")}>글쓰기</li>
                  </MenuUl>
                  <MenuUl>
                    <li onClick={() => Navigate("/")}>CASE</li>
                    <li onClick={() => Navigate("/")}>PCB</li>
                    <li onClick={() => Navigate("/")}>PLATE</li>
                    <li onClick={() => Navigate("/")}>SWITCHES</li>
                    <li onClick={() => Navigate("/")}>KEYCAPS</li>
                  </MenuUl>
                  <MenuUl>
                    <li onClick={() => Navigate("/")}>커스텀 과정</li>
                    <li onClick={() => Navigate("/")}>FAQ</li>
                    <li onClick={() => Navigate("/")}>채팅 상담</li>
                  </MenuUl>
                </div>
                <div>
                  <MenuUl>
                    <li onClick={() => Navigate("/")}>BASIC</li>
                    <li onClick={() => Navigate("/")}>GAME</li>
                  </MenuUl>
                  <MenuUl>
                    <li onClick={() => Navigate("/")}>회원가입</li>
                    <li onClick={() => Navigate("/")}>로그아웃</li>
                    <li onClick={() => Navigate("/")}>장바구니</li>
                    <li onClick={() => Navigate("/")}>결제내역</li>
                  </MenuUl>
                </div>
              </MenuDiv>
            </HeaderMenu>
          )}
        </div>
      )}

      {(media.isMobile || media.isTablet) && <div>Tablet, Mobile 헤더</div>}
    </>
  );
};
export default LayOutHeader;
