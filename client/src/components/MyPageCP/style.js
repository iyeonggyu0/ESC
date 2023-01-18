import styled from 'styled-components';

export const BG = styled.div`
  width: 100%;
  height: 30vh;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const MyPageMainPageStyle = styled.div`
  overflow: hidden;
  width: 100%;

  font-family: Gothic A1;
  position: relative;

  & > div:first-child {
    position: relative;
    width: 60vw;
    margin: 0 auto;

    margin-top: 15vh;
    display: flex;

    z-index: 2;

    background-color: ${({ theme }) => theme.palette.white};
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  }

  & > div > div:nth-child(2) {
    width: 100%;
    padding: 0 5%;
    margin: 3% 0;
  }

  // 메뉴
  & > div > div:first-child {
    width: 10vw;
    padding: 0 3%;
    margin: 3% 0;
    border-right: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    position: relative;

    line-height: 2.3rem;
  }

  // 프로필Div
  & > div > div:first-child > div:first-child {
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicLightStroke};
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    margin-bottom: 20px;
  }

  & > div > div:first-child > div:first-child > p {
    font-size: ${({ theme }) => theme.fontSize.xxLarge};
    width: 10vw;
  }

  & > div > div:first-child > div:first-child > span {
    font-size: ${({ theme }) => theme.fontSize.mediumLarge};
    color: ${({ theme }) => theme.palette.gameLightStroke};
    margin-bottom: 15px;
  }

  // 프로필이미지
  & > div > div:first-child > div:first-child > div:first-child {
    width: 100%;
    height: 10vw;
    margin-bottom: 20px;
  }

  & > div > div:first-child > div:nth-child(2) {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  // 메뉴 Ul, Li
  & > div > div:first-child > div:nth-child(2) p {
    font-weight: 500;
  }

  & > div > div:first-child > div:nth-child(2) ul {
    padding-left: 3%;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicLightStroke};
  }

  & > div > div:first-child > div:nth-child(2) > ul:last-child {
    border-bottom: 0;
    margin-bottom: 100px;
  }
  & > div > div:first-child > div:nth-child(2) > ul:last-child > li:last-child {
    color: #ff6d6d;
  }

  & > div > div:first-child > div:nth-child(2) li {
    cursor: pointer;
  }

  // BG
  ${BG} {
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightFont
        : ({ theme }) => theme.palette.basicBg};

    border-top: ${(props) => (props.colorTheme === 'game' ? '0px' : '1px')} solid
      ${({ theme }) => theme.palette.basicFont};
  }
`;

export const MobileStyle = styled.div`
  width: 100vw;

  & > div:first-child {
    width: 80vw;
    height: 80vw;
    margin: 5vh auto 0 auto;
  }

  & > div:nth-child(2) {
    margin: 0 auto;
    width: 90vw;
  }

  & > div:nth-child(2) > div {
    padding: 5vh 0;
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicLightStroke};
  }
`;
