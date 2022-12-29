import styled from "styled-components";

export const Header = styled.header`
  /* width: 1640px; */
  width: 100vw;
  height: 70px;

  font-size: ${({ theme }) => theme.fontSize.mediumLarge};
  font-family: "Ubuntu", sans-serif;

  border: 1px solid black;
`;

export const HeaderSection = styled.section`
  width: 1640px;
  height: 70px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;

  border: 1px solid black;
`;

export const Logo = styled.div`
  width: 100px;
  height: 40px;
  background-image: ${(props) => (props.colorTheme === "gmae" ? "url(/img/logo_game.png)" : "url(/img/logo_basic.png)")};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;

  border: 1px solid black;
`;

export const Ul = styled.ul`
  li {
    float: left;
  }
`;

export const SectionUl = styled.section``;
