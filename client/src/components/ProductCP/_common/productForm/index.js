import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { MainStyle } from './style';
import { useEffect, useState } from 'react';
import { useDiscountDate } from '../../../../hooks/useDiscountDate';

const ProductForm = ({ productData, productModifyMod }) => {
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
    price: productData.price,
    grade: productData.grade,
    imgRoute: productData.imgRoute,
    img: productData?.ProductImgs?.find((obj) => obj.type === 'main').img,
  };

  const nav = () => {
    localStorage.setItem('pageModLoc', '상세설명');
    if (productModifyMod) {
      window.open(`/product/modify/${data.id}`);
      localStorage.setItem('route', null);
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
      {discountDataCheck && (
        <p className="discount">
          -{discountData.discountAmount}
          <FontAwesomeIcon icon={solid('tags')} className={'icon'} />
        </p>
      )}
      <p>
        {discountDataCheck &&
          (data.price - discountData.discountAmount)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        {!discountDataCheck && data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
      </p>
    </MainStyle>
  );
};
export default ProductForm;
