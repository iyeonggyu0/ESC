import styled from 'styled-components';

export const EnrollmentStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '90vw')};
  position: relative;
  margin: 10vh auto;

  & > p:first-child {
    font-size: 2.5rem;
    font-family: Ubuntu;
    font-weight: 700;
    padding-bottom: 3vh;
  }
`;
