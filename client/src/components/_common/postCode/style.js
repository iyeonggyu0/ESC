import styled from 'styled-components';

export const StyleMain = styled.div`
  position: fixed;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.15);

  & > div {
    margin-bottom: ${(props) => (props.media.isPc ? '10vh' : '')};
    position: relative;
    border-radius: 10px;
    width: ${(props) => (props.media.isPc ? '30vw' : '90vw')};
    height: ${(props) => (props.media.isPc ? '444px' : '90vh')};
    background-color: #ffffff;
  }
`;
