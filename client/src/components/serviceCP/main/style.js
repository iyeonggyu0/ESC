import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '85%')};
  min-height: calc(100vh - 70px);
  margin: 10vh auto;
  position: relative;

  /* 커스텀 과정 / 메뉴얼 */
  & > div:nth-child(1) {
    width: 100%;
    margin-bottom: 10vh;
    position: relative;
  }

  & > div:nth-child(1) > p:first-child {
    font-size: ${(props) => (props.media.isPc ? '2rem' : '1.4rem')};
  }

  & > div:nth-child(1) > div:nth-child(2) {
    width: 100%;
    margin-top: 32px;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  & > div:nth-child(1) > div:nth-child(2) > a {
    width: ${(props) => (props.media.isPc ? '27%' : '100%')};
    height: 120px;
    margin-bottom: ${(props) => (props.media.isPc ? '0' : '2vh')};
    border: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.black
          : ({ theme }) => theme.palette.basicFont};
    padding: 4vh;
    position: relative;
    transition: all 0.3s;
    cursor: pointer;
  }

  & > div:nth-child(1) > div:nth-child(2) > a:hover {
    padding: 4.5vh;
  }

  & > div:nth-child(1) > div:nth-child(2) > a > div:nth-child(1) {
    width: ${(props) => (props.media.isPc ? '80%' : '75%')};
    font-size: ${(props) => (props.media.isPc ? '1.7rem' : '1.5rem')};
  }

  & > div:nth-child(1) > div:nth-child(2) > a > div:nth-child(1) > span {
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '1rem')};
    color: #565656;
  }

  & > div:nth-child(1) > div:nth-child(2) > a > div:nth-child(2) {
    width: ${(props) => (props.media.isPc ? '20%' : '25%')};
    height: 100%;
    font-size: 3.7rem;
  }

  & > div:nth-child(1) > div:nth-child(2) > a:hover > div:nth-child(2) > .icon {
    display: none;
  }

  & > div:nth-child(1) > div:nth-child(2) > a:hover > div:nth-child(2) > .downIcon {
    display: block;
  }

  & > div:nth-child(1) > div:nth-child(2) > a > div:nth-child(2) > .downIcon {
    display: none;
  }
`;
