import styled from 'styled-components';

export const ProductFormDiv = styled.div``;
export const BoxSizeDiv = styled.div``;

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
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
  }

  & > div:nth-child(2) {
    width: ${(props) => (props.media.isPc ? '100%' : '80%')};
    margin: 0 auto ${(props) => (props.media.isPc ? '13vh' : '7vh')} auto;
    position: relative;
    display: flex;
    cursor: pointer;
  }

  & > div:nth-child(2) > div:first-child,
  & > div:nth-child(2) > div:nth-child(2),
  & > div:nth-child(2) > div.div3 {
    position: absolute;
    width: ${(props) => (props.media.isPc ? '130px' : '25%')};
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
    left: 0;
  }
  & > div:nth-child(2) > div:nth-child(2) {
    /* width: ${(props) => (props.media.isPc ? '130px' : '78px')}; */
    left: ${(props) => (props.media.isPc ? '150px' : 'calc(25% + 10px)')};
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
    width: ${(props) => (props.media.isPc ? '130px' : '100%')};
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

  & > div:nth-child(2) > div.boxsize {
    position: absolute;
    height: ${(props) => (props.media.isPc ? '50px' : '25px')};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > div:nth-child(2) > div.boxsize .icon {
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.7rem')};
    cursor: pointer;
  }

  & > div:nth-child(2) > div.boxsize .big {
    color: ${(props) => (props.boxSize === 'big' ? 'black' : '#848484')};
  }

  & > div:nth-child(2) > div.boxsize .small {
    color: ${(props) => (props.boxSize === 'small' ? 'black' : '#848484')};
  }

  ${ProductFormDiv} {
    width: ${(props) => (props.media.isPc ? '100%' : '90%')};
    margin: 0 auto;
    z-index: 1;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    overflow: initial;
    gap: ${(props) =>
      props.media.isPc && props.boxSize === 'small'
        ? '80px calc((100% - 1212px) / 5)'
        : props.media.isPc && props.boxSize === 'big'
        ? '80px calc((100% - 1320px) / 3)'
        : !props.media.isPc && props.boxSize === 'small'
        ? '50px calc(100% - (30.7% * 3))'
        : '50px calc(100% - (30.7% * 3))'};
  }

  /* color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.black
      : ({ theme }) => theme.palette.basicFont}; */
`;
