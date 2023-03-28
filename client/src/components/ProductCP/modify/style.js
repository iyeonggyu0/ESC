import styled from 'styled-components';

export const TextInputDiv = styled.div``;
export const TextEditorDiv = styled.div``;
export const ImgDiv = styled.div``;

export const DiscountDiv = styled.div`
  padding: 5vh 0;

  & > p:first-child {
    font-family: Ubuntu;
    font-size: 2rem;
    font-weight: 500;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
  }
  & > p:first-child > .icon {
    margin-left: 30px;
    font-size: 1.2rem;
    font-weight: 400;
    cursor: pointer;
  }

  & > div:nth-child(2) > ${TextInputDiv} > div:nth-child(1) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 3vh 0 2vh 0;
  }

  & > div:nth-child(2) > ${TextInputDiv} > div:nth-child(1) > input {
    width: 100%;
  }

  & > div:nth-child(2) > ${TextInputDiv} > div:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    color: gray;
  }
  & > div:nth-child(2) > ${TextInputDiv} > div:nth-child(2) > div {
    width: 95%;
    display: flex;
    justify-content: center;
    gap: 50px;

    font-weight: 300;
  }
  & > div:nth-child(2) > div:nth-child(2) > div {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
  }
  & > div:nth-child(2) > ${TextInputDiv} > div:nth-child(2) > div > p {
    width: auto;
  }

  & > div:nth-child(2) > div:nth-child(2) {
    width: 100%;
    height: 45px;
    margin: 5vh 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & > div:nth-child(2) > div:nth-child(2) > p {
    width: 13%;
    margin-bottom: ${(props) => (props.media.isPc ? '' : '1vh')};
    font-family: Ubuntu;
    font-size: 1.3rem;
    font-weight: 400;
    text-align: center;
  }

  & ${TextInputDiv} {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const EnrollmentStyle = styled.div`
  /* height: calc(100vh - 71px); */
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10vh auto;

  & > div:first-child {
    width: ${(props) => (props.media.isPc ? '75vw' : '90vw')};
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
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.8rem')};
  }

  & > div > div:nth-child(2) {
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.black
        : ({ theme }) => theme.palette.basicFont};
    padding-bottom: 3vh;
    border-bottom: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
  }

  ${TextInputDiv}:last-child > form {
    width: 100%;
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

  ${TextEditorDiv} {
    padding-bottom: 5vh;
    border-bottom: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
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
    cursor: pointer;

    & ${ImgDiv} {
      width: 100%;
      position: relative;
    }

    & ${ImgDiv} > div:first-child {
      width: 13%;
      height: 130px;
    }

    & ${ImgDiv} > div:nth-child(2) {
      width: 100%;
      height: 130px;
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
