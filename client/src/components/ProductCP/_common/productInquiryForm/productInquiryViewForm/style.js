import styled from 'styled-components';

export const InquiryViewFormDiv = styled.section`
  width: 100%;
  border: ${(props) => (props.explanation ? '0px' : '1px')} solid
    ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightFont
        : ({ theme }) => theme.palette.basicLightStroke};
  border-top: 0px;
  background-color: white;

  & .icon {
    padding-left: 10px;
  }

  & .icon2 {
    padding-left: 5px;
  }

  // 메인 div
  & > div:nth-child(1) {
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0px ${(props) => (props.explanation ? '0px 15px' : '0px 0px')} rgba(0, 0, 0, 0.15);
    z-index: ${(props) => (props.explanation ? '2' : '3')};
    position: relative;
    justify-content: space-evenly;
    cursor: ${(props) =>
      props.inquiryData.secret
        ? props.userData !== null
          ? props.inquiryData.email === props.userData.email
            ? 'pointer'
            : 'default'
          : 'default'
        : 'pointer'};
  }

  & > div:nth-child(1) > p {
    font-family: Gothic A1;
    text-align: center;
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.5rem')};
    width: ${(props) => (props.media.isPc ? 'calc((100% - 60%) / 4)' : 'calc((100% - 40%) / 4)')};
  }

  & > div:nth-child(1) > p:nth-child(4) {
    width: ${(props) => (props.media.isPc ? '60%' : '40%')};
    overflow: hidden;
  }

  // 상세보기 div
  & > div:nth-child(2) {
    width: 100%;
    position: relative;
    z-index: 1;
    background-color: white;
    padding: 20px 0;
  }

  & > div:nth-child(2) > div:nth-child(1) {
    justify-content: space-between;
    padding: 0 20px;
  }

  & > div:nth-child(2) > div:nth-child(1) > p:nth-child(1),
  & > div:nth-child(2) > div:nth-child(2) > p:nth-child(2) {
    font-size: 1.4rem;
  }
  & > div:nth-child(2) > div:nth-child(2) > p:nth-child(2) {
    padding: 0 20px;
  }

  & > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) {
    gap: 0 10px;
  }
  & > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p {
    cursor: pointer;
    margin-left: 10px;
  }

  & > div:nth-child(2) > div:nth-child(2) > div.inputDiv {
    width: calc(100% - 40px);
    margin: 2vh auto;
  }

  & > div:nth-child(2) > div:nth-child(2) > div.inputDiv > input {
    width: 100%;
    padding: 15px 25px;
    border-radius: 10px;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }

  & textarea {
    width: calc(100% - 40px);
    resize: none;
    pointer-events: ${(props) => (props.modifyMod ? 'all' : 'none')};
    outline: ${(props) => (props.modifyMod ? '1px' : '0px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
    margin: 20px;
    padding: ${(props) => (props.modifyMod ? '25px' : '0px')};
    border-radius: 5px;
  }

  & textarea:focus {
    outline: ${(props) => (props.modifyMod ? '2px' : '0px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }

  & > div:nth-child(2) > div:nth-child(3) {
    width: 100%;
    justify-content: end;
    gap: 0 35px;
    padding: 0 20px;
  }

  & > div:nth-child(2) > div:nth-child(3) > div:nth-child(1),
  & > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) {
    gap: 0 10px;
  }

  & > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > select {
    border-radius: 3px;
    padding: 5px;
    outline: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
  }

  & > div:nth-child(2) > div:nth-child(3) p {
    font-size: 1rem;
  }

  & > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > p {
    cursor: pointer;
  }

  & > div:nth-child(2) {
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicLightStroke};
  }
`;
