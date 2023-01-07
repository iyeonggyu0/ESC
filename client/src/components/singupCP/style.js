import styled from 'styled-components';

export const SignMainStyle = styled.div`
  width: 100%;
  height: 100vh;

  color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.black
      : ({ theme }) => theme.palette.basicFont};
  background-color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.white
      : ({ theme }) => theme.palette.basicBg};

  p {
    font-family: Ubuntu;
    font-size: 2rem;
    margin-bottom: 30px;
  }

  & > div {
    width: ${(props) => (props.media.isPc ? '450px' : '90vw')};
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
  }

  & > div > input {
    font-family: Gothic A1;
    margin-bottom: 50px;
    width: 95%;
    height: 65px;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    border-radius: 5px;
    padding: 0 5%;
  }
`;
