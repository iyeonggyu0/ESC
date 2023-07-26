import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';
import { MainStyle } from './style';
import { useContext } from 'react';
import { ThemeContext } from '../../../../App';

const EstimateResultInBox = ({ productData }) => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;

  console.log(productData);

  return (
    <MainStyle media={media} colorTheme={colorTheme} className="flexHeightCenter">
      <img
        src={`/img/product/${productData.imgRoute}/${
          productData.ProductImgs.find((item) => item.type === 'main')?.img
        }`}
        loading="lazy"
      />
      <div>
        <p>{productData.name}</p>
      </div>
    </MainStyle>
  );
};
export default EstimateResultInBox;
