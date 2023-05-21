import { useEffect } from 'react';
import { useMedia } from '../../../../hooks/useMedia';
import { ProductOptionDiv } from './style';
import { useContext } from 'react';
import { ThemeContext } from '../../../../App';
import { useState } from 'react';
import { useCallback } from 'react';

const ShoppingBagProductOptionsFrom = ({
  option,
  state,
  discountDataCheck,
  checkList,
  deleteOptionHandler,
  postProductHandler,
  discountData,
}) => {
  const media = useMedia();
  const userData = useContext(ThemeContext).userInfo.userData;
  const [checkBox, setCheckBox] = useState(true);

  const checkOption = useCallback(() => {
    if (checkList) {
      const foundItem = checkList.find((item) => item.shoppingBagId === option.shoppingBagId);
      const isChecked = !!foundItem;
      setCheckBox(isChecked);
      const checkbox = document.getElementById(`${option.shoppingBagId}`);
      checkbox.checked = isChecked;
    } else {
      setCheckBox(false);
    }
  }, [option, setCheckBox, checkList]);

  useEffect(() => {
    checkOption();
  }, [checkList, checkOption]);

  const handleCheckboxChange = () => {
    setCheckBox(checkBox ? false : true);

    if (checkBox) {
      deleteOptionHandler(option.shoppingBagId);
      console.log('체크 해제');
    } else {
      postProductHandler([
        {
          productId: state.product.id,
          userEmail: userData.email,
          quantity: option.quantity,
          price: state.product.price,
          amount: option.option.reduce((acc, amount) => acc + amount.amount, 0),
          discount: discountData,
          options: option.option,
          shoppingBagId: option.shoppingBagId,
        },
      ]);
      console.log('체크');
    }
  };
  return (
    <ProductOptionDiv media={media}>
      <div className="flexHeightCenter">
        <div>
          <input type="checkbox" id={option.shoppingBagId} onChange={handleCheckboxChange} />
        </div>
        <div className="flexHeightCenter">
          <span>
            {option.option.map((detailedOptions, index) => (
              <p key={index}>
                {detailedOptions.optionName}: {detailedOptions.optionValue}
                {detailedOptions.amount > 0 && (
                  <span>
                    ( + {String(detailedOptions.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} )
                  </span>
                )}
              </p>
            ))}
          </span>
        </div>
        <div>
          <p>
            {!discountDataCheck &&
              String(
                (state.product.price +
                  option.option?.reduce((total, item) => {
                    return total + item.amount;
                  }, 0)) *
                  option.quantity,
              ).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {discountDataCheck &&
              String(
                (state.product.price +
                  option.option?.reduce((total, item) => {
                    return total + item.amount;
                  }, 0) -
                  state.product?.ProductDiscount?.discountAmount) *
                  option.quantity,
              ).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          {option.quantity !== 1 && (
            <p>
              (
              {discountDataCheck &&
                String(
                  state.product.price +
                    option.option?.reduce((total, item) => {
                      return total + item.amount;
                    }, 0) -
                    state.product?.ProductDiscount?.discountAmount,
                ).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              {!discountDataCheck &&
                String(
                  state.product.price +
                    option.option?.reduce((total, item) => {
                      return total + item.amount;
                    }, 0),
                ).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              )
            </p>
          )}
        </div>
        <span>{option.quantity}</span>
      </div>
    </ProductOptionDiv>
  );
};
export default ShoppingBagProductOptionsFrom;
