import styled from 'styled-components';

export const OrderText = styled.div`
  overflow-x: hidden;
  line-height: 170%;
  padding-left: ${(props) => (props.media.isPc ? '10%' : '0rem')};
  width: 100%;
  & > span {
    font-weight: 500;
  }

  & > span span {
    font-weight: 400;
    padding-left: 0.5rem;
  }

  & > ul {
    padding-left: 0.5rem;
  }

  & > ul > li > span {
    padding-left: 0.2rem;
  }
`;

export const MainDiv = styled.div`
  font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.5rem')};
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
    width: ${(props) => (props.media.isPc ? 'calc((100% - 60%) / 2)' : '20%')};
  }

  & > div:nth-child(2) {
    padding: 20px 0;
    width: 60%;
    text-align: start;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem 0;
  }

  & > div:nth-child(6) {
    flex-wrap: wrap;
    position: relative;
    gap: 10px 0;
    padding: 20px 0;
  }

  & > div:nth-child(6) span {
    width: 70%;
    border: 1px solid darkgray;
    border-radius: 3px;
    padding: 5px 0;
    cursor: pointer;
  }
`;
