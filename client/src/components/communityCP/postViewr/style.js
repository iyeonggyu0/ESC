import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '85%')};
  min-height: ${(props) => (props.media.isPc ? 'calc(80vh - 70px)' : 'calc(90vh - 70px)')};
  margin: ${(props) => (props.media.isPc ? '10vh' : '5vh')} auto;
  position: relative;
`;
