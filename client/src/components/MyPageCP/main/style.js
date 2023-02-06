import styled from 'styled-components';

export const InputDivfixed = styled.div`
  & > input {
    color: ${({ theme }) => theme.palette.gameLightStroke};
    background-color: #f6f8fa;
    ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightFont
        : ({ theme }) => theme.palette.basicLightStroke};
  }
`;

export const Button = styled.div`
  height: 40px;
  pointer-events: ${(props) => (props.err === true ? 'none' : 'all')};
  cursor: pointer;
  border: ${(props) => (props.err === true ? '1px' : '0px')} solid
    ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameStroke
        : ({ theme }) => theme.palette.basicLightStroke};

  background-color: ${(props) =>
    props.colorTheme === 'game' && props.err === false
      ? ({ theme }) => theme.palette.black
      : props.colorTheme === 'basic' && props.err === false
      ? ({ theme }) => theme.palette.basicStroke
      : ({ theme }) => theme.palette.white};

  color: ${(props) =>
    props.colorTheme === 'game' && props.err === true
      ? ({ theme }) => theme.palette.gameStroke
      : props.colorTheme === 'basic' && props.err === true
      ? ({ theme }) => theme.palette.basicLightStroke
      : ({ theme }) => theme.palette.white};
  margin: 10% auto;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const InputDiv = styled.div`
  & > input {
    background-color: #f6f8fa;
  }
  & > input:focus {
    background-color: ${({ theme }) => theme.palette.white};
    outline: 1px solid ${({ theme }) => theme.palette.gameLightStroke};
  }
`;

export const Checkbox = styled.div`
  height: 20px;
  margin-top: 5%;
  line-height: normal;
  display: flex;
  flex-wrap: wrap;
  input {
    display: none; /* 필수 */
  }

  input + label {
    /* 체크박스 만들기 */
    width: 0.8rem;
    height: 0.8rem;
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameStroke
          : ({ theme }) => theme.palette.basicStroke};
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    border-radius: 3px;
    user-select: none; /* 드래그 금지 */
  }

  input:checked + label {
    /* 체크되었을 때 */
    background: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightFont
        : ({ theme }) => theme.palette.basicLightStroke};
  }

  input + label + label {
    font-size: 1rem;
    position: relative;
    top: -1px;
    left: 5px;
    cursor: pointer;
    user-select: none;
  }
`;

export const EmailSendDiv = styled.div`
  width: ${(props) => (props.media.isPc ? '550px' : '')};
  display: flex;
  flex-wrap: wrap;
  justify-content: start;

  & > div:first-child,
  & > input {
    height: 50px;
    margin-top: 15px;
    border-radius: 10px;
    color: ${(props) =>
      props.emailCheck === false
        ? ({ theme }) => theme.palette.gameLightStroke
        : ({ theme }) => theme.palette.black};
    background-color: ${(props) =>
      props.emailCheck === false ? '#f6f8fa' : ({ theme }) => theme.palette.white};
    border: 1px solid
      ${(props) =>
        props.emailCheck === false ? '#d0d7de' : ({ theme }) => theme.palette.gameLightStroke};
  }

  & > input {
    width: 67%;
    padding-left: 5%;
    pointer-events: ${(props) => (props.emailCheck === true ? 'all' : 'none')};
  }

  & > div:first-child {
    width: 30%;
    cursor: pointer;
    line-height: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: calc(95% - 30% - 62%);
    pointer-events: ${(props) => (props.emailCheck === true ? 'all' : 'none')};
  }
`;

export const MyPageMainStyle = styled.div`
  width: 100%;
  line-height: 4rem;

  ${Button} {
    width: ${(props) => (props.media.isPc ? '120px' : '')};
  }

  & ${Checkbox} > input:checked {
    color: ${({ theme }) => theme.palette.gameLightStroke};
  }

  .rjator {
    width: 22%;
    height: 75px;
    color: ${({ theme }) => theme.palette.black};
    border: 1px solid ${({ theme }) => theme.palette.gameLightStroke};
    background-color: ${({ theme }) => theme.palette.white};
    margin-left: calc(100% - 75% - 22%);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: all;
  }
  .inputwnth {
    word-break: break-all;
    word-wrap: break-word;
  }

  & ${InputDivfixed}, & ${InputDiv} {
    width: ${(props) => (props.media.isPc ? '550px' : '')};
    position: relative;

    & > p {
      position: absolute;
      line-height: normal;
      font-size: 0.9rem;
      top: 13px;
      left: 5%;
      color: ${({ theme }) => theme.palette.gameLightStroke};
    }

    & > input {
      height: 70px;
      width: 100%;
      padding: 15px 5% 0 5%;
      font-size: 1.5rem;
      border: 1px solid #d0d7de;
      border-radius: 10px;
    }
  }

  & ${InputDivfixed}, & ${InputDivfixed} > input,
  & ${InputDivfixed} > p,
  ${InputDiv} > p {
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  & p,
  & span {
    font-family: Gothic A1;
  }

  & > div > p:first-child {
    font-family: Ubuntu;
    font-size: 2rem;
    font-weight: 500;
  }

  ${EmailSendDiv} + div,.text {
    width: ${(props) => (props.media.isPc ? '550px' : '')};
  }

  ${EmailSendDiv} + div > p,.text > p {
    margin-top: 5px;
    line-height: normal;
    text-align: end;
    font-size: 0.8rem;
  }
`;
