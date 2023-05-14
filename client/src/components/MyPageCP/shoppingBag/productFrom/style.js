import styled from 'styled-components';

export const ProductDiv = styled.div`
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
  & > div:nth-child(1) > div:nth-child(3),
  & > div:nth-child(1) > div:last-child {
    min-width: ${(props) => (props.media.isPc ? '80px' : '60px')};
    width: ${(props) => (props.media.isPc ? 'calc((100% - 70%) / 2)' : '20%')};
  }

  & > div:nth-child(1) > div:nth-child(2) {
    padding-left: 10px;
    width: 70%;
    gap: 0 30px;
  }

  & > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) {
    width: 60px;
    height: 60px;
    background: url('${(props) => props.productImg}') no-repeat center center/cover;
  }

  & > div:nth-child(1) > div:nth-child(2) > span {
    cursor: pointer;
    line-height: 115%;
    overflow: hidden;
    text-align: start;
    /* white-space: nowrap; */
    text-overflow: ellipsis;
  }

  & .principal {
    font-size: 0.7rem;
    color: gray;
  }
`;
