import styled from 'styled-components';

export const MainStyle = styled.section`
  width: 100%;
  position: relative;

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
    width: 100%;
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
    width: ${(props) => (props.media.isPc ? 'calc((100% - 70%) / 2)' : '20%')};
  }

  & > div:nth-child(3) > ul > li:nth-child(2) {
    width: 70%;
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

  /* 구매 */
  & > div:last-child {
    width: 100%;
    padding: 5vh 0;
    position: relative;
  }

  & > div:last-child > p:nth-child(1) {
    font-size: 1.8rem;
    font-weight: 700;
  }

  & > div:last-child > p:nth-child(1) > span {
    font-size: 0.8rem;
    font-weight: 400;
    color: darkgray;
    padding-left: 5px;
  }

  & > div:last-child > div:nth-child(2) {
    width: 100%;
    font-size: 1.5rem;
    font-weight: 600;
    height: 10vh;
  }

  & > div:last-child > div:nth-child(2) > p.specialSymbol {
    padding: 0 2%;
    font-size: 1.3rem;
  }

  & > div:last-child > div:nth-child(2) > p > .deliveryFee {
    font-size: 0.8rem;
    color: darkgray;
  }

  & > div:last-child > div:nth-child(2) > div.flexWidthCenter {
    flex-wrap: wrap;
  }

  & > div:last-child > div.2 {
    width: 20%;
    height: 50px;
    background-color: black;
    color: white;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }
`;
