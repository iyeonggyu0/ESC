import styled from 'styled-components';

export const InputForm = styled.div`
  width: 100%;
  height: 177px;
  position: relative;
  font-family: Roboto;

  & > div:first-child {
    width: 100%;
    padding: 8px 12px;
    font-size: 0.875rem;
    font-weight: 700;
  }

  & > div:nth-child(2) {
    width: 98%;
    height: 141px;
    padding: 12px;
    margin: 12px auto;
    border-radius: 5px;
    background-color: #f7f7f9;
  }

  & > div:nth-child(2) > div:first-child {
    font-size: 0.875rem;
    font-weight: 700;
  }

  & > div:nth-child(2) > div:nth-child(2) {
    margin-top: 8px;
    min-height: calc(100% - 24px);
  }

  & > div:nth-child(2) > div:nth-child(2) > textarea {
    width: 100%;
    font-family: Roboto;
    background-color: #f7f7f9;
    resize: none;
  }

  & > div:nth-child(2) > div:nth-child(2) > textarea:focus {
    outline: none;
  }
`;
