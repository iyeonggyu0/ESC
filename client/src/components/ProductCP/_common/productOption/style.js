import styled from 'styled-components';

export const MainDiv = styled.div`
  width: 100%;
  position: relative;
  font-family: Noto Sans Kr;
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 0 ${(props) => (props.media.isPc ? '70px' : '0')};

  & > div:first-child {
    width: ${(props) => (props.media.isPc ? '15vw' : '90vw')};
    max-height: 530px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  & > div:first-child > div.plus {
    width: ${(props) => (props.media.isPc ? '15vw' : '90vw')};
    height: 40px;
    color: #565656;
    border: 1px solid darkgray;
    cursor: pointer;
    border-radius: 8px;
    background-color: #f0f0f0;
    margin-top: 30px;
  }

  /* 스크롤바의 스타일 */
  & > div:first-child::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
    transform: translateX();
    background-color: rgba(0, 0, 0, 0); /* 스크롤바의 배경색 */
    transition: all 0.4s;
  }

  & > div:first-child::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #c1c1c1; /* 스크롤바의 색상 */
  }

  & > div:first-child::-webkit-scrollbar-thumb:hover {
    background-color: #a8a8a8; /* 스크롤바에 호버(hover)될 때의 색상 */
  }

  & > div:last-child.Create {
    width: ${(props) => (props.media.isPc ? 'calc(100% - 15vw - 70px)' : '90vw')};
    margin-top: ${(props) => (props.media.isPc ? '0' : '50px')};
    padding-left: 30px;
    border-left: 1px solid darkgray;
  }

  & > div:last-child.Create > p:first-child {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 15px;
  }

  & > div:last-child.Create > div:nth-child(2) > div {
    width: 100%;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  & > div:last-child.Create > div:nth-child(2) > div > p {
    width: 15%;
    text-align: center;
  }

  & > div:last-child.Create > div:nth-child(2) > div > input {
    height: 50px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0 35px;
    width: calc(100% - 15% - 20px);
  }

  & > div:last-child.Create > div:nth-child(3) {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  & > div:last-child.Create > div:nth-child(3) > p {
    width: 15%;
    text-align: center;
  }

  & > div:last-child.Create > div:nth-child(3) > div {
    width: calc(100% - 15% - 20px);
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid black;
    border-radius: 5px;
    position: relative;
  }

  & > div:last-child.Create > div:nth-child(3) > div::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
    background-color: rgba(0, 0, 0, 0); /* 스크롤바의 배경색 */
    transition: all 0.4s;
  }

  & > div:last-child.Create > div:nth-child(3) > div::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #c1c1c1; /* 스크롤바의 색상 */
  }

  & > div:last-child.Create > div:nth-child(3) > div::-webkit-scrollbar-thumb:hover {
    background-color: #a8a8a8; /* 스크롤바에 호버(hover)될 때의 색상 */
  }

  & > div:last-child.Create > div:nth-child(3) > div > div {
    height: 50px;
    padding: 0 35px;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    position: relative;
  }

  & > div:last-child.Create > div:nth-child(3) > div > div > p > span {
    padding-left: 10px;
  }

  & > div:last-child.Create > div:nth-child(3) .icon {
    cursor: pointer;
  }

  & > div:last-child.Create > div:nth-child(3) > div > div:last-child {
    border-bottom: 0px solid lightgray;
  }

  & > div:last-child.Create > div:nth-child(3) > div > div:last-child > p {
    max-width: calc(100% - 85px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > div:last-child.Create > div:nth-child(4) {
    gap: 0 30px;
    margin-top: 20px;
    justify-content: flex-end;
  }

  & > div:last-child.Create > div:nth-child(4) > div {
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid darkgray;
  }
`;
