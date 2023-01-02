import { useNavigate } from "react-router-dom";
import { ProductDiv } from "./style";

const MainPageProduct = () => {
  const colorTheme = localStorage.getItem("theme");
  const navigate = useNavigate();
  return (
    <ProductDiv colorTheme={colorTheme}>
      <div>
        <p>상품이름</p>
        <p>용도</p>
        <div></div>
        <div onClick={() => navigate("/")}>
          <p>자세히 보기</p>
        </div>
      </div>
    </ProductDiv>
  );
};

export default MainPageProduct;
