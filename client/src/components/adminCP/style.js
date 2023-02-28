import styled from 'styled-components';

export const MainStyle = styled.section`
  width: ${(props) => (props.media.isPc ? '75vw' : '95vw')};
  margin: 0 auto;
  font-family: Noto Sans Kr;
`;

export const MenuMainStyle = styled.section`
  width: 13vw;
  height: 100%;
  position: relative;

  & > div:first-child {
    position: fixed;
    height: 100%;
    padding: 3vh 0;
    width: 13vw;
    padding: 0 10px;
    line-height: 2.3rem;
    border-right: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightStroke
          : ({ theme }) => theme.palette.basicStroke};
  }

  // 메뉴 Ul, Li
  & > div:first-child p {
    font-weight: 500;
  }

  & > div:first-child ul {
    padding-left: 10px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicLightStroke};
  }

  & > div:first-child > ul:last-child {
    border-bottom: 0;
  }

  & > div:first-child li {
    cursor: pointer;
  }
`;
