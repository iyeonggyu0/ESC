import styled from "styled-components";

export const ProductDiv = styled.div`
  height: 45vh;
  width: 45vh;
  position: relative;
  background-color: ${(props) => (props.colorTheme === "game" ? "#171717" : ({ theme }) => theme.palette.white)};

  & > div {
    width: 85%;
    height: 85%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & > div > p:nth-child(1) {
    font-family: Ubuntu;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.xxxLarge};
  }
  & > div > p:nth-child(2) {
    font-family: Gothic A1;
    font-size: ${({ theme }) => theme.fontSize.xLarge};
    padding: 10px 0px;
  }

  & > div > div:nth-child(3) {
    height: 50%;
    margin: 10px 0px 20px;

    /* background-image: url(); */
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  & > div > div:nth-child(4) {
    height: 20%;
    border: 1px solid ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.white : ({ theme }) => theme.palette.basicStroke)};
    background-color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameBg : ({ theme }) => theme.palette.white)};
    font-family: Gothic A1;
    font-weight: 500;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
