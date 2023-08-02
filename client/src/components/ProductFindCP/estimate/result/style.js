import styled from 'styled-components';

export const MainStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  background-color: white;

  /* main section */
  & > div:nth-child(2) {
    width: ${(props) => (props.media.isPc ? '70%' : '90%')};
    margin: ${(props) => (props.media.isPc ? '10vh' : '5vh')} auto;
    margin-top: ${(props) => (props.media.isPc ? 'calc(10vh + 70px)' : 'calc(5vh + 70px)')};
    position: relative;
  }

  & > div:nth-child(2) > p:first-child {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 4vh;
  }

  & > div:nth-child(2) > div:nth-child(2) > div {
    margin-bottom: 6vh;
    position: relative;
  }

  /* 단계 P태그 */
  & > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(1) {
    font-size: 1.7rem;
    font-weight: 500;
    margin-bottom: 2vh;
  }

  /* 건너뛴 단계 */
  & > div:nth-child(2) > div:nth-child(2) > div > .notSelectionStap {
    width: 100%;
    height: 80px;
    border-radius: 15px;
    font-size: 0.9rem;

    box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.25);
  }

  & > div:nth-child(2) > div:last-child {
    border-top: 1px solid black;
    padding-top: ${(props) => (props.media.isPc ? '10vh' : '5vh')};
    width: 100%;
    position: relative;
  }

  & > div:nth-child(2) > div:last-child > p:nth-child(1) {
    font-size: 2rem;
    font-weight: 700;
  }

  & > div:nth-child(2) > div:last-child > p:nth-child(1) > span {
    font-size: 1rem;
    font-weight: 400;
    color: darkgray;
    padding-left: 5px;
  }

  & > div:nth-child(2) > div:last-child > div:nth-child(2) {
    width: 100%;
    font-size: ${(props) => (props.media.isPc ? '2rem' : '1.2rem')};
    font-weight: 600;
    height: ${(props) => (props.media.isPc ? '10vh' : '9vh')};
  }

  & > div:nth-child(2) > div:last-child > div:nth-child(2) > p.specialSymbol {
    padding: 0 2%;
    font-size: ${(props) => (props.media.isPc ? '1.3rem' : '1rem')};
  }

  & > div:nth-child(2) > div:last-child > div:nth-child(2) > p > .deliveryFee {
    font-size: 0.8rem;
    color: darkgray;
  }

  & > div:nth-child(2) > div:last-child > div:nth-child(2) > div.flexWidthCenter {
    flex-wrap: wrap;
  }
  & > div:nth-child(2) > div:last-child > div:last-child {
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 0 20px;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  & > div:nth-child(2) > div:last-child > div:last-child > div:nth-child(1) {
    width: ${(props) => (props.media.isPc ? '20%' : '35%')};
    height: 50px;
    border: 1px solid black;
    cursor: pointer;
  }

  & > div:nth-child(2) > div:last-child > div:last-child > div:nth-child(2) {
    width: ${(props) => (props.media.isPc ? '20%' : '35%')};
    height: 50px;
    background-color: black;
    color: white;
    cursor: pointer;
  }

  /* 모바일 총 가격 */
  & > div:nth-child(2) .mobileTotalPrice {
    width: 100%;
    justify-content: end;
    padding-bottom: 2vh;
    gap: 0 20px;
    font-size: 1.3rem;
    font-weight: 700;
  }
`;
