import { useMedia } from '../../../../hooks/useMedia';
import { ProductOptionDiv } from './style';

const ShoppingBagProductOptionsFrom = ({ option, state, discountDataCheck }) => {
  const media = useMedia();
  return (
    <ProductOptionDiv media={media}>
      <div className="flexHeightCenter">
        <div>
          <input type="checkbox" />
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
