import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';
import ShoppingBagProductOptionsFrom from '../productOptionsFrom';
import { ProductDiv } from './style';
import { useCallback, useEffect, useState } from 'react';
import { useDiscountDate } from '../../../../hooks/useDiscountDate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useContext } from 'react';
import { ThemeContext } from '../../../../App';

const ShoppingBagProductFrom = ({
  state,
  checkList,
  deleteProductHandler,
  postProductHandler,
  deleteOptionHandler,
}) => {
  const navigate = useNavigate();
  const media = useMedia();
  const userData = useContext(ThemeContext).userInfo.userData;

  const [discountData, setDiscountData] = useState(0);
  const [discountDataCheck, setDiscountDataCheck] = useDiscountDate(false);
  const [checkBox, setCheckBox] = useState(true);

  const discountDataCheckFun = useCallback(() => {
    if (state.product.ProductDiscount !== null) {
      setDiscountData(state.product.ProductDiscount.discountAmount);
      setDiscountDataCheck(state.product.ProductDiscount);
    }
  }, [state, setDiscountData, setDiscountDataCheck]);

  useEffect(() => {
    discountDataCheckFun();
  }, [state, discountDataCheckFun]);

  useEffect(() => {
    if (checkList) {
      const shoppingBagIds = state.options.map((option) => option.shoppingBagId);
      const checkBoxTf = shoppingBagIds.every((id) =>
        checkList.some((item) => item.shoppingBagId === id),
      );
      setCheckBox(checkBoxTf);
    } else {
      setCheckBox(false);
    }
    // eslint-disable-next-line
  }, [checkList]);

  console.log(state);

  const handleCheckboxChange = () => {
    setCheckBox(checkBox ? false : true);

    if (checkBox) {
      deleteProductHandler(state.product.id);
    } else {
      postProductHandler(
        state.options.flatMap((option) => {
          return {
            productId: state.product.id,
            userEmail: userData.email,
            quantity: option.quantity,
            price: state.product.price,
            amount: option.option.reduce((acc, obj) => acc + obj.amount, 0),
            discount: discountData,
            options: option.option,
            shoppingBagId: option.shoppingBagId,
          };
        }),
      );
    }
  };

  return (
    <ProductDiv
      media={media}
      productImg={`/img/product/${state.product.imgRoute}/${state.product.ProductImgs[0].img}`}
    >
      <div className="flexHeightCenter">
        <div>
          <input
            type="checkbox"
            id={state.product.id}
            onChange={handleCheckboxChange}
            checked={checkBox}
          />
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
            checkList={checkList}
            deleteOptionHandler={deleteOptionHandler}
            postProductHandler={postProductHandler}
            discountData={discountData}
          />
        ))}
    </ProductDiv>
  );
};
export default ShoppingBagProductFrom;
