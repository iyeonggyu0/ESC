import styled from 'styled-components';

export const MainWapper = styled.section`
  width: 100%;
  font-size: 1rem;
  text-align: start;
  color: grey;
  position: relative;
  padding: 1.5%;
  border-radius: ${(props) => (props.media.isPc ? '10px' : '5px')};
  border: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};

  & > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
    padding-bottom: 1%;
    color: black;
    flex-wrap: wrap;
  }

  & > div:nth-child(1) > div:nth-child(2) {
    cursor: pointer;
    padding: ${(props) => (props.media.isPc ? 'auto' : '8px')};
  }

  & > div:nth-child(1) > div:nth-child(2) > span {
    padding-left: 15px;
  }

  & > div:nth-child(1) > div:nth-child(2) .icon {
    padding-left: 5px;
  }

  & > div:last-child {
    text-align: center;
    line-height: 120%;
    font-size: 0.7rem;
    user-select: none;
    margin-top: calc(10px + 1%);
  }

  & > div:last-child > p {
    text-align: center;
    padding: 5px 0;
    cursor: pointer;
    margin: 0 auto;
    width: ${(props) => (props.media.isPc ? 'auto' : '30vw')};
  }
`;

export const InputDivStyle = styled.div`
  margin-bottom: 10px;
  gap: 0 10px;
  position: relative;

  & div {
    width: 80px;
    height: 42px;
    font-size: 0.9rem;
    color: grey;
    border-radius: ${(props) => (props.media.isPc ? '10px' : '5px')};
    border: 1px solid ${(props) => (props.colorTheme === 'game' ? '#D0D7DE' : '#DBD2D1')};
    cursor: pointer;

    transition: 0.3s all;
  }

  & div:hover {
    border: 1px solid black;
    color: black;
  }
`;

export const ExTagStyle = styled.div`
  padding-top: 25px;
  & > h2 {
    font-size: 1rem;
    color: black;
  }

  & > div {
    width: 100%;
    padding: 10px 5px 0px;
    gap: 5px 8px;
  }
`;
