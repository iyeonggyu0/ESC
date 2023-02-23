import styled from 'styled-components';

export const MainStyle = styled.section`
  width: 100%;

  position: relative;
  font-family: Gothic A1;
  /* border: 1px solid black; */

  // productName
  & > section:nth-child(1) {
    height: 200px;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicStroke};
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 30px;
    background-color: white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08);
  }

  & > section:nth-child(2) > div:nth-child(1) {
    display: flex;
    justify-content: end;
    gap: 0 20px;
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }

  & > section:nth-child(2) > div:nth-child(1) > * {
    padding: 5px 8px;
    margin-bottom: 15px;
    cursor: pointer;
  }

  & > section:nth-child(2) > div:nth-child(1) > select {
    outline: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }

  & > section:nth-child(2) > div:nth-child(1) > div {
    font-size: 0.7rem;
    color: white;
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicStroke};
  }

  & > section:nth-child(3) > div.inquiryData {
    width: 100%;
    margin-top: 3vh;
    border: 1px solid black;
    min-height: 600px;
    overflow: hidden;
  }

  & > section:nth-child(3) > div.inquiryData > div:nth-child(1) {
    width: 100%;
    height: 40px;
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightFont
        : ({ theme }) => theme.palette.basicLightStroke};
    justify-content: space-evenly;
    z-index: 3;
    position: relative;
  }

  & > section:nth-child(3) > div.inquiryData > div:nth-child(1) > p {
    font-family: Gothic A1;
    font-size: 0.9rem;
    width: calc((100% - 60%) / 4);
    text-align: center;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.white};
  }

  & > section:nth-child(3) > div.inquiryData > div:nth-child(1) > p:nth-child(4) {
    width: 60%;
  }
`;
