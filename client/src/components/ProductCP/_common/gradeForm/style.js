import styled from 'styled-components';

export const GradeFormDiv = styled.section`
  position: relative;
  width: 100%;
  height: 200px;
  border-bottom: 1px solid
    ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightStroke
        : ({ theme }) => theme.palette.basicSubFont};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  & div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  & > div:nth-child(1),
  & > div:nth-child(2) {
    width: 100%;
    height: 40%;
  }

  & > div:nth-child(1) {
    align-items: flex-end;
  }

  & > div:nth-child(1) > p:nth-child(1) {
    font-size: 3rem;
  }

  & > div:nth-child(2) {
    font-size: 2.4rem;
  }
`;
