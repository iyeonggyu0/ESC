import styled from 'styled-components';

export const ButtonFromDiv = styled.div`
  width: calc(${(props) => props.height}px * 3);
  height: ${(props) => props.height}px;
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
    font-size: calc(${(props) => props.height}px / 2.5);
  }

  & > div:nth-child(1),
  & > div:nth-child(2),
  & > div:nth-child(3) {
    width: ${(props) => props.height}px;
    height: calc(${(props) => props.height}px - 2px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(${(props) => props.height}px / 2.5);
    cursor: pointer;
    transition: all 0.2s;
  }

  input {
    width: ${(props) => props.height}px;
    height: calc(${(props) => props.height}px - 2px);
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
