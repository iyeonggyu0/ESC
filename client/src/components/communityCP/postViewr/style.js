import styled from 'styled-components';

export const MainPostViewrStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '100%')};
  min-height: ${(props) => (props.media.isPc ? 'calc(100vh - 70px)' : 'calc(100vh - 70px)')};
  margin: 0 auto;
  padding: ${(props) => (props.media.isPc ? '10vh 0 ' : '5vh 0')};
  position: relative;

  background: #ffffff;
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  position: relative;

  & > div {
    margin: 0 ${(props) => (props.media.isPc ? '2%' : '8%')};
  }

  & > div:nth-child(1) {
    padding-bottom: 16px;
    margin-bottom: ${(props) => (props.media.isPc ? '2%' : '5%')};
    border-bottom: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightFont
          : ({ theme }) => theme.palette.basicFont};
  }

  & > div:nth-child(1) > div:nth-child(1) {
    font-size: ${(props) => (props.media.isPc ? '1.8rem' : '1.6rem')};
    font-weight: 600;
    padding-bottom: 16px;
  }

  & > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
    width: ${(props) => (props.media.isPc ? '60px' : '45px')};
    height: ${(props) => (props.media.isPc ? '60px' : '45px')};
    margin-right: 10px;
    border-radius: 50%;
    background-image: url(${(props) => props.profileImage});
    box-shadow: 0px 0px 18px -8px rgba(0, 0, 0, 0.2);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  & > div:nth-child(1) > div:nth-child(2) {
    width: 100%;
    justify-content: space-between;
    font-size: ${(props) => (props.media.isPc ? '0.85rem' : '0.8rem')};
  }

  & > div:nth-child(1) > div:nth-child(2) > p:nth-child(1) {
    width: ${(props) => (props.media.isPc ? '50%' : '60%')};
  }

  & > div:nth-child(1) > div:nth-child(2) > p:nth-child(2) {
    width: ${(props) => (props.media.isPc ? '50%' : '40%')};
    text-align: end;
  }

  & > div:nth-child(1) > div:nth-child(2) > p:nth-child(1) > span {
    padding-right: ${(props) => (props.media.isPc ? '26px' : '12px')};
  }

  & > div:nth-child(1) > div:nth-child(2) > p:nth-child(2) > span {
    cursor: pointer;
    padding-left: 16px;
  }

  & > div:nth-child(1) > div:nth-child(2) > p:nth-child(1) > span > .icon {
    color: #787878;
    padding-right: 5px;
  }

  /* 본문 뷰어 */
  & > div:nth-child(2) {
    min-height: ${(props) => (props.media.isPc ? '48vh' : '56vh')};
    margin-bottom: 2vh;
  }

  & > div:nth-child(3) {
    width: ${(props) => (props.media.isPc ? '3.5vw' : '60px')};
    height: ${(props) => (props.media.isPc ? '3.5vw' : '60px')};
    border-radius: 50%;
    box-shadow: 0px 0px 18px -8px rgba(0, 0, 0, 0.4);
    margin: 0 auto;
    cursor: pointer;
  }

  & > div:nth-child(3) .likeIcon {
    padding-right: 5px;
  }
`;
