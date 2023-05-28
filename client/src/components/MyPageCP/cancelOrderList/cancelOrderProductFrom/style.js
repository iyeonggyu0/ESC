import styled from 'styled-components';

export const MainDiv = styled.div`
  width: 100%;
  position: relative;
  height: 100px;
  border-bottom: 1px solid lightgray;
  background-color: white;
  font-size: ${(props) => (props.media.isPc ? '0.8rem' : '0.6rem')};
  color: black;
  justify-content: space-between;
  text-align: center;
  position: relative;

  & > div:nth-child(1),
  & > div:nth-child(3),
  & > div:nth-child(4),
  & > div:nth-child(5) {
    width: ${(props) => (props.media.isPc ? 'calc((100% - 55%) / 2)' : '20%')};
  }

  & > div:nth-child(6) {
    width: 15%;
  }

  & > div:nth-child(2) {
    width: 55%;
    gap: 0 30px;
    position: relative;
    overflow: hidden;
    flex-wrap: wrap;
  }

  & > div:nth-child(2) > p:nth-child(1) {
    width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.3;
    padding-bottom: 3px;
  }

  & > div:nth-child(2) > p:nth-child(1) > span {
    color: darkgray;
  }

  & > div:nth-child(2) > p:nth-child(2) {
    color: darkgray;
  }

  & > div:nth-child(5) {
    flex-direction: column;
    align-items: center;
  }

  & > div:nth-child(5) > span:nth-child(2) {
    font-size: ${(props) => (props.media.isPc ? '0.7rem' : '0.5rem')};
    color: gray;
  }

  & > div:nth-child(6) {
    flex-wrap: wrap;
    gap: 5px 0;
    position: relative;
  }

  & > div:nth-child(6) > span {
    width: 60%;
    font-size: ${(props) => (props.media.isPc ? '0.7rem' : '0.5rem')};
    padding: 5px;
    border-radius: 3px;
    border: 1px solid darkgray;
    cursor: pointer;
  }
`;
