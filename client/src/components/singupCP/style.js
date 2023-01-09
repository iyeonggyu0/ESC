import styled from 'styled-components';

export const SignMainStyle = styled.div`
  width: 100%;

  color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.black
      : ({ theme }) => theme.palette.basicFont};
  background-color: ${({ theme }) => theme.palette.white};

  & > div > p {
    font-family: Ubuntu;
    font-size: 2rem;
    margin-bottom: 40px;
    text-align: center;
  }

  & > div {
    font-family: Gothic A1;
    width: ${(props) => (props.media.isPc ? '450px' : '90vw')};
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
    padding: 10vh 0;
  }

  & > div > div:last-child {
    font-family: Gothic A1;
    width: 100%;
    height: 65px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.white
        : ({ theme }) => theme.palette.basicBg};
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameBg
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

  input[type='checkbox'] {
    height: 0.8rem;
    width: 0.8rem;
    cursor: pointer;
    position: absolute;
    border: 2px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    /* display: none; */
  }

  input[type='checkbox'] + label {
    font-family: Gothic A1;
    font-size: 0.8rem;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
    position: relative;
    padding-left: 1.5rem;
    cursor: pointer;
  }
  input[type='checkbox'] + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: -3px;
    width: 0.8rem;
    height: 0.8rem;
    text-align: center;
    background: #fff;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicFont};
  }

  input[type='checkbox']:checked + label:after {
    content: '✔';
    position: absolute;
    left: 2px;
    top: 0;
    width: 1.5rem;
    height: 1.5rem;
  }

  & > div > div {
    width: 100%;
    margin-bottom: 50px;
  }
`;
