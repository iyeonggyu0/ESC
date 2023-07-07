import styled from 'styled-components';

export const MainStyle = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameBg
      : ({ theme }) => theme.palette.basicBg};
  overflow: hidden;

  /* 윗쪽 div */
  & > div:nth-child(2) {
    width: 100%;
    height: 70%;
    position: relative;
    border-bottom: ${(props) => (props.media.isPc ? '2px' : '1px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
  }

  /* 윗쪽 > 왼쪽 div */
  & > div:nth-child(2) > div:first-child {
    width: 80%;
    height: 100%;
    border-right: ${(props) => (props.media.isPc ? '2px' : '1px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
  }

  /* 윗쪽 > 오른쪽 div */
  & > div:nth-child(2) > div:nth-child(2) {
    width: 100%;
    height: 30%;
  }

  /* 윗쪽 > 오른쪽 div */
  & > div:nth-child(3) {
  }
`;
