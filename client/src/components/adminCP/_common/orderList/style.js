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
    z-index: 3;
  }

  & > div:nth-child(2) > div:first-child,
  & > div:nth-child(2) > div:nth-child(2) {
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
    z-index: 3;
  }

  & > div:nth-child(2) > div > div:nth-child(2):hover {
    background-color: white;
  }
  & > div:nth-child(2) > div > div:hover {
    background-color: #e6e6e6;
  }
  & > div:nth-child(2) > div .icon {
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.7rem')};
    padding-left: 10px;
  }

  & > div:nth-child(2) > div:nth-child(2) {
    width: ${(props) => (props.media.isPc ? '100px' : '25%')};
    height: ${(props) => (props.media.isPc ? '50px' : '25px')};

    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};

    color: ${({ theme }) => theme.palette.white};

    position: absolute;
    left: ${(props) => (props.media.isPc ? '150px' : 'calc(25% + 20px)')};
  }

  & > div:nth-child(2) > div:nth-child(3) {
    height: ${(props) => (props.media.isPc ? '50px' : '25px')};
    width: 300px;
    justify-content: end;
    position: absolute;
    right: 0;
    gap: 0 ${(props) => (props.media.isPc ? '10px' : '5px')};
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.7rem')};
    color: darkgray;
  }

  & > div:nth-child(2) > div:nth-child(3) > p {
    cursor: pointer;
  }

  & > div:nth-child(2) > div:nth-child(3) > p:nth-child(1) {
    font-size: ${(props) => (props.media.isPc ? '0.7rem' : '0rem')};
    cursor: text;
  }

  ${ProductFormDiv} {
    width: ${(props) => (props.media.isPc ? '90%' : '100%')};
    margin: 0 auto;
    padding: 0 0 10vh 0;
  }

  ${ProductFormDiv} > div:last-child {
    width: 100%;
    position: relative;
  }

  & ul.ProductFormDivMenu {
    list-style: none;
    width: 100%;
    height: 30px;
    background-color: lightgray;
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.7rem')};
    color: black;
    justify-content: space-between;
    text-align: center;
    position: relative;
  }

  & ul.ProductFormDivMenu > li:nth-child(1),
  & ul.ProductFormDivMenu > li:nth-child(3),
  & ul.ProductFormDivMenu > li:nth-child(4),
  & ul.ProductFormDivMenu > li:nth-child(5),
  & ul.ProductFormDivMenu > li:nth-child(6) {
    width: ${(props) => (props.media.isPc ? 'calc((100% - 70%) / 2)' : '20%')};
  }

  & ul.ProductFormDivMenu > li:nth-child(2) {
    width: 70%;
  }
`;
