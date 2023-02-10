import styled from 'styled-components';

export const InputForm = styled.div`
  width: 100%;
  position: relative;
  font-family: Roboto;

  & > div:first-child {
    width: 100%;
    padding: 8px 12px;
    font-size: 0.875rem;
    font-weight: 700;
  }

  & > div:nth-child(2) {
    width: 98%;
    padding: 12px;
    margin: 0 auto 12px auto;
    border-radius: 5px;
    background-color: #f7f7f9;
  }

  & > div:nth-child(2) > div:first-child {
    font-size: 0.875rem;
    font-weight: 500;
    padding: 8px;
    padding-top: 0px;
    display: flex;
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightStroke
          : ({ theme }) => theme.palette.basicSubFont};
  }

  & > div:nth-child(2) > div:first-child > div.star {
    margin-left: 10px;
    cursor: pointer;
  }

  & > div:nth-child(2) > div:nth-child(2) {
    margin-top: 8px;
    min-height: calc(100% - 24px);
    display: flex;
  }

  & > div:nth-child(2) > div:nth-child(2) > textarea {
    width: ${(props) => (props.media.isPc ? '87%' : '100%')};
    margin-right: ${(props) => (props.media.isPc ? '1%' : '0%')};
    font-family: Roboto;
    background-color: #f7f7f9;
    resize: none;
  }

  & > div:nth-child(2) > div:nth-child(2) > textarea:focus {
    outline: none;
  }
`;

export const ButtonForm = styled.div`
  width: ${(props) => (props.media.isPc ? '12%' : '100%')};
  height: ${(props) => (props.media.isPc ? '' : '40px')};
  margin-top: ${(props) => (props.media.isPc ? '0' : '20px')};
  background-color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameLightStroke
      : ({ theme }) => theme.palette.basicFont};
  color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.white
      : ({ theme }) => theme.palette.basicFont};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
