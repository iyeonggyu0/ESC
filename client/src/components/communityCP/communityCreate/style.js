import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '85%')};
  min-height: ${(props) => (props.media.isPc ? 'calc(84vh - 70px)' : 'calc(87vh - 70px)')};
  margin: ${(props) => (props.media.isPc ? '8vh' : '5vh')} auto 8vh auto;
  position: relative;

  & > p:nth-child(1) {
    text-align: center;
    font-size: ${(props) => (props.media.isPc ? '2rem' : '1.6rem')};
    font-weight: 900;
    margin-bottom: 5vh;
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicFont};
    padding-bottom: ${(props) => (props.media.isPc ? '8vh' : '5vh')};
  }

  & > div {
    margin-bottom: 5vh;
  }

  /* 타이틀 */
  & > div > p {
    font-size: ${(props) => (props.media.isPc ? '1.5rem' : '1.2rem')};
    font-weight: 500;
    margin-bottom: 1.5vh;
  }

  & > div:nth-child(2) > div {
    position: relative;
  }

  & > div:nth-child(2) > div > input {
    font-family: Gothic A1;
    width: 100%;
    height: 50px;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    border-radius: 5px;
    padding: ${(props) => (props.media.isPc ? '2%' : '2% 7%')};
    line-height: 0;
  }

  & > div:nth-child(2) > div > .isPc {
    font-size: 0.9rem;
    position: absolute;
    right: 2%;
    top: 38%;
  }

  & > div:nth-child(2) > p > .isMobile {
    font-size: 0.9rem;
    position: absolute;
    right: 0;
  }

  /* 타입 */
  & > div:nth-child(3) {
    position: relative;
  }

  & .ck-content {
    padding: ${(props) => (props.media.isPc ? '1% 2%' : '1% 7%')};
    min-height: ${(props) => (props.media.isPc ? '25vh' : '35vh')};
  }

  & > div:last-child {
    width: 100%;
  }

  & > div:last-child {
    width: ${(props) => (props.media.isPc ? '15%' : '100%')};
    height: 40px;
    background-color: black;
    color: white;
    margin: 0;
    cursor: pointer;
    position: absolute;
    right: 0;
  }
`;
