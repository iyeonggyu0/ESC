import styled from 'styled-components';

export const TextInputDiv = styled.div``;
export const TextEditorDiv = styled.div``;

export const EnrollmentStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '90vw')};
  position: relative;
  margin: 10vh auto;

  & > p:first-child {
    font-size: 3rem;
    font-family: Ubuntu;
    font-weight: 900;
    padding-bottom: 5vh;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
  }

  /* Input 요소 */
  ${TextInputDiv} {
    font-family: Ubuntu;
    font-size: 1.3rem;
    font-weight: 400;
    margin-bottom: 3vh;

    display: ${(props) => (props.media.isPc ? 'flex' : 'block')};
    align-items: center;
    text-align: center;
  }

  ${TextInputDiv} p {
    width: 13%;
    margin-bottom: ${(props) => (props.media.isPc ? '' : '1vh')};
  }

  ${TextInputDiv} input {
    width: 95%;
    height: ${(props) => (props.media.isPc ? '' : '35px')};
    padding: 1% 0% 1% 2%;
    border-radius: ${(props) => (props.media.isPc ? '10px' : '5px')};
    border: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
  }

  ${TextInputDiv}:nth-child(2) div {
    width: 95%;
    height: ${(props) => (props.media.isPc ? '' : '35px')};
    padding: 1% 0;
    border-radius: ${(props) => (props.media.isPc ? '10px' : '5px')};
    border: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
  }

  ${TextInputDiv}:nth-child(2) div span {
    cursor: pointer;
    font-family: Ubuntu;
    padding: 0 2%;
    font-size: 1rem;
  }

  & > div:nth-child(2) {
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
    padding-bottom: 3vh;
    border-bottom: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
  }

  /* 텍스트 에디터 */
  ${TextEditorDiv} > p:first-child {
    font-family: Ubuntu;
    font-size: 2rem;
    font-weight: 500;
    margin-top: 5vh;
    margin-bottom: 2vh;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
  }

  /* 저장 */
  & > div:last-child {
    width: 6vw;
    height: 5vh;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.white
        : ({ theme }) => theme.palette.basicBg};
    background-color: ${(props) =>
      props.colorTheme === 'game' && props.errorz === true
        ? ({ theme }) => theme.palette.gameLightStroke
        : props.colorTheme === 'basic' && props.errorz === true
        ? ({ theme }) => theme.palette.basicLightStroke
        : props.colorTheme === 'game' && props.errorz === false
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicStroke};
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game' && props.errorz === true
          ? ({ theme }) => theme.palette.gameLightStroke
          : props.colorTheme === 'basic' && props.errorz === true
          ? ({ theme }) => theme.palette.basicLightStroke
          : props.colorTheme === 'game' && props.errorz === false
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicStroke};
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0 auto;
    margin-top: 10vh;
    cursor: pointer;
    pointer-events: ${(props) => (props.errorz ? 'none' : 'all')};
  }
`;
