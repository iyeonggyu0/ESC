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

  & > div > div:nth-child(2) {
    position: relative; /* 추가 */
    border: 1px solid black;
    border-radius: ${(props) => (props.selectMod ? '0px' : '8px')};
  }

  & > div > div:nth-child(1) > p:first-child {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  & > div > div:nth-child(2) > div:first-child > p:nth-child(1) {
    max-width: ${(props) => (props.media.isPc ? 'calc(15vw - 70px)' : 'calc(100% - 30px)')};
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > div > div:nth-child(2) > div {
    position: relative; /* 추가 */
    width: 100%;
    height: 50px;
    padding: 0 20px;
    padding-top: ${(props) => (props.selectMod ? '1px' : '0px')};
    border-bottom: ${(props) => (props.selectMod ? '1px' : '0px')} solid black;
    justify-content: space-between;
    cursor: pointer;
    z-index: 1; /* 추가 */
  }

  & > div > div:nth-child(2) > ul {
    position: absolute; /* 추가 */
    width: calc(100% + 2px);
    top: 100%; /* 추가 */
    left: -1px; /* 추가 */
    right: 0; /* 추가 */
    background-color: #ffffff; /* 추가 */
    display: ${(props) => (props.selectMod ? 'block' : 'none')}; /* 변경 */
    border: 1px solid #000000;
    border-top: 0px;
    z-index: 2; /* 추가 */
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
