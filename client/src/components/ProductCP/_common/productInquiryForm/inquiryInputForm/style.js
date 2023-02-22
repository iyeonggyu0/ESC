import styled from 'styled-components';

export const MainStyle = styled.section`
  width: 100%;
  margin-top: 2vh;
  font-family: Gothic A1;
  /* border: 1px solid black; */

  & p {
    font-family: Gothic A1;
    font-weight: 400;
  }

  & p > span {
    color: #feaa7b;
    padding-left: 3px;
  }

  & > div:nth-child(1) > p,
  & > div:nth-child(3) > p {
    width: 100%;
    margin-bottom: 10px;
    font-size: ${(props) => (props.media.isPc ? '1.3rem' : '1rem')};
  }

  & > div:nth-child(1) > input {
    width: 100%;
    padding: 25px;
    border-radius: 10px;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }

  & > div:nth-child(2) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0 35px;
    margin-top: 20px;
  }

  & > div:nth-child(2) > div:nth-child(1) {
    gap: 0 10px;
  }

  & > div:nth-child(2) > div:nth-child(1) > select {
    border-radius: 3px;
    padding: 5px;
    outline: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }

  & > div:nth-child(2) > div:nth-child(1) p {
    font-size: 1rem;
  }

  & > div:nth-child(2) > div:nth-child(2) label {
    font-size: 1rem;
    margin-right: 10px;
  }

  & > div:nth-child(2) > div:nth-child(2) label,
  & > div:nth-child(2) > div:nth-child(2) input {
    cursor: pointer;
  }

  & textarea {
    width: 100%;
    resize: none;
    border-radius: 3px;
    padding: 25px 30px;
    outline: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }

  & textarea:focus {
    outline: 2px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }

  & > div:last-child {
    width: 100%;
    height: 50px;
    border-radius: 3px;
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicStroke};
    color: white;
    margin-top: 16px;
    cursor: pointer;
  }
`;
