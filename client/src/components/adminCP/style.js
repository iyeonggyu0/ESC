import styled from 'styled-components';

export const MainStyle = styled.section`
  width: ${(props) => (props.media.isPc ? '75vw' : '95vw')};
  margin: 0 auto;
  font-family: Noto Sans Kr;
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.09);

  & > section:nth-child(2) {
    width: calc(100% - 13vw);
    min-height: calc(100vh - 71px);
    margin-left: 13vw;
    z-index: 2;
    position: relative;
  }
`;

export const MenuMainStyle = styled.section`
  position: fixed;
  height: 100%;
  width: 13vw;
  padding: 3vh 20px;
  line-height: 2.3rem;
  border-right: 1px solid lightgray;
  background-color: white;

  // 메뉴 Ul, Li
  & > p {
    font-weight: 500;
    padding-left: 5%;
  }

  & > ul {
    padding-left: 5%;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicLightStroke};
  }

  & > ul:last-child {
    border-bottom: 0;
  }

  & > ul > li {
    cursor: pointer;
    padding-left: 5%;
  }
`;
