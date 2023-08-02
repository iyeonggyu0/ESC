import styled from 'styled-components';

export const MainStyle = styled.section`
  width: 100%;
  height: ${(props) => (props.media.isPc ? '100vh' : 'auto')};
  position: relative;
  background-color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameBg
      : ({ theme }) => theme.palette.basicBg};
  overflow: hidden;

  /* 윗쪽 div */
  & > div:nth-child(2) {
    width: 100%;
    height: ${(props) => (props.media.isPc ? '70vh' : 'auto')};
    display: flex;
    flex-wrap: ${(props) => (props.media.isPc ? 'nowrap' : 'wrap')};
    position: relative;
    border-bottom: ${(props) => (props.media.isPc ? '2px' : '1px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    margin-top: 70px;
  }

  /* 윗쪽 > 왼쪽 div */
  & > div:nth-child(2) > div:first-child {
    width: ${(props) => (props.media.isPc ? '80%' : '100%')};
    height: 100%;
    position: relative;
    border-right: ${(props) => (props.media.isPc ? '2px' : '1px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicBg};
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
    width: ${(props) => (props.media.isPc ? '20%' : '100%')};
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

  & > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > p:nth-child(2) {
    line-height: 140%;
    font-weight: 500;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) {
    height: ${(props) => (props.media.isPc ? '29%' : 'auto')};
    overflow-y: auto;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:nth-child(3)::-webkit-scrollbar {
    width: 5px;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:nth-child(3)::-webkit-scrollbar-track {
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameBg
        : ({ theme }) => theme.palette.basicBg};
  }
  & > div:nth-child(2) > div:nth-child(2) > div:nth-child(3)::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightStroke
        : ({ theme }) => theme.palette.basicLightStroke};
    border-radius: 5px; /* 스크롤바 썸네일의 둥근 모서리를 지정할 수 있습니다. */
  }

  & > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > p:first-child {
    position: ${(props) => (props.media.isPc ? 'fixed' : 'relative')};
    width: calc(1.6rem * 6);
    padding-bottom: ${(props) => (props.media.isPc ? '0.4rem' : '0.1rem')};
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameBg
        : ({ theme }) => theme.palette.basicBg};
  }

  & > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div {
    padding-top: ${(props) => (props.media.isPc ? '2.3rem' : '1rem')};
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem 1rem;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > p {
    font-size: 0.8rem;
    padding: 6px 12px;
    border-radius: 12px;
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameStroke
        : ({ theme }) => theme.palette.basicBg};
    border: ${(props) => (props.colorTheme === 'game' ? '0px' : '1px')} solid
      ${({ theme }) => theme.palette.gameStroke};
  }

  & > div:nth-child(2) > div:nth-child(2) > div:last-child {
    position: ${(props) => (props.media.isPc ? 'absolute' : 'relative')};
    margin-bottom: ${(props) => (props.media.isPc ? '2.5vh' : '0')};
    bottom: 0px;
    width: ${(props) => (props.media.isPc ? 'calc(100% - (45px * 2))' : '100%')};
    height: 20%;
    padding-top: 2.5vh;
    border-top: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
  }

  & > div:nth-child(2) > div:nth-child(2) > div:last-child > p:nth-child(1) {
    font-size: 1rem;
    padding-bottom: 0rem;
    font-weight: 600;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:last-child > p:nth-child(2) {
    font-size: 1.4rem;
    font-weight: 600;
    width: 100%;
    text-align: end;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:last-child > p:nth-child(2) > span:first-child {
    font-size: 1rem;
    padding-right: 0.5rem;
    font-weight: 500;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:last-child > p:nth-child(2) > span:last-child {
    font-size: 1rem;
    font-weight: 500;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:last-child > div:last-child {
    width: 100%;
    height: ${(props) => (props.media.isPc ? '50%' : '50px')};
    margin-top: ${(props) => (props.media.isPc ? '12px' : '20px')};
    position: relative;
    justify-content: space-between;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:last-child > div:last-child > div:first-child {
    font-size: 0.9rem;
    font-weight: 300;
    width: 48%;
    height: 100%;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.white
          : ({ theme }) => theme.palette.basicStroke};
    cursor: pointer;
  }

  & > div:nth-child(2) > div:nth-child(2) > div:last-child > div:last-child > div:last-child {
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicBg};
    font-size: 0.9rem;
    font-weight: 300;
    width: 48%;
    height: 100%;
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.white
        : ({ theme }) => theme.palette.basicStroke};
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.white
          : ({ theme }) => theme.palette.basicStroke};
    cursor: pointer;
    font-weight: 600;
  }

  /* 아랫쪽 div */
  & > div:nth-child(3) {
    width: 100%;
    height: calc(30vh - 68px);
    position: relative;
    overflow-x: auto;
    margin-bottom: ${(props) => (props.media.isPc ? '0' : '3vh')};
  }

  & > div:nth-child(3) > div {
    width: ${(props) => (props.media.isPc ? '60%' : '70%')};
    height: 100%;
    padding: 5vh 0;
    position: relative;
    overflow: initial;
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
