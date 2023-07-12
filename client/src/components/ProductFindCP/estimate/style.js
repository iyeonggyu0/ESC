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
    height: 70vh;
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
    position: relative;
    border-right: ${(props) => (props.media.isPc ? '2px' : '1px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    overflow: hidden;
  }

  & > div:nth-child(2) > div:first-child > div {
    width: 100%;
    height: 100%;
    position: relative;
  }

  /* 상품 이미지 */
  & > div:nth-child(2) > div:first-child img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  & > div:nth-child(2) > div:first-child .swiper-pagination-bullet-active {
    background-color: ${(props) =>
      props.colorTheme === 'game' ? 'black' : ({ theme }) => theme.palette.basicStroke};
  }

  /* 윗쪽 > 오른쪽 div */
  & > div:nth-child(2) > div:nth-child(2) {
    width: 20%;
    height: 100%;
    padding: 45px;
    position: relative;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.white
        : ({ theme }) => theme.palette.basicStroke};
  }

  & > div:nth-child(2) > div:nth-child(2) > div {
    width: 100%;
    margin-bottom: 5vh;
  }

  & > div:nth-child(2) > div:nth-child(2) > div > p {
    font-size: 1.1rem;
  }

  & > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(1) {
    text-align: start;
    width: 100%;
    font-size: 1.6rem;
    font-weight: 600;
    padding-bottom: 16px;
  }

  & > div:nth-child(2) > div:nth-child(2) > div ul {
    line-height: 160%;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:last-child {
    position: absolute;
    margin-bottom: 3vh;
    bottom: 0px;
    width: calc(100% - (45px * 2));
    height: 30%;
    padding-top: 3vh;
    border-top: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
  }

  /* 윗쪽 > 오른쪽 div */
  & > div:nth-child(3) {
    width: 100%;
    height: calc(30vh - 68px);
    position: relative;
    overflow-x: auto;
  }

  & > div:nth-child(3) > div {
    width: 60%;
    height: 100%;
    padding: 5vh 0;
    position: relative;
  }

  & > div:nth-child(3) img {
    width: 90%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: 5px;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightStroke
          : ({ theme }) => theme.palette.basicStroke};
    cursor: pointer;
  }
`;
