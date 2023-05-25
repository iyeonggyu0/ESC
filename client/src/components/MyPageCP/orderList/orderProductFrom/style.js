import styled from 'styled-components';

export const MainDiv = styled.div`
  width: 100%;
  position: relative;
  height: 100px;
  border-bottom: 1px solid lightgray;
  background-color: white;
  font-size: 0.8rem;
  color: black;
  justify-content: space-between;
  text-align: center;
  position: relative;

  & > div:nth-child(1),
  & > div:nth-child(3),
  & > div:nth-child(4),
  & > div:last-child {
    width: ${(props) => (props.media.isPc ? 'calc((100% - 70%) / 2)' : '20%')};
  }

  & > div:nth-child(2) {
    width: 65%;
    gap: 0 30px;
  }

  & > div:nth-child(4) {
    flex-direction: column;
    align-items: center;
    gap: 5px 0;
  }

  & > div:nth-child(4) > span:nth-child(2) {
    font-size: 0.7rem;
    color: gray;
  }

  & > div:nth-child(5) {
    flex-wrap: wrap;
    gap: 5px 0;
    position: relative;
  }

  & > div:nth-child(5) > span {
    width: 60%;
    font-size: 0.7rem;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid darkgray;
    cursor: pointer;
  }
`;
