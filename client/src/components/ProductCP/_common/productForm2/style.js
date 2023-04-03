import styled from 'styled-components';

export const MainStyleDiv = styled.div`
  width: ${(props) => (props.media.isPc ? '330px' : '90vw')};
  white-space: pre-line;
  text-align: center;
  font-family: Noto Sans KR;
  & > p:nth-child(2) {
    font-weight: 500;
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '1rem')};
    margin: ${(props) => (props.media.isPc ? '15px' : '15px')} 0px;
  }
  & > p:nth-child(3) {
    font-family: Noto Sans KR;
    font-weight: 300;
    font-size: ${(props) => (props.media.isPc ? '1.3rem' : '1rem')};
    color: black;
  }

  & > p:nth-child(3) > span.text {
    font-family: Noto Sans KR;
    font-weight: 300;
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.9rem')};
    color: gray;
    text-decoration: line-through;
    padding-right: 10px;
  }

  & > p:nth-child(3) > span .icon {
    padding-left: 5px;
  }
`;

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '330px' : '90vw')};
  background-color: white;
  overflow: hidden;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  z-index: 1;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;

  & > div:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => (props.media.isPc ? '330px' : '90vw')};
    height: ${(props) => (props.media.isPc ? '330px' : '90vw')};
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transition: all 0.3s;
  }

  & > div:nth-child(1):hover {
    color: ${(props) =>
      props.productModifyMod ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)'};
    background-color: ${(props) =>
      props.productModifyMod ? 'rgba(63, 63, 63, 0.7)' : 'rgba(63, 63, 63, 0)'};
  }

  & > div:nth-child(2) {
    width: ${(props) => (props.media.isPc ? '330px' : '90vw')};
    height: ${(props) => (props.media.isPc ? '330px' : '90vw')};
    border-radius: 5px;
    background: url('/img/product/${(props) => props.data.imgRoute}/${(props) => props.data.img}')
      no-repeat center center / cover;
  }
`;
