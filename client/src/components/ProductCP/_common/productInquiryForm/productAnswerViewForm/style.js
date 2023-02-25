import styled from 'styled-components';

export const MainStyle = styled.section`
  width: 100%;
  margin: 2vh auto 0 auto;
  position: relative;

  .arrowIcon {
    font-size: 0.9rem;
    margin: 0;
  }

  & > div:first-child {
    width: calc(100% - 40px);
    margin: 0 auto;
    justify-content: space-between;
  }

  & > div:first-child > div {
    gap: 0 10px;
  }

  & > div:first-child > div > p {
    cursor: pointer;
    margin-left: 10px;
  }

  & > textarea {
    width: calc(100% - 40px);
    resize: none;
    pointer-events: ${(props) => (props.modifyMod ? 'all' : 'none')};
    outline: ${(props) => (props.modifyMod ? '1px' : '0px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
    padding: ${(props) => (props.modifyMod ? '25px' : '0px')};
    margin: 20px;
    border-radius: 5px;
  }

  & > textarea:focus {
    outline: ${(props) => (props.modifyMod ? '2px' : '0px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }
`;
