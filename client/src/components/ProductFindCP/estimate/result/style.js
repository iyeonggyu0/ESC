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
    margin: 10vh auto;
    margin-top: calc(10vh + 70px);
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
`;
