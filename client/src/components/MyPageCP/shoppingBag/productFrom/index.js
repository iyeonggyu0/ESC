import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';
import ShoppingBagProductOptionsFrom from '../productOptionsFrom';
import { ProductDiv } from './style';
import { useCallback, useEffect, useState } from 'react';
import { useDiscountDate } from '../../../../hooks/useDiscountDate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const ShoppingBagProductFrom = ({ state }) => {
  const navigate = useNavigate();
  const media = useMedia();

  const [discountData, setDiscountData] = useState(0);
  const [discountDataCheck, setDiscountDataCheck] = useDiscountDate(false);

  const discountDataCheckFun = useCallback(() => {
    if (state.product.ProductDiscount !== null) {
      setDiscountData(state.product.ProductDiscount.discountAmount);
      setDiscountDataCheck(state.product.ProductDiscount);
    }
  }, [state, setDiscountData, setDiscountDataCheck]);

  useEffect(() => {
    discountDataCheckFun();
  }, [state, discountDataCheckFun]);

  console.log(discountDataCheck);

  return (
    <ProductDiv
      media={media}
      productImg={`/img/product/${state.product.imgRoute}/${state.product.ProductImgs[0].img}`}
    >
      <div className="flexHeightCenter">
        <div>
          <input type="checkbox" />
        </div>
        <div className="flexHeightCenter">
          {media.isPc && <div>{/* 이미지 */}</div>}
          <span onClick={() => navigate(`/product/${state.product.id}`)}>
            {discountDataCheck && <FontAwesomeIcon icon={solid('tags')} className={'icon'} />}
            {state.product.name}{' '}
            {discountDataCheck && (
              <span className="spanInSpan">
                (-{String(discountData).replace(/\B(?=(\d{3})+(?!\d))/g, ',')})
              </span>
            )}
          </span>
        </div>
        <div>
          {state.options[0] &&
            state.options[0].option?.length === 0 &&
            String((state.product.price - discountData) * state.options[0].quantity).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ',',
            )}
          {state.options[0] &&
            state.options[0].option?.length === 0 &&
            state.options[0].quantity > 1 && (
              <p className="principal">
                ({String(state.product.price - discountData).replace(/\B(?=(\d{3})+(?!\d))/g, ',')})
              </p>
            )}
          {state.options[0] && state.options[0].option?.length > 0 && <span>-</span>}
        </div>
        <div>
          <p>
            {state.options[0] && state.options[0].option?.length === 0
              ? state.options[0].quantity
              : '-'}
          </p>
        </div>
      </div>
      {state.options[0] &&
        state.options[0].option?.length > 0 &&
        state.options.map((option, index) => (
          <ShoppingBagProductOptionsFrom
            option={option}
            key={index}
            state={state}
            discountDataCheck={discountDataCheck}
          />
        ))}
    </ProductDiv>
  );
};
export default ShoppingBagProductFrom;
