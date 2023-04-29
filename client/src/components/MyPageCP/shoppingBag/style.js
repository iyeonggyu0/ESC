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
  & > div:nth-child(3) > ul > li:nth-child(3) {
    width: calc((100% - 70%) / 2);
    min-width: 80px;
  }

  & > div:nth-child(3) > ul > li:nth-child(2) {
    width: 70%;
    min-width: 360px;
  }

  & > div:nth-child(3) > div {
    width: 100%;
    position: relative;
  }
`;
