import styled from 'styled-components';

export const MainDiv = styled.div`
  font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.5rem')};
  width: 100%;
  background-color: white;
  color: black;
  justify-content: space-between;
  text-align: center;
  position: relative;
  border-bottom: 1px solid lightgray;

  & > div {
    width: ${(props) => (props.media.isPc ? 'calc(100% / 2)' : '20%')};
  }

  & > div:nth-child(7) {
    line-height: 140%;
  }

  & > div:last-child {
    flex-wrap: wrap;
    position: relative;
    gap: 10px 0;
    padding: 20px 0;
  }

  & > div:last-child span {
    width: 70%;
    border: 1px solid darkgray;
    border-radius: 3px;
    padding: 5px 5px;
    cursor: pointer;
  }
`;
