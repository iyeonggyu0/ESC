import styled from 'styled-components';

export const ProductOptionDiv = styled.div`
  width: 100%;
  position: relative;

  & > div:nth-child(1) {
    list-style: none;
    height: 81px;
    border-bottom: 1px solid lightgray;
    background-color: white;
    font-size: 0.9rem;
    color: black;
    justify-content: space-between;
    text-align: center;
    position: relative;
  }

  & > div:nth-child(1) > div:nth-child(1),
  & > div:nth-child(1) > span:last-child {
    width: calc((100% - 70%) / 2);
    min-width: 80px;
  }

  & > div:nth-child(1) > div:nth-child(2) {
    width: 60%;
    gap: 0 30px;
  }

  & > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) {
    width: 60px;
    height: 60px;
    background: url('${(props) => props.productImg}') no-repeat center center/cover;
  }

  & > div:nth-child(1) > div:nth-child(2) > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
