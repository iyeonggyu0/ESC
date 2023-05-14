import styled from 'styled-components';

export const MainStyle = styled.section`
  width: 100%;

  /* 타이틀 */
  & > p:first-child {
    font-size: 2.3rem;
    font-family: Noto Sans Kr;
    font-weight: 500;
  }

  /* 타이틀 아래 div */
  & > div:nth-child(2) {
    width: 100%;
    text-align: end;
    margin: 30px 0 10px 0;
  }

  & > div:nth-child(2) > span {
    padding-left: 20px;
    font-size: 0.75rem;
    cursor: pointer;
    color: gray;
  }

  & > div:nth-child(2) > span:hover {
    color: black;
  }

  /* 상품 표시 */
  & > div:nth-child(3) {
    width: 100%;
    position: relative;
  }

  & > div:nth-child(3) > ul {
    list-style: none;
    height: 30px;
    background-color: lightgray;
    font-size: 0.9rem;
    color: black;
    justify-content: space-between;
    text-align: center;
    position: relative;
  }

  & > div:nth-child(3) > ul > li:nth-child(1),
  & > div:nth-child(3) > ul > li:nth-child(3),
  & > div:nth-child(3) > ul > li:nth-child(4) {
    min-width: ${(props) => (props.media.isPc ? '80px' : '60px')};
    width: ${(props) => (props.media.isPc ? 'calc((100% - 70%) / 2)' : '20%')};
  }

  & > div:nth-child(3) > ul > li:nth-child(2) {
    width: 70%;
    min-width: ${(props) => (props.media.isPc ? '360px' : 'auto')};
  }

  & > div:nth-child(3) > div {
    width: 100%;
    position: relative;
    max-height: 600px;
    overflow-y: auto;
  }

  /* 스크롤바 전체 스타일링 */
  & > div:nth-child(3) > div::-webkit-scrollbar {
    width: 2px;
  }

  & > div:nth-child(3) > div::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  /* 스크롤바의 썸네일(막대) 스타일링 */
  & > div:nth-child(3) > div::-webkit-scrollbar-thumb {
    background-color: lightgray;
  }
`;
