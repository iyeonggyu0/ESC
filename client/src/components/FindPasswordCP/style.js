import styled from 'styled-components';

export const FindPasswordMainStyle = styled.div`
  width: 100%;
  height: 100vh;

  color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.black
      : ({ theme }) => theme.palette.basicFont};
  background-color: ${({ theme }) => theme.palette.white};

  & p,
  & span {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  & > div > p {
    font-family: Ubuntu;
    font-size: 2rem;
    margin-bottom: 40px;
    text-align: center;
    pointer-events: none;
  }

  & > div {
    font-family: Gothic A1;
    width: ${(props) => (props.media.isPc ? '450px' : '90vw')};
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -65%);
  }

  & > div > div {
    width: 100%;
    margin-bottom: 50px;
  }

  & > div > div:nth-child(2),
  & > div > div:nth-child(3),
  & > div > div:nth-child(6) {
    margin-bottom: 10px;
  }

  & > div > div:nth-child(4),
  & > div > div:nth-child(7) {
    text-align: end;
    font-size: 1rem;
  }

  & > div > div:last-child {
    width: 100%;
    height: 65px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-family: Gothic A1;
    cursor: pointer;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.white
        : ({ theme }) => theme.palette.basicBg};
    background-color: ${(props) =>
      props.colorTheme === 'game' && props.errorz === true
        ? ({ theme }) => theme.palette.gameLightStroke
        : props.colorTheme === 'basic' && props.errorz === true
        ? ({ theme }) => theme.palette.basicLightStroke
        : props.colorTheme === 'game' && props.errorz === false
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicStroke};
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game' && props.errorz === true
          ? ({ theme }) => theme.palette.gameLightStroke
          : props.colorTheme === 'basic' && props.errorz === true
          ? ({ theme }) => theme.palette.basicLightStroke
          : props.colorTheme === 'game' && props.errorz === false
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
    border-radius: 5px;
    pointer-events: ${(props) => (props.errorz === true ? 'none' : 'all')};
  }

  & > div > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
  }

  & > div > div:nth-child(2) > div {
    width: 32%;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    cursor: pointer;
  }

  & > div > div > input {
    font-family: Gothic A1;
    width: 95%;
    height: 65px;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    border-radius: 5px;
    padding: 0 0 0 5%;
  }

  & > div > div > input + p {
    color: ${(props) =>
      props.colorTheme === 'game' && props.errorz === true
        ? ({ theme }) => theme.palette.black
        : props.colorTheme === 'basic' && props.errorz === true
        ? ({ theme }) => theme.palette.basicFont
        : props.errorz === false
        ? ({ theme }) => theme.palette.white
        : ({ theme }) => theme.palette.white};
  }
`;
