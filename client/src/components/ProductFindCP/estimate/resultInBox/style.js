import styled from 'styled-components';

export const MainStyle = styled.div`
  width: 100%;
  border-radius: 15px;
  position: relative;
  padding: 40px;
  display: flex;
  flex-wrap: ${(props) => (props.media.isPc ? 'nowrap' : 'wrap')};
  box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.25);
  display: flex;

  & > img:nth-child(1) {
    width: ${(props) => (props.media.isPc ? '250px' : '100%')};
    height: 200px;
    border-radius: 5px;
    object-fit: cover;
    object-position: center center;
    box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.1);
  }

  & > div:nth-child(2) {
    /* height: 200px; */
    width: ${(props) => (props.media.isPc ? 'calc(100% - 290px)' : 'calc(100% - 250px)')};
    margin-left: ${(props) => (props.media.isPc ? '40px' : '0px')};
    margin-top: ${(props) => (props.media.isPc ? '0px' : '40px')};
    position: relative;
  }

  & > div:nth-child(2) > div:nth-child(1) {
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
  }

  & > div:nth-child(2) > div:nth-child(1) > p:nth-child(1) {
    font-size: ${(props) => (props.media.isPc ? '1.6rem' : '1.2rem')};
    font-weight: 700;
    cursor: pointer;
  }

  & > div:nth-child(2) > div:nth-child(1) > p:nth-child(2) {
    font-size: ${(props) => (props.media.isPc ? '1.3rem' : '1rem')};
    font-weight: 300;
    margin-top: 20px;
  }

  & > div:nth-child(2) > div:nth-child(2) {
    width: 100%;
    padding-top: 20px;
  }

  & > div:nth-child(2) > p:nth-child(3) {
    width: 100%;
    text-align: end;
    font-size: ${(props) => (props.media.isPc ? '1.6rem' : '1.2rem')};
    position: relative;
  }

  & > div:nth-child(2) > p:nth-child(3) .icon {
    font-size: ${(props) => (props.media.isPc ? '1rem' : '0.9rem')};
  }
`;
