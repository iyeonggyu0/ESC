import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../App";
import { useMedia } from "../../../hooks/useMedia";
import { Div, TextDiv, ButtonDiv } from "./style";

const BannerText = () => {
  const media = useMedia();
  const colorTheme = localStorage.getItem("theme");
  const toggleTheme = useContext(ThemeContext);

  const navigate = useNavigate();

  return (
    <Div colorTheme={colorTheme}>
      {colorTheme === "game" && (
        <TextDiv media={media}>
          <p>GAMING</p>
          <p>KEYBOARD</p>
        </TextDiv>
      )}
      {colorTheme === "basic" && (
        <TextDiv media={media}>
          <p>BASIC</p>
          <p>KEYBOARD</p>
        </TextDiv>
      )}

      <ButtonDiv>
        <span onClick={() => toggleTheme.toggleTheme()}>테마변경</span>
        <div></div>
        <span onClick={() => navigate("/")}>견적내기</span>
      </ButtonDiv>
    </Div>
  );
};
export default BannerText;
