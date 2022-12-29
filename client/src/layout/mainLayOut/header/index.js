import { useContext } from "react";
import { ThemeContext } from "../../../App";
import { useMedia } from "../../../hooks/useMedia";

// library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Header, HeaderSection, Logo, Ul, SectionUl } from "./style";

const LayOutHeader = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext);
  console.log(colorTheme.colorTheme);
  return (
    <>
      {media.isPc && (
        <div>
          <Header>
            {/* 메뉴 */}
            <HeaderSection>
              <Logo theme={colorTheme.colorTheme}></Logo>
              <Ul>
                <li>견적내기 Sansation</li>
                <li>전체상품</li>
                <li>커뮤니티</li>
                <li>고객센터</li>
              </Ul>
              <SectionUl>
                <div onClick={() => colorTheme.toggleTheme()}>
                  {colorTheme.colorTheme === "game" && <span>BASIC</span>}
                  {colorTheme.colorTheme === "basic" && <span>GAME</span>}
                  <FontAwesomeIcon icon={solid("circle-exclamation")} />
                </div>
                <spans>MyPage</spans>
                <div>
                  <FontAwesomeIcon icon={solid("bars")} />
                </div>
              </SectionUl>
            </HeaderSection>
          </Header>
          <div>
            {/* 드롭메뉴 */}
            <div>
              <ul>
                <li>취향찾기</li>
              </ul>
              <ul>
                <li>글쓰기</li>
              </ul>
              <ul>
                <li>CASE</li>
                <li>PCB</li>
                <li>PLATE</li>
                <li>SWITCHES</li>
                <li>KEYCAPS</li>
              </ul>
              <ul>
                <li>커스텀 과정</li>
                <li>FAQ</li>
                <li>채팅 상담</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>로그아웃</li>
                <li>장바구니</li>
                <li>결제내역</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {(media.isMobile || media.isTablet) && <div>Tablet, Mobile 헤더</div>}
    </>
  );
};
export default LayOutHeader;
