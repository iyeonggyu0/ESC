import styled from 'styled-components';

export const MainDiv = styled.section`
  width: 100%;
  position: relative;

  & > p:first-child {
    font-size: 2.3rem;
    font-family: Noto Sans Kr;
    font-weight: 500;
    margin-bottom: 3.5vh;
  }

  /* 상품 표시 */
  & > div:nth-child(2) {
    width: 100%;
    position: relative;
  }

  & > div:nth-child(2) > ul {
    list-style: none;
    width: 100%;
    height: 30px;
    background-color: lightgray;
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.7rem')};
    color: black;
    justify-content: space-between;
    text-align: center;
    position: relative;
  }

  & > div:nth-child(2) > ul > li:nth-child(1),
  & > div:nth-child(2) > ul > li:nth-child(3),
  & > div:nth-child(2) > ul > li:nth-child(4),
  & > div:nth-child(2) > ul > li:nth-child(5) {
    width: ${(props) => (props.media.isPc ? 'calc((100% - 70%) / 2)' : '20%')};
  }

  & > div:nth-child(2) > ul > li:nth-child(2) {
    width: 65%;
  }

  & > div:nth-child(2) > div:nth-child(2) {
    overflow-y: auto;
  }

  & > div:nth-child(2) > div:nth-child(2)::-webkit-scrollbar {
    width: 2px;
  }

  & > div:nth-child(2) > div:nth-child(2)::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  & > div:nth-child(2) > div:nth-child(2)::-webkit-scrollbar-thumb {
    background-color: lightgray;
  }

  & > div:nth-child(2) > div {
    width: 100%;
    position: relative;
    min-height: 300px;
    max-height: 600px;
    overflow-y: auto;
  }
`;
