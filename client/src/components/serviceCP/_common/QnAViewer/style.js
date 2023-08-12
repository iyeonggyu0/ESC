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
    padding: 2% 3%;
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
`;
