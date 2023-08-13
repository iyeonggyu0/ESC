import styled from 'styled-components';

export const MainStyle = styled.div`
  width: 100%;
  border-bottom: 1px solid #d2d2d2;
  position: relative;

  & > div:nth-child(1) {
    width: 100%;
    height: 70px;

    justify-content: space-between;
    padding: 0 ${(props) => (props.media.isPc ? '0' : '20px')};
  }

  & > div:nth-child(1) > p {
    width: ${(props) => (props.media.isPc ? '8%' : 'auto')};
    text-align: center;
  }

  & > div:nth-child(1) > p:nth-child(1) {
    width: ${(props) => (props.media.isPc ? '6%' : '80%')};
    text-align: ${(props) => (props.media.isPc ? 'center' : 'start')};
  }

  /* 타이틀 별표시 */
  & > div:nth-child(1) > p:nth-child(1) > span,
  & > div:nth-child(1) > p:nth-child(3) > span {
    padding-left: 0.5rem;
    color: orange;
  }

  & > div:nth-child(1) > p:nth-child(3) {
    width: 45%;
    text-align: start;
  }

  & > div:nth-child(1) .icon {
    font-size: 0.8rem;
    padding-left: 0.3rem;
  }

  /* 질문 내용 */
  & > div:nth-child(2) {
    width: 100%;
    padding: ${(props) => (props.media.isPc ? '2% 3%' : '20px 20px')};
    border-top: 1px solid #f0f0f0;
  }

  & > div:nth-child(2) > div:nth-child(1) {
    justify-content: space-between;
    padding-bottom: 2vh;
  }

  & > div:nth-child(2) > div:nth-child(1) > p:nth-child(1) {
    font-size: ${(props) => (props.media.isPc ? '1.6rem' : '1.3rem')};
  }

  & > div:nth-child(2) > div:nth-child(1) > p:nth-child(2) > span {
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.8rem')};
    padding-right: 1rem;
    cursor: pointer;
  }

  & .answerDiv {
    padding: 0 ${(props) => (props.media.isPc ? '3% 2% 3%' : '20px 20px 20px')};
  }

  & .answerCreateDiv {
    padding: ${(props) => (props.media.isPc ? '3%' : '20px')};
  }

  & .answerDiv > *:nth-child(2) {
    width: 98%;
    margin: 0 auto;
  }

  & .answerDiv > div:nth-child(1) {
    justify-content: space-between;
    padding-bottom: 2vh;
  }

  & .answerDiv > div:nth-child(1) > p:nth-child(1) {
    font-size: ${(props) => (props.media.isPc ? '1.4rem' : '1.1rem')};
  }

  & .answerCreateDiv > p:nth-child(1) {
    font-size: ${(props) => (props.media.isPc ? '1.4rem' : '1.1rem')};
    padding-bottom: 2vh;
  }

  & .answerDiv > div:nth-child(1) > p:nth-child(2) {
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.8rem')};
    padding-right: 1rem;
    cursor: pointer;
  }

  & .ck-content {
    padding: 1% 2%;
    min-height: ${(props) => (props.media.isPc ? 'auto' : '10vh')};
  }

  & .answerCreateDiv > div:nth-child(3) {
    justify-content: end;
    width: 100%;
    margin-top: 2vh;
    gap: 0 30px;
    position: relative;
  }

  & .answerCreateDiv > div:nth-child(3) > span {
    cursor: pointer;
    padding: 0.5% 1%;
  }
`;
