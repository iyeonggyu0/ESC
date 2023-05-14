import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';
import ShoppingBagProductOptionsFrom from '../productOptionsFrom';
import { ProductDiv } from './style';

const ShoppingBagProductFrom = ({ state }) => {
  const navigate = useNavigate();
  const media = useMedia();
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
          <span onClick={() => navigate(`/product/${state.product.id}`)}>{state.product.name}</span>
        </div>
        <div>
          {state.options[0] &&
            state.options[0].option?.length === 0 &&
            String(state.product.price * state.options[0].quantity).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ',',
            )}
          {state.options[0] &&
            state.options[0].option?.length === 0 &&
            state.options[0].quantity > 1 && (
              <p className="principal">
                ({String(state.product.price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')})
              </p>
            )}
          {state.options[0] && state.options[0].option?.length > 0 && <span>-</span>}
        </div>
        <div>
          {state.options[0] && state.options[0].option?.length === 0 && (
            <p>{state.options[0].quantity}</p>
          )}
          {state.options[0] && state.options[0].option?.length > 0 && <p>-</p>}
        </div>
      </div>
      {state.options[0] &&
        state.options[0].option?.length > 0 &&
        state.options.map((option, index) => (
          <ShoppingBagProductOptionsFrom option={option} key={index} state={state} />
        ))}
    </ProductDiv>
  );
};
export default ShoppingBagProductFrom;
