import styled from 'styled-components';

export const ReviewFormWrapper = styled.div`
  width: 100%;
  font-family: Roboto;

  & > div:nth-child(1) {
    width: 98%;
    margin: 0 auto;
    height: 40px;
    padding: 0 12px;
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightStroke
          : ({ theme }) => theme.palette.basicSubFont};
    display: flex;
    justify-content: end;
    align-items: center;
  }
  & > div:nth-child(1) div {
    margin-left: 10px;
    font-size: 0.8rem;
    cursor: pointer;
  }
`;
