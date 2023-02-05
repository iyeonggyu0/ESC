import styled from 'styled-components';

export const ButtonFromDiv = styled.div`
  width: 126px;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px solid #9a9a9a;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  .icon {
    color: #333333;
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
    width: 40px;
    height: 38px;
    cursor: pointer;
    transition: all 0.2s;
  }

  input {
    width: 45px;
    height: 30px;
    padding-left: 50%;
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

export const SelectButtonDiv = styled.div`
  width: 65px;
  height: 39px;
  color: #333333;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  cursor: pointer;
  border: 1px solid #9a9a9a;
  transition: all 0.2s;

  &:hover {
    background-color: #eee;
  }
`;
