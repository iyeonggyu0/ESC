import styled from 'styled-components';

export const ReviewFormWrapper = styled.div`
  width: 100%;
  font-family: Roboto;

  & > div:nth-child(1) {
    width: 98%;
    margin: 0 auto;
    height: 40px;
    padding: 0 12px;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  & > div:nth-child(1) div {
    margin-left: 10px;
    font-size: 0.8rem;
    cursor: pointer;
  }
`;
