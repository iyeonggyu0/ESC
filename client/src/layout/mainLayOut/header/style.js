import styled from "styled-components";

export const Header = styled.header`
  width: 100vw;
  height: 70px;
  background-color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameBg : ({ theme }) => theme.palette.basicBg)};
  position: fixed;
  z-index: 1;

  /* Font */
  font-size: ${({ theme }) => theme.fontSize.mediumLarge};
  font-family: "Ubuntu", sans-serif;
  color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameFont : ({ theme }) => theme.palette.basicFont)};
`;

export const HeaderSection = styled.section`
  width: 85vw;
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
  width: 100px;
  height: 25px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

export const Ul = styled.ul`
  margin-left: 50px;
  font-family: "Gothic A1", sans-serif;
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
  background-color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameBg : ({ theme }) => theme.palette.basicBg)};

  /* Font */
  color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameFont : ({ theme }) => theme.palette.basicFont)};
  font-size: ${({ theme }) => theme.fontSize.mediumLarge};
  font-family: "Gothic A1", sans-serif;
  font-weight: 300;
`;

export const MenuUl = styled.ul`
  text-align: center;
`;

export const MenuDiv = styled.div`
  width: 85vw;
  margin: 0 auto;
  border-top: 1px solid ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameStroke : ({ theme }) => theme.palette.basicStroke)};
  padding-top: 25px;
  position: relative;
  display: flex;

  div:first-child {
    width: 450px;
    margin-left: 155px;
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
    margin-right: 55px;
    margin-left: 22px;
  }

  li {
    margin-bottom: 25px;
    cursor: pointer;
    color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameLightFont : ({ theme }) => theme.palette.basicSubFont)};
    transition: all 0.3s;
  }

  li:hover {
    color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameFont : ({ theme }) => theme.palette.basicFont)};
  }
`;
