import styled from 'styled-components';

export const MainDiv = styled.div`
  font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.7rem')};
  width: 100%;
  background-color: white;
  color: black;
  justify-content: space-between;
  text-align: center;
  position: relative;
  border-bottom: 1px solid lightgray;

  & > div:nth-child(1),
  & > div:nth-child(3),
  & > div:nth-child(4),
  & > div:nth-child(5),
  & > div:nth-child(6) {
    width: ${(props) => (props.media.isPc ? 'calc((100% - 70%) / 2)' : '20%')};
  }

  & > div:nth-child(2) {
    padding: 15px 15px;
    width: 70%;
    text-align: start;
  }

  & > div:nth-child(6) {
    flex-wrap: wrap;
    position: relative;
    gap: 5px 0;
    padding: 15px 0;
  }

  & > div:nth-child(6) span {
    width: 70%;
    border: 1px solid darkgray;
    border-radius: 3px;
    padding: 5px 0;
  }
`;
