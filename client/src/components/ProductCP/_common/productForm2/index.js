import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { MainStyle, MainStyleDiv } from './style';
import { useEffect, useState } from 'react';
import { useDiscountDate } from '../../../../hooks/useDiscountDate';

const ProductBigSizeForm = ({ productData, productModifyMod }) => {
  const media = useMedia();
  const navigate = useNavigate();

  const [discountData, setDiscountData] = useState();
  const [discountDataCheck, setDiscountDataCheck] = useDiscountDate();

  useEffect(() => {
    if (productData.ProductDiscount !== null) {
      setDiscountData(productData.ProductDiscount);
      setDiscountDataCheck(productData.ProductDiscount);
    }
    // eslint-disable-next-line
  }, []);

  const data = {
    id: productData.id,
    name: productData.name,
    price: `${productData.price}`,
    grade: productData.grade,
    img:
      productData.img === null || productData.img === '/null'
        ? '/img/product/notImg.png'
        : `"${productData.img}"`,
  };

  const nav = () => {
    localStorage.setItem('pageModLoc', '상세설명');
    if (productModifyMod) {
      window.open(`/product/modify/${data.id}`);
    }
    if (!productModifyMod) {
      navigate(`/product/${data.id}`);
    }
  };

  return (
    <MainStyleDiv media={media}>
      <MainStyle media={media} data={data} onClick={nav} productModifyMod={productModifyMod}>
        <div>
          <FontAwesomeIcon icon={solid('pen')} className={'icon'} />
        </div>
        <div>{/* img */}</div>
      </MainStyle>
      <p>{data.name}</p>
      <p>
        {!discountDataCheck && <span>{data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>}
        {discountDataCheck && (
          <span className="text">{data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
        )}
        {discountDataCheck && (
          <span>
            {(data.price - discountData.discountAmount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
            <FontAwesomeIcon icon={solid('tags')} className={'icon'} />
          </span>
        )}
      </p>
    </MainStyleDiv>
  );
};
export default ProductBigSizeForm;
