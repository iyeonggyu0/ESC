import styled from 'styled-components';

export const MainStyle = styled.section`
  width: 100%;
  height: calc(100vh - 70px);
  position: relative;
  background-color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameBg
      : ({ theme }) => theme.palette.basicBg};

  /* 윗쪽 div */
  & > div:first-child {
    width: 100%;
    height: 75%;
    position: relative;
    border-bottom: ${(props) => (props.media.isPc ? '2px' : '1px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
  }

  /* 윗쪽 > 왼쪽 div */
  & > div:first-child > div:first-child {
    width: 80%;
    height: 100%;
    border-right: ${(props) => (props.media.isPc ? '2px' : '1px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
  }

  /* 윗쪽 > 오른쪽 div */
  & > div:first-child > div:nth-child(2) {
  }

  /* 윗쪽 > 오른쪽 div */
  & > div:nth-child(2) {
    width: 100%;
    height: 30%;
  }
`;
