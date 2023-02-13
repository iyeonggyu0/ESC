import styled from 'styled-components';

export const ProductDiv = styled.div`
  height: 45vh;
  width: 45vh;
  overflow: hidden;
  position: relative;
  background-color: ${(props) =>
    props.colorTheme === 'game' ? '#171717' : ({ theme }) => theme.palette.white};

  & > div {
    width: 85%;
    height: 85%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & > div > div:nth-child(1) {
    height: 56px;
  }

  & > div > div:nth-child(1) > p:nth-child(1) {
    font-family: Ubuntu;
    font-weight: 500;
    overflow: hidden;
    font-size: 1.2rem;
  }
  & > div > div:nth-child(1) > p:nth-child(2) {
    font-family: Gothic A1;
    font-size: 1.2rem;
    padding: 10px 0px;
  }

  & > div > div:nth-child(2) {
    height: 50%;
    margin: 10px 0px 20px;

    background: url(${(props) => props.img}) no-repeat center center / cover;
  }

  & > div > div:nth-child(3) {
    height: 20%;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.white
          : ({ theme }) => theme.palette.basicStroke};
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameBg
        : ({ theme }) => theme.palette.white};
    font-family: Gothic A1;
    font-weight: 500;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
