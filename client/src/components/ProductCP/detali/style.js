import styled from 'styled-components';

// HOME > 종류 > 이름
export const ProductDetaliHeader = styled.header`
  width: 100%;
  background-color: white;

  & > div {
    width: ${(props) => (props.media.isPc ? '75vw' : '95vw')};
    margin: 0 auto;
    height: 2.3rem;
    display: flex;
    align-items: center;
    font-size: Gothic A1;
    font-weight: 300;
    font-size: 0.8rem;
  }

  & > div > * {
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
    padding-right: 0.8rem;
  }

  border-bottom: 1px solid
    ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightStroke
        : ({ theme }) => theme.palette.basicSubFont};
`;

export const ProductDetaliMain = styled.section`
  width: 100%;
  position: relative;

  & a,
  & p,
  & span {
    font-family: Noto Sans Kr;
  }

  // mainImg, 가격, 구매버튼 등
  & > section:nth-child(1) {
    width: ${(props) => (props.media.isPc ? '75vw' : '95vw')};
    height: ${(props) => (props.media.isPc ? 'calc(100vh - 71px - 2.3rem - 50px)' : 'auto')};
    margin: 0 auto;
    position: relative;

    display: block;
    display: ${(props) => (props.media.isPc ? 'flex' : 'block')};
    align-items: center;
  }

  // mainImg
  & > section:nth-child(1) > div:first-child {
    width: ${(props) => (props.media.isPc ? '50vw' : '95vw')};
    height: ${(props) => (props.media.isPc ? 'calc(100vh - 2.3rem - 221px)' : '95vw')};
    margin: ${(props) => (props.media.isPc ? '0' : '10px auto')};
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);

    background: url(${(props) => props.img}) no-repeat center center / cover;
  }

  // 오른쪽 text div
  & > section:nth-child(1) > div:last-child {
    width: ${(props) => (props.media.isPc ? ' 23vw' : '94vw')};
    height: ${(props) => (props.media.isPc ? 'calc(100vh - 2.3rem - 221px)' : '65vh')};
    padding: 40px 30px;

    position: ${(props) => (props.media.isPc ? 'absolute' : 'relative')};
    right: 0;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  }

  & > section:nth-child(1) > div:last-child > p:nth-child(1) {
    font-size: 2.2rem;
    font-weight: 900;
  }

  & > section:nth-child(1) > div:last-child > div:nth-child(2) {
    display: flex;
    font-size: 20px;
    padding-top: 25px;
    padding-bottom: 35px;
  }

  & > section:nth-child(1) > div:last-child > div:nth-child(2) > div:first-child {
    width: 200px;
  }

  & > section:nth-child(1) > div:last-child > p:nth-child(3) {
    font-weight: 500;
    font-size: 2rem;
    padding-bottom: 50px;
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightStroke
          : ({ theme }) => theme.palette.basicSubFont};
  }

  & > section:nth-child(1) > div:last-child > div:nth-child(4) {
    margin-top: 20px;
  }

  & > section:nth-child(1) > div:last-child > div:last-child {
    width: 100%;
    padding: 0 30px;
    position: absolute;
    bottom: 40px;
    left: 0;
    display: flex;
    justify-content: end;
  }

  & > section:nth-child(1) > div:last-child > div:last-child > div {
    cursor: pointer;
    width: 30%;
    height: 45px;
    margin-left: 20px;
    text-align: center;
    line-height: calc(1rem + 50px / 2);
    border: 1px solid black;
  }

  // 상세보기, 구매후기 선택 메뉴 ...
  & > section:nth-child(2) {
    width: 100%;

    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightStroke
          : ({ theme }) => theme.palette.basicSubFont};
    border-left: 0px;
    border-right: 0px;

    margin-top: ${(props) => (props.media.isPc ? '0px' : '30px')};
  }

  & > section:nth-child(2) > div {
    width: ${(props) => (props.media.isPc ? '75vw' : '95vw')};
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: ${(props) => (props.media.isPc ? 'start' : 'space-around')};
    align-items: center;
  }

  & > section:nth-child(2) > div > * {
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
    font-size: Gothic A1;
    font-size: ${(props) => (props.media.isPc ? '1.1rem' : '0.9rem')};
    padding-right: ${(props) => (props.media.isPc ? '2rem' : '0')};
    cursor: pointer;
  }
`;

export const DetaliImgSection = styled.section`
  width: ${(props) => (props.media.isPc ? '75vw' : '100%')};
  height: ${(props) =>
    props.media.isPc && !props.detail
      ? 'calc(100vh - 71px - 2.3rem - 50px)'
      : props.media.isPc && props.detail
      ? 'auto'
      : !props.media.isPc && !props.detail
      ? '100vh'
      : 'auto'}; ;
`;
