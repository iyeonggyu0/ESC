import styled from 'styled-components';

export const ButtonFromDiv = styled.div`
  width: 80px;
  height: 25px;
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px solid #9a9a9a;
  z-index: 1;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  .icon {
    color: #333333;
    font-size: 0.8rem;
  }

  & > div:nth-child(1),
  & > div:nth-child(2),
  & > div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > div:nth-child(1),
  & > div:nth-child(2),
  & > div:nth-child(3) {
    width: 25px;
    height: 23px;
    cursor: pointer;
    transition: all 0.2s;
  }

  input {
    width: 25px;
    height: 23px;
    text-align: center;
    z-index: 1;
  }

  input:focus {
    outline: none;
  }

  & > div:nth-child(1):hover,
  & > div:nth-child(3):hover {
    background-color: #eee;
  }

  & > div:nth-child(1) {
    position: absolute;
    left: 0;
  }

  & > div:nth-child(3) {
    position: absolute;
    right: 0;
  }
`;
