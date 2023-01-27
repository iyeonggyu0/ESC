import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '200px' : '23%')};
  height: ${(props) => (props.media.isPc ? '240px' : '130px')};
  padding: ${(props) => (props.media.isPc ? '25px 25px' : '10px 10px')};
  margin-bottom: ${(props) => (props.media.isPc ? '80px' : '40px')};
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 2px;

  & > div:first-child {
    border: 1px solid black;
    width: 100%;
    height: 65%;

    background: url(${(props) => props.data.img}) no-repeat center center / contain;
  }
`;
