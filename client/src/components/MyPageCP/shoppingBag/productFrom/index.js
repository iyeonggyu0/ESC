import ShoppingBagProductOptionsFrom from '../productOptionsFrom';
import { ProductDiv } from './style';

const ShoppingBagProductFrom = ({ state }) => {
  return (
    <ProductDiv
      productImg={`/img/product/${state.product.imgRoute}/${state.product.ProductImgs[0].img}`}
    >
      <div className="flexHeightCenter">
        <div>선택</div>
        <div className="flexHeightCenter">
          <div>{/* 이미지 */}</div>
          <span>{state.product.name}</span>
        </div>
        <span>
          {state.options[0] && state.options[0].option?.length === 0 && (
            <span>{state.options[0].quantity}</span>
          )}
          {state.options[0] && state.options[0].option?.length > 0 && <span>-</span>}
        </span>
      </div>
      {state.options[0] &&
        state.options[0].option?.length > 0 &&
        state.options.map((option, index) => (
          <ShoppingBagProductOptionsFrom option={option} key={index} />
        ))}
    </ProductDiv>
  );
};
export default ShoppingBagProductFrom;
