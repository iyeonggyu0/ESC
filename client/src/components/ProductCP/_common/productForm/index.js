import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { MainStyle } from './style';

const ProductForm = ({ productData }) => {
  const media = useMedia();
  const navigate = useNavigate();

  const data = {
    id: productData.id,
    name: productData.name,
    price: productData.price,
    grade: productData.grade,
    img: productData.img === null ? '/img/product/notImg.png' : productData.img,
  };
  console.log(data.img);

  return (
    <MainStyle media={media} data={data}>
      <div>{/* img */}</div>
      <p>{data.name}</p>
      <div>
        <FontAwesomeIcon icon={solid('star')} />
        <FontAwesomeIcon icon={solid('star')} />
        <FontAwesomeIcon icon={solid('star')} />
        <FontAwesomeIcon icon={solid('star')} />
        <FontAwesomeIcon icon={solid('star')} />
        <FontAwesomeIcon icon={solid('star-half')} />
        {/* <span> 연결된 별점 리뷰의 수 </span> */}
      </div>
      <p>{data.price}</p>
    </MainStyle>
  );
};
export default ProductForm;
