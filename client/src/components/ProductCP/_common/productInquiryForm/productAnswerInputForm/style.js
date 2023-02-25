import styled from 'styled-components';

export const MainStyle = styled.section`
  width: calc(100% - 40px);
  position: relative;
  margin: 3vh auto 0 auto;
  font-family: Noto Sans Kr;

  & > div:first-child {
    width: 100%;
    justify-content: space-between;
  }

  & > div:first-child > div {
    gap: 0 10px;
  }

  & > div:first-child > div > p {
    cursor: pointer;
    margin-left: 10px;
  }

  & > textarea {
    width: 100%;
    resize: none;
    outline: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
    padding: 25px;
    border-radius: 5px;
    margin-top: 2vh;
  }

  & > textarea:focus {
    outline: 2px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }
`;
