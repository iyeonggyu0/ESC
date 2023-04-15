import styled from 'styled-components';

export const TextInputDiv = styled.div``;
export const TextEditorDiv = styled.div``;
export const ImgsDiv = styled.div``;

export const OptionDiv = styled.div``;

export const EnrollmentStyle = styled.div`
  width: 100%;
  /* height: calc(100vh - 71px); */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div:first-child {
    width: ${(props) => (props.media.isPc ? '75vw' : '90vw')};
    margin: 8vh 0;
  }
  & > div > p:first-child {
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
  ${TextInputDiv} input, ${TextInputDiv} > form {
    width: 100%;
    height: ${(props) => (props.media.isPc ? '' : '35px')};
    padding: 1% 0% 1% 2%;
    border-radius: ${(props) => (props.media.isPc ? '10px' : '5px')};
    border: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
  }
  ${TextInputDiv} #profileInput {
    border: 0px;
  }
  #profileInput {
    color: ${(props) => (props.errorz ? 'gray' : ({ theme }) => theme.palette.black)};
  }
  ${TextInputDiv}:nth-child(2) div {
    width: 100%;
    height: ${(props) => (props.media.isPc ? '' : '65px')};
    padding: 1% 0;
    border-radius: ${(props) => (props.media.isPc ? '10px' : '5px')};
    border: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
    display: ${(props) => (props.media.isPc ? 'block' : 'flex')};
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  ${TextInputDiv}:nth-child(2) div span {
    cursor: pointer;
    font-family: Ubuntu;
    padding: 0 2%;
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.9rem')};
  }
  & > div > div:nth-child(2) {
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
  & > div > div:last-child {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 5vh;
  }
  & > div > div:last-child div {
    margin: 0 30px;
    width: ${(props) => (props.media.isPc ? '6vw' : '15vw')};
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
    cursor: pointer;
  }

  & ${ImgsDiv} {
    width: 100%;
  }
  & ${ImgsDiv} > div:first-child {
    width: 13%;
  }
  & ${ImgsDiv} > div:nth-child(2) {
    width: 100%;
  }

  & ${OptionDiv} {
    width: 100%;
    border-top: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
    margin: 5vh 0;
    padding: 5vh 0 0 0;

    font-family: Ubuntu;

    & > p:nth-child(1) {
      font-size: 2rem;
      font-weight: 500;
      padding-bottom: 30px;
    }

    & > div:nth-child(2) > p:nth-child(1) {
      margin-bottom: 15px;
    }

    & > p:nth-child(1) > span,
    & > div:nth-child(2) > p:nth-child(1) > span {
      font-size: 0.9rem;
      font-weight: 400;
      color: gray;
    }
  }
`;

export const TagDiv = styled.div`
  width: 100%;
  & > div > div:last-child {
    font-size: 0.9rem;
    text-align: start;
    color: grey;
    padding: 1% 2%;
    border-radius: ${(props) => (props.media.isPc ? '10px' : '5px')};
    border: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
  }
  & > div {
    gap: 0 10px;
  }
  & > div > div:last-child {
    width: 15%;
    text-align: center;
    cursor: pointer;
  }
`;
