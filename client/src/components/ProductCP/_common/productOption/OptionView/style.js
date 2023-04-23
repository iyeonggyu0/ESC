import styled from 'styled-components';

export const MainDiv = styled.div`
  width: 99%;
  position: relative;
  font-family: Noto Sans Kr;

  & > div {
    margin-bottom: 30px;
    width: 100%;
  }

  & > div > div:nth-child(1) {
    justify-content: space-between;
  }

  & > div > div:nth-child(1) > p:first-child {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  & > div > div:nth-child(1) > .icon {
    margin-bottom: 8px;
    cursor: pointer;
    color: gray;
    transition: all 0.2s;
  }

  & > div > div:nth-child(1) > .icon:hover {
    color: black;
  }

  & > div > div:nth-child(2) {
    border: 1px solid black;
    border-radius: 8px;
  }

  & > div > div:nth-child(2) > div {
    width: 100%;
    height: 60px;
    padding: 0 20px;
    border-bottom: ${(props) => (props.selectMod ? '1px' : '0px')} solid black;
    justify-content: space-between;
    cursor: pointer;
  }

  & > div > div:nth-child(2) > div > p:nth-child(1) {
    max-width: ${(props) => (props.media.isPc ? 'calc(15vw - 70px)' : 'calc(100% - 30px)')};
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > div > div:nth-child(2) > ul {
  }

  & > div > div:nth-child(2) > ul > li {
    min-height: 50px;
    padding: 0 20px;
    padding-bottom: 3px;
  }

  & > div > div:nth-child(2) > ul > li > span {
    padding-left: 10px;
  }

  & > div > div:nth-child(2) > ul > li:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }

  & > div > div:nth-child(2) > ul > li:last-child {
    border-radius: 8px;
  }
`;
