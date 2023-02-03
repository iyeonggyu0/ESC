import styled from 'styled-components';

export const ProductFormDiv = styled.div``;

export const ProductMainDivStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '100vw')};
  margin: 10vh auto;

  & p,
  & span,
  & li,
  & div {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  & > p {
    font-family: Ubuntu;
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 7vh;
  }

  & > div:nth-child(2) {
    width: ${(props) => (props.media.isPc ? '100%' : '80%')};
    margin: 0 auto ${(props) => (props.media.isPc ? '13vh' : '7vh')} auto;
    position: relative;
    display: flex;
    cursor: pointer;
  }

  & > div:nth-child(2) > div {
    position: absolute;
    width: ${(props) => (props.media.isPc ? '130px' : '70px')};
    border-radius: 5px;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicFont};
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.7rem')};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    z-index: 3;
    border-collapse: separate;
  }

  & > div:nth-child(2) > div:first-child {
    left: calc(((100% - 1212px) / 6) / 2);
  }
  & > div:nth-child(2) > div:nth-child(2) {
    left: ${(props) => (props.media.isPc ? 'calc((((100% - 1212px) / 6) / 2) + 150px)' : '80px')};
  }

  & > div:nth-child(2) > div:nth-child(3) {
    right: 0;
  }

  & > div:nth-child(2) > div > div:first-child {
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicFont};
  }

  & > div:nth-child(2) > div > div {
    width: ${(props) => (props.media.isPc ? '130px' : '70px')};
    height: ${(props) => (props.media.isPc ? '50px' : '25px')};
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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

  ${ProductFormDiv} {
    z-index: 1;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    overflow: initial;
  }

  /* color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.black
      : ({ theme }) => theme.palette.basicFont}; */
`;
