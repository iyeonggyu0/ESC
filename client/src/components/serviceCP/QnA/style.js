import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '85%')};
  min-height: calc(100vh - 70px);
  margin: 0 auto;
  margin-top: 10vh;
  position: relative;

  & > p:nth-child(1) {
    text-align: center;
    font-size: ${(props) => (props.media.isPc ? '2rem' : '1.6rem')};
    font-weight: 900;
    margin-bottom: 8vh;
  }

  & > p:nth-child(2) {
    width: 100%;
    text-align: end;
    padding-bottom: 1vh;
    color: ${({ theme }) => theme.palette.gameLightStroke};
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicFont};
    transition: all 0.3s;
  }

  & > p:nth-child(2):hover {
    color: black;
  }

  & > p:nth-child(2) > span {
    cursor: pointer;
  }
`;
