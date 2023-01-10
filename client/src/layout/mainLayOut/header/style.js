import styled from 'styled-components';

export const Header = styled.header`
  width: 100vw;
  height: 70px;
  background-color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameBg
      : ({ theme }) => theme.palette.basicBg};
  position: fixed;
  z-index: 100;

  /* border-bottom: 1px solid ${(props) =>
    props.media.isPc === false && props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameLightStroke
      : props.media.isPc === false && props.colorTheme === 'basic'
      ? ({ theme }) => theme.palette.basicStroke
      : false}; */

  /* Font */
  font-size: ${({ theme }) => theme.fontSize.mediumLarge};
  font-family: 'Ubuntu', sans-serif;
  color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameFont
      : ({ theme }) => theme.palette.basicFont};
`;

export const HeaderSection = styled.section`
  width: 75vw;
  height: 70px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;

  .game {
    background-image: url(/img/logo_game.png);
  }

  .basic {
    background-image: url(/img/logo_basic.png);
  }
`;

export const Logo = styled.div`
  cursor: pointer;
  width: 80px;
  height: 25px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

export const Ul = styled.ul`
  margin-left: 50px;
  font-family: 'Gothic A1', sans-serif;
  font-weight: 500;
  li {
    float: left;
    margin-right: 50px;
    cursor: pointer;
  }
`;

export const SectionUl = styled.section`
  position: absolute;
  right: 0px;
  padding-bottom: 3px;

  display: flex;
  align-items: center;

  div:last-child {
    width: 70px;
    height: 70px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    cursor: pointer;
    margin-left: 30px;
  }

  .bars {
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.mediumLarge};
  }

  .xmark {
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.xLarge};
  }
`;

// MENU --------------------------------------------------

export const HeaderMenu = styled.div`
  position: fixed;
  width: 100%;
  height: 230px;
  padding-top: 70px;
  background-color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameBg
      : ({ theme }) => theme.palette.basicBg};
  z-index: 99;

  /* Font */
  color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameFont
      : ({ theme }) => theme.palette.basicFont};
  font-size: ${({ theme }) => theme.fontSize.mediumLarge};
  font-family: 'Gothic A1', sans-serif;
  font-weight: 300;
`;

export const MenuUl = styled.ul`
  text-align: center;
`;

export const MenuDiv = styled.div`
  width: 75vw;
  margin: 0 auto;
  border-top: 1px solid
    ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameStroke
        : ({ theme }) => theme.palette.basicStroke};
  padding-top: 25px;
  position: relative;
  display: flex;

  div:first-child {
    width: 450px;
    margin-left: 135px;
    display: flex;
    justify-content: start;
  }

  div:first-child > ${MenuUl}:nth-child(1) {
    margin-right: 58px;
  }
  div:first-child > ${MenuUl}:nth-child(2) {
    margin-right: 52px;
  }
  div:first-child > ${MenuUl}:nth-child(3) {
    margin-right: 35px;
  }

  div:nth-child(2) {
    position: absolute;
    right: 0;

    display: flex;
    justify-content: end;
  }

  div:nth-child(2) > ${MenuUl}:last-child {
    margin-right: 63px;
  }

  li {
    margin-bottom: 25px;
    cursor: pointer;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightFont
        : ({ theme }) => theme.palette.basicSubFont};
    transition: all 0.3s;
  }

  li:hover {
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameFont
        : ({ theme }) => theme.palette.basicFont};
  }
`;

// MobileMenu ----------------------------------

export const MobileHeader = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 100;

  .bars {
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.xxLarge};
    margin-left: 15px;
  }

  .xmark {
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.xxxLarge};
    margin-left: 16px;
  }
`;
export const MobileMenuDiv = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;

  padding: 15px 0px;

  & > div {
    width: 100%;
  }
`;

export const MobileMenu = styled.div`
  z-index: 99;
  width: 35vw;
  height: 100vh;
  margin-left: 65vw;
  position: fixed;
  padding-top: 71px;

  border-left: 1px solid
    ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightStroke
        : ({ theme }) => theme.palette.basicStroke};
  background-color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameStroke
      : ({ theme }) => theme.palette.basicBg};

  font-family: 'Gothic A1', sans-serif;
  color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameFont
      : ({ theme }) => theme.palette.basicFont};

  ${MobileMenuDiv} {
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightStroke
          : ({ theme }) => theme.palette.basicStroke};
  }

  & > ${MobileMenuDiv} > div {
    border-top: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicLightStroke};
    margin-top: 15px;
    padding-top: 15px;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightFont
        : ({ theme }) => theme.palette.basicSubFont};
    line-height: 160%;
  }

  .icon {
    margin-left: 5px;
  }
`;
