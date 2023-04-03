import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '202px' : '28%')};
  height: ${(props) => (props.media.isPc ? '260px' : '150px')};
  padding: ${(props) => (props.media.isPc ? '25px 25px' : '10px 10px')};
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  font-family: Noto Sans KR;
  /* margin-bottom: ${(props) => (props.media.isPc ? '80px' : '40px')}; */
  /* margin-left: ${(props) => (props.media.isPc ? 'calc(((100% - 1212px) / 6) / 2)' : ' / 2)')};
  margin-right: ${(props) =>
    props.media.isPc
      ? 'calc(((100% - 1212px) / 6) / 2)'
      : 'calc(((100% - (28.2% * 3)) / 3) / 2)'}; */
  z-index: 1;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;

  & > div:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    width: 100%;
    height: 55%;
    margin-bottom: ${(props) => (props.media.isPc ? '15px' : '5px')};
    background: url('/img/product/${(props) => props.data.imgRoute}/${(props) => props.data.img}')
      no-repeat center center / cover;
  }
  & > p:nth-child(3) {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 500;
    font-size: 0.8rem;
    margin-bottom: ${(props) => (props.media.isPc ? '5px' : '3px')};
  }
  & > div:nth-child(4) > p {
    font-weight: 300;
    font-size: ${(props) => (props.media.isPc ? '0.8rem' : '0.6rem')};
    color: gray;
  }
  & > div:nth-child(4) {
    width: 50%;
    font-size: 0.8rem;
  }
  & > p.discount {
    font-size: ${(props) => (props.media.isPc ? '1.1rem' : '0.6rem')};
    position: absolute;
    color: gray;
    bottom: ${(props) => (props.media.isPc ? 'calc(28px + 1.3rem)' : 'calc(10px + 0.7rem)')};
    right: ${(props) => (props.media.isPc ? '25px' : '10px')};
  }
  & > p.discount > .icon {
    padding-left: 5px;
  }
  & > p:last-child {
    font-size: ${(props) => (props.media.isPc ? '1.3rem' : '0.7rem')};
    position: absolute;
    bottom: ${(props) => (props.media.isPc ? '25px' : '10px')};
    right: ${(props) => (props.media.isPc ? '25px' : '10px')};
  }
`;
