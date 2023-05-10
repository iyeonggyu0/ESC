import { ProductOptionDiv } from './style';

const ShoppingBagProductOptionsFrom = ({ option }) => {
  return (
    <ProductOptionDiv>
      <div className="flexHeightCenter">
        <div>
          <input type="checkbox" />
        </div>
        <div className="flexHeightCenter">
          <span>
            {option.option.map((detailedOptions, index) => (
              <p key={index}>
                {detailedOptions.optionName}: {detailedOptions.optionValue}
              </p>
            ))}
          </span>
        </div>
        <span>{option.quantity}</span>
      </div>
    </ProductOptionDiv>
  );
};
export default ShoppingBagProductOptionsFrom;
