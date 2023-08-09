import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '85%')};
  min-height: calc(100vh - 70px);
  margin: 0 auto;
  margin-top: 10vh;
  position: relative;

  & > p:nth-child(1) {
    text-align: center;
    font-size: ${(props) => (props.media.isPc ? '2rem' : '1.6rem')};
    font-weight: 900;
    margin-bottom: 8vh;
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicFont};
    padding-bottom: 10vh;
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
    padding: 2%;
    line-height: 0;
  }

  & > div:nth-child(2) > div > .isPc {
    font-size: 0.9rem;
    position: absolute;
    right: 2%;
    top: 20px;
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

  & .css-13cymwt-control {
    border: 1px solid black;
  }

  & .css-1fdsijx-ValueContainer {
    padding-left: 2%;
    height: 57px;
  }

  & .css-t3ipsp-control:hover,
  & .css-t3ipsp-control {
    border: 1px solid black;
    box-shadow: none;
  }

  & .css-1n6sfyn-MenuList > * {
    padding-left: 2%;
  }

  & .css-1n6sfyn-MenuList > *:hover,
  & .css-d7l1ni-option {
    background-color: lightgray;
  }

  & .css-tr4s17-option,
  & .css-tr4s17-option:hover {
    background-color: gray;
  }
`;
