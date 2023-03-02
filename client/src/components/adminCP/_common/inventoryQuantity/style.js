import styled from 'styled-components';

export const ProductFormDiv = styled.div``;

export const MainStyle = styled.section`
  width: 100%;

  & > p,
  & > span,
  & > li {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  & > p:nth-child(1) {
    font-family: Ubuntu;
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
    padding: 10vh 0;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
  }

  & > div:nth-child(2) {
    width: 90%;
    height: ${(props) => (props.media.isPc ? '50px' : '25px')};
    margin: 0 auto 5vh auto;
    position: relative;
    display: flex;
  }

  & > div:nth-child(2) > div:first-child,
  & > div:nth-child(2) > div:nth-child(2),
  & > div:nth-child(2) > div:nth-child(3) {
    position: absolute;
    width: ${(props) => (props.media.isPc ? '130px' : '25%')};
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicFont};
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.7rem')};
    display: flex;
    flex-wrap: wrap;
    z-index: 3;
    border-collapse: separate;
    cursor: pointer;
  }

  & > div:nth-child(2) > div:first-child {
    left: 0;
  }
  & > div:nth-child(2) > div:nth-child(2) {
    left: ${(props) => (props.media.isPc ? '150px' : 'calc(25% + 10px)')};
  }

  & > div:nth-child(2) > div > div:first-child {
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicFont};
  }

  & > div:nth-child(2) > div > div {
    width: ${(props) => (props.media.isPc ? '130px' : '100%')};
    height: ${(props) => (props.media.isPc ? '50px' : '25px')};
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    cursor: pointer;
  }

  & > div:nth-child(2) > div > div:first-child:hover {
    background-color: white;
  }
  & > div:nth-child(2) > div > div:hover {
    background-color: #e6e6e6;
  }
  & > div:nth-child(2) > div .icon {
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.7rem')};
    padding-left: 10px;
  }

  & > div:nth-child(2) > div:last-child {
    width: ${(props) => (props.media.isPc ? '100px' : '25%')};
    height: ${(props) => (props.media.isPc ? '50px' : '25px')};

    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};

    color: ${({ theme }) => theme.palette.white};

    position: absolute;
    left: ${(props) => (props.media.isPc ? '300px' : 'calc(25% + 25% + 20px)')};
  }

  ${ProductFormDiv} {
    width: ${(props) => (props.media.isPc ? '90%' : '100%')};
    margin: 0 auto;
  }

  & .ProductFormDivMenu {
    width: 100%;
    height: 40px;
    background-color: ${(props) =>
      props.colorTheme === 'game' ? 'lightgray' : ({ theme }) => theme.palette.basicLightStroke};
    justify-content: space-evenly;
    z-index: 3;
    position: relative;
    font-family: Noto Sans Kr;
  }

  & .ProductFormDivMenu > p {
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.5rem')};
    width: ${(props) => (props.media.isPc ? 'calc((100% - 60%) / 4)' : 'calc((100% - 40%) / 4)')};
    text-align: center;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.white};
  }

  & .ProductFormDivMenu > p:nth-child(3) {
    width: ${(props) => (props.media.isPc ? '60%' : '40%')};
  }
`;
