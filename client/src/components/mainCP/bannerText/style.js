import styled from "styled-components";

export const TextDiv = styled.div`
  text-align: center;
  font-weight: 600;

  p:first-child {
    font-size: ${(props) => (props.media.isPc === true ? "128px" : (props) => (props.media.isTablet === true ? "80px" : (props) => (props.media.isMobile === true ? "80px" : "80px")))};
  }
  p:nth-child(2) {
    font-size: ${(props) => (props.media.isPc === true ? "100px" : (props) => (props.media.isTablet === true ? "70px" : (props) => (props.media.isMobile === true ? "60px" : "60px")))};
  }
`;

export const ButtonDiv = styled.div`
  width: 225px;
  display: flex;
  justify-content: space-around;
  font-size: ${({ theme }) => theme.fontSize.large};

  margin: 0 auto;
  margin-top: 100px;
  & > span {
    font-family: Gothic A1;
    font-weight: 500;
    cursor: pointer;
  }
  & > div {
    width: 2px;
    height: ${({ theme }) => theme.fontSize.large};
    background-color: ${({ theme }) => theme.palette.white};
  }
  margin-bottom: 130px;
  pointer-events: all;
`;

export const Div = styled.div`
  color: ${({ theme }) => theme.palette.white};
  & > p {
    font-family: Ubuntu;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
