import styled from 'styled-components';

export const MainStyle = styled.section`
  width: 100%;
  height: 65px;
  background-color: white;
  border-bottom: 1px solid
    ${(props) =>
      props.colorTheme === 'game' ? 'lightgray' : ({ theme }) => theme.palette.basicLightStroke};
  justify-content: space-evenly;
  z-index: 1;
  position: relative;
  padding: 20px 0;

  & > p {
    font-family: Gothic A1;
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.8rem')};
    width: ${(props) => (props.media.isPc ? 'calc((100% - 60%) / 4)' : 'calc((100% - 40%) / 4)')};
    text-align: center;
    color: black;
  }

  & > p:nth-child(3) {
    width: ${(props) => (props.media.isPc ? '60%' : '40%')};
  }
  & > p:nth-child(3) > span {
    cursor: pointer;
  }

  & > p > input {
    outline: 1px solid
      ${(props) =>
        props.colorTheme === 'game' ? 'gray' : ({ theme }) => theme.palette.basicLightStroke};
    width: 80%;
    border-radius: 5px;
    padding: 5px 5px;
    text-align: center;
  }

  & .plus {
    padding-left: 5px;
  }

  & .icon,
  & .plus {
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.7rem')};
    color: ${(props) =>
      props.colorTheme === 'game' ? 'gray' : ({ theme }) => theme.palette.basicLightStroke};
    cursor: pointer;
    transition: all 0.3s;
  }

  & .icon:hover,
  & .plus:hover {
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.7rem')};
    color: ${(props) =>
      props.colorTheme === 'game' ? 'black' : ({ theme }) => theme.palette.basicStroke};
  }
`;
