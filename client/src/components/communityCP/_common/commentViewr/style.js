import styled from 'styled-components';

export const CommentViewrMainStyle = styled.div`
  width: 100%;
  display: flex;
  padding: 12px 0;
  padding-bottom: calc(2vh + 12px);
  border-bottom: 1px solid
    ${(props) =>
      props.colorTheme === 'game' ? '#E7E7E7' : ({ theme }) => theme.palette.basicLightStroke};
  & > div:nth-child(1) {
    width: ${(props) => (props.media.isPc ? '74px' : '54px')};
    height: ${(props) => (props.media.isPc ? '74px' : '54px')};
    border-radius: 50%;
    box-shadow: 0px 0px 18px -8px rgba(0, 0, 0, 0.25);
    background-image: url(${(props) => props.profileImage});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  & > div:nth-child(2) {
    width: ${(props) => (props.media.isPc ? 'calc(100% - 74px)' : 'calc(100% - 54px)')};
    padding-left: 1.5%;
  }

  /* 닉네임 / 수정 삭제 */
  & > div:nth-child(2) > div:nth-child(1) {
    justify-content: space-between;
    padding-bottom: 12px;
  }

  & > div:nth-child(2) > div:nth-child(1) > p:nth-child(1) {
    max-width: 73%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${(props) => (props.media.isPc ? '1.3rem' : '1.2rem')};
  }

  & > div:nth-child(2) > div:nth-child(1) > p:nth-child(1) > span {
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.8rem')};
    color: gray;
    padding-left: ${(props) => (props.media.isPc ? '0.6rem' : '0.5rem')};
  }

  & > div:nth-child(2) > div:nth-child(1) > p:nth-child(1) .icon {
    font-size: ${(props) => (props.media.isPc ? '0.8rem' : '0.7rem')};
    padding-right: 3px;
  }

  & > div:nth-child(2) > div:nth-child(1) > p:nth-child(2) > span {
    font-size: ${(props) => (props.media.isPc ? '0.9rem' : '0.8rem')};
    padding-left: ${(props) => (props.media.isPc ? '0.6rem' : '0.5rem')};
    cursor: pointer;
  }

  & > div:nth-child(2) > div:nth-child(2) > textarea {
    pointer-events: ${(props) => (props.modifyMod ? 'auto' : 'none')};
    width: 100%;
    font-family: Roboto;
    background-color: ${(props) => (props.modifyMod ? '#f7f7f9' : '#fff')};
    resize: none;
    border-radius: 5px;
    border: ${(props) => (props.modifyMod ? '1px' : '0px')} solid darkgray;
    padding: 12px;
  }

  & > div:nth-child(2) > div:nth-child(2) > textarea:focus {
    border: ${(props) => (props.modifyMod ? '2px' : '0px')} solid darkgray;
    outline: none;
    padding: 11px;
  }

  & > div:nth-child(2) > div:nth-child(3) {
    width: 100%;
    margin-top: 6px;
    justify-content: end;
  }

  & > div:nth-child(2) > div:nth-child(3) > p {
    width: 55px;
    height: 1.5rem;
    font-size: ${(props) => (props.modifyMod ? '0.7rem' : '0.6rem')};
    gap: 0 8px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid gray;
  }
`;
