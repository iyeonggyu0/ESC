import styled from 'styled-components';

export const MainStyle = styled.div`
  width: 98%;
  border: 1px solid black;
  padding: 10px;
  border-radius: 8px;
  position: relative;
  margin-top: 30px;

  & > p:first-child {
    padding-bottom: 10px;
  }

  & > div:nth-child(2) {
    font-size: 0.8rem;
    color: gray;
    margin-bottom: 30px;
  }

  & > div:last-child {
    position: absolute;
    bottom: 10px;
    right: 10px;
    gap: 0 10px;
  }

  & > div:last-child > p {
    height: 25px;
    font-size: 0.9rem;
    padding: 0 5px;
    cursor: pointer;
    border: 1px solid gray;
    transition: 0.2s all;
  }

  & > div:last-child > p:hover {
    border: 1px solid black;
  }

  & span {
    line-height: 130%;
  }
`;
