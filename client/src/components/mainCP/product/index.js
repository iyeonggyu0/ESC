import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { ProductDiv } from './style';

const MainPageProductForm = ({ productData }) => {
  const colorTheme = useContext(ThemeContext).colorTheme;
  const navigate = useNavigate();

  const Data = {
    id: productData.id,
    name: productData.name,
    type: productData.type,
    img:
      productData.img === null || productData.img === '/null'
        ? '/img/product/notImg.png'
        : `"${productData.img}"`,
  };
  console.log(productData);

  const onClickHandler = useCallback(
    (e) => {
      e.preventDefault();
      localStorage.setItem('pageModLoc', '상세설명');
      navigate(`/product/${Data.id}`);
    },
    // eslint-disable-next-line
    [navigate],
  );

  return (
    <ProductDiv name={Data.name} colorTheme={colorTheme} img={Data.img}>
      <div>
        <div>
          <p>{Data.name}</p>
          <p>{Data.type}</p>
        </div>
        <div></div>
        <div onClick={onClickHandler}>
          <p>자세히 보기</p>
        </div>
      </div>
    </ProductDiv>
  );
};

export default MainPageProductForm;
