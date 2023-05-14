import styled from 'styled-components';

export const ProductOptionDiv = styled.div`
  width: 100%;
  position: relative;

  & > div:nth-child(1) {
    list-style: none;
    min-height: 61px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #f9f9f9;
    font-size: 0.9rem;
    color: black;
    justify-content: space-between;
    text-align: center;
    position: relative;
    line-height: 150%;
  }

  & > div:nth-child(1) > div:nth-child(1),
  & > div:nth-child(1) > div:nth-child(3),
  & > div:nth-child(1) > span:last-child {
    min-width: ${(props) => (props.media.isPc ? '80px' : '60px')};
    width: ${(props) => (props.media.isPc ? 'calc((100% - 70%) / 2)' : '20%')};
  }

  & > div:nth-child(1) > div:nth-child(2) {
    width: 70%;
    padding: ${(props) => (props.media.isPc ? '20px 30px' : '10px 10px')};
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.7rem')};
    text-align: start;
  }

  & > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) {
    width: 60px;
    height: 60px;
    background: url('${(props) => props.productImg}') no-repeat center center/cover;
  }

  & > div:nth-child(1) > div:nth-child(3) > p {
    line-height: 100%;
  }

  & > div:nth-child(1) > div:nth-child(3) > p:nth-child(2),
  & > div:nth-child(1) > div:nth-child(2) > span > p > span {
    font-size: 0.7rem;
    color: gray;
  }

  & > div:nth-child(1) > div:nth-child(2) > span > p > span {
    padding-left: 5px;
  }
`;
