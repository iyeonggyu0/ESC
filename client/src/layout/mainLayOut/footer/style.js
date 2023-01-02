import styled from "styled-components";

export const Footer = styled.footer`
  width: 100%;
  height: 290px;
  background-color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameStroke : ({ theme }) => theme.palette.basicBg)};

  border-top: ${(props) => (props.colorTheme === "basic" ? "1px" : "0px")} solid ${({ theme }) => theme.palette.basicStroke};

  /* Font */
  /* font-size: ${({ theme }) => theme.fontSize.mediumLarge}; */
  color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameFont : ({ theme }) => theme.palette.basicStroke)};
`;

export const Title = styled.div`
  width: 75vw;
  height: 80px;
  margin: 0 auto;
  position: relative;
  font-family: "Ubuntu", sans-serif;
  display: flex;
  justify-content: start;
  align-items: flex-end;
  padding-bottom: 14px;
  border-bottom: 1px solid ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameLightStroke : ({ theme }) => theme.palette.basicBg)};

  font-size: ${({ theme }) => theme.fontSize.xxxxLarge};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const FooterDiv = styled.div`
  width: 75vw;
  margin: 0 auto;
  margin-top: 20px;
  font-family: Gothic A1;
  position: relative;
  display: flex;
  flex-wrap: wrap;

  div:first-child > p:first-child {
    font-size: ${({ theme }) => theme.fontSize.xLarge};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  div:first-child > p:nth-child(2) {
    font-size: ${({ theme }) => theme.fontSize.medium};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    line-height: ${({ theme }) => theme.lineHeight.xxLarge};
    padding-top: 15px;
  }
`;

export const IconDiv = styled.div`
  width: 90px;
  height: 55px;
  position: absolute;
  right: 0;
  bottom: 0px;

  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  line-height: ${({ theme }) => theme.lineHeight.small};

  span {
    font-size: ${({ theme }) => theme.fontSize.medium};
    color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameFont : ({ theme }) => theme.palette.basicStroke)};
  }

  .icon {
    font-size: ${({ theme }) => theme.fontSize.large};
    color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameFont : ({ theme }) => theme.palette.basicStroke)};
    padding-right: 10px;
  }

  .instagram {
    padding-left: 1px;
  }
`;

export const MobileFooter = styled.footer`
  z-index: 0;
  width: 100vw;
  height: 350px;
  background-color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameStroke : ({ theme }) => theme.palette.basicBg)};

  /* Font */
  /* font-size: ${({ theme }) => theme.fontSize.mediumLarge}; */
  color: ${(props) => (props.colorTheme === "game" ? ({ theme }) => theme.palette.gameFont : ({ theme }) => theme.palette.basicStroke)};
  ${Title} {
    padding-bottom: 0px;
  }

  ${IconDiv} {
    width: 100%;
    height: auto;
    position: relative;
    padding-top: 15px;
    span {
      padding-right: 30px;
    }
  }
`;
