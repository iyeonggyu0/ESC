import styled from 'styled-components';

export const GradeFormDiv = styled.section`
  position: relative;
  width: 100%;
  height: 200px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  & > div:nth-child(1),
  & > div:nth-child(2) {
    width: 100%;
  }
`;
