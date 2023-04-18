import styled from 'styled-components';

export const MainStyle = styled.div`
  width: 100%;
  height: 130px;
  padding: 20px;
  position: relative;
  border: 1px solid black;
  border-radius: 8px;

  & > p:nth-child(1) {
    width: 100%;
    font-size: 1.1rem;
  }
`;
