import styled from 'styled-components';

export const HeaderWapper = styled.header`
  width: 100%;
  height: 70px;
  font-family: Ubuntu;
  display: flex;
  position: relative;

  background-color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameBg
      : ({ theme }) => theme.palette.basicBg};
  border-bottom: ${(props) => (props.media.isPc ? '2px' : '1px')} solid
    ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameStroke
        : ({ theme }) => theme.palette.basicStroke};
  color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.white
      : ({ theme }) => theme.palette.basicStroke};

  & > section:first-child {
    width: ${(props) => (props.media.isPc ? '15vw' : 'calc(100vw - 70px)')};
    height: ${(props) => (props.pageChangeMode ? '200%' : '100%')};

    border-right: ${(props) => (props.media.isPc ? '2px' : '1px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameBg
        : ({ theme }) => theme.palette.basicBg};
    flex-wrap: wrap;
    display: flex;
  }

  & > section:first-child > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: ${(props) => (props.media.isPc ? '0 2vw' : '0 5vw')};
    cursor: pointer;
    border-bottom: ${(props) => (props.media.isPc ? '2px' : '1px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
  }

  & > section:first-child > div > div > p:nth-child(1) {
    font-size: 1.3rem;
  }

  & > section:nth-child(2) {
    margin-left: 2vw;
  }

  // ul li
  & > section > ul {
    gap: 0 2vw;
  }

  & li > .icon {
    margin-left: 2vw;
  }

  & > div:last-child {
    width: 70px;
    height: 70px;
    position: absolute;
    right: 0;
    cursor: pointer;
  }
`;
