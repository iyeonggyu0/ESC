import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { MainStyle } from './style';

const ProductForm = ({ productData, productModifyMod }) => {
  const media = useMedia();
  const navigate = useNavigate();

  const data = {
    id: productData.id,
    name: productData.name,
    price: `${productData.price}`,
    grade: productData.grade,
    img: productData.img === '/null' ? '/img/product/notImg.png' : `"${productData.img}"`,
  };

  const nav = () => {
    if (productModifyMod) {
      window.open(process.env.LINK + `/product/modify/${data.id}`);
    }
    if (!productModifyMod) {
      navigate(`/product/${data.id}`);
    }
  };

  return (
    <MainStyle media={media} data={data} onClick={nav} productModifyMod={productModifyMod}>
      <div>
        <FontAwesomeIcon icon={solid('pen')} className={'icon'} />
      </div>

      <div>{/* img */}</div>
      <p>{data.name}</p>
      <div>
        {data.grade === 0 && <p>리뷰 없음</p>}
        {0 < data.grade && <FontAwesomeIcon icon={solid('star')} />}
        {2 <= data.grade && <FontAwesomeIcon icon={solid('star')} />}
        {3 <= data.grade && <FontAwesomeIcon icon={solid('star')} />}
        {4 <= data.grade && <FontAwesomeIcon icon={solid('star')} />}
        {5 <= data.grade && <FontAwesomeIcon icon={solid('star')} />}
        {/* <span> 연결된 별점 리뷰의 수 </span> */}
      </div>
      <p>{data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
    </MainStyle>
  );
};
export default ProductForm;
