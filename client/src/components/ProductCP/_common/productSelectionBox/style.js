import styled from 'styled-components';

export const MainStyle = styled.div`
  width: 100%;
  border: 1px solid black;
  padding: 8px;
  border-radius: 8px;
  position: relative;

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
    bottom: 8px;
    right: 8px;
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
`;
