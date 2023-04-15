import styled from 'styled-components';

export const MainDiv = styled.div`
  width: ${(props) => (props.media.isPc ? '10vw' : '150px')};
  border: 1px solid black;
`;
