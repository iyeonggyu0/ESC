import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '85%')};
  min-height: ${(props) => (props.media.isPc ? 'calc(80vh - 70px)' : 'calc(90vh - 70px)')};
  margin: ${(props) => (props.media.isPc ? '10vh' : '5vh')} auto;
  position: relative;

  & > p:nth-child(1) {
    text-align: center;
    font-size: ${(props) => (props.media.isPc ? '2rem' : '1.6rem')};
    font-weight: 900;
    padding-bottom: ${(props) => (props.media.isPc ? '5vh' : '5vh')};
  }

  & > div:nth-child(2) {
    justify-content: ${(props) => (props.media.isPc ? 'space-between' : 'end')};
    gap: ${(props) => (props.media.isPc ? '0 0' : '0 7%')};
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicFont};
    margin-bottom: 5vh;
    padding-bottom: 2vh;
  }

  & .css-13cymwt-control {
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicFont};
    cursor: pointer;
  }

  & .css-t3ipsp-control:hover,
  & .css-t3ipsp-control,
  & .css-13cymwt-control:hover {
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicFont};
    box-shadow: none;
  }

  & .css-1n6sfyn-MenuList > * {
    z-index: 999;
  }

  & .css-1n6sfyn-MenuList > *:hover,
  & .css-d7l1ni-option {
    background-color: lightgray;
    z-index: 999;
  }

  & .css-tr4s17-option,
  & .css-tr4s17-option:hover {
    background-color: gray;
    z-index: 999;
  }

  & > div:nth-child(2) > div:nth-child(1) * {
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.8rem')};
  }

  & > div:nth-child(2) > div:last-child {
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.8rem')};
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicFont};
    width: ${(props) => (props.media.isPc ? '105px' : '80px')};
    height: 38px;
    border-radius: 4px;
    cursor: pointer;
  }
`;
