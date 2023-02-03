import styled from 'styled-components';

export const LoginMainStyle = styled.div`
  width: 100%;
  height: calc(100vh - 71px);

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
    transform: translate(-50%, -55%);
  }

  & > div > div {
    width: 100%;
    margin-bottom: 50px;
  }

  & > div > div:nth-child(4) {
    font-family: Gothic A1;
    width: 100%;
    height: 65px;
    margin: 0 auto;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    border-radius: 5px;
  }

  & > div > div > input {
    font-family: Gothic A1;
    width: 100%;
    height: 65px;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    border-radius: 5px;
    padding: 0 0 0 5%;
  }

  & > div > div:last-child {
    width: 100%;
    height: 65px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  & > div > div:last-child span {
    cursor: pointer;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
  }

  & > div > div:last-child > div {
    width: 1px;
    height: 1rem;
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameStroke
        : ({ theme }) => theme.palette.basicStroke};
  }
`;
