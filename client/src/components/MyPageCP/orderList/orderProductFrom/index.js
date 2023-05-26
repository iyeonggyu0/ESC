import { useMedia } from '../../../../hooks/useMedia';
import { MainDiv } from './style';

const OrderProductFrom = ({ state, product }) => {
  // console.log(state);
  // console.log(product);
  const media = useMedia();
  return (
    <MainDiv media={media} className="flexHeightCenter">
      <div>{state.id}</div>
      <div>
        <p>
          {product.name} <span>(외 {state?.purchaseProductInformation.length}개)</span>
        </p>
        <p>{state.updatedAt}</p>
      </div>
      <div>{state.amountOfPayment.toLocaleString()}원</div>
      <div className="flexWidthCenter">
        <p>{state.deliveryStatus}</p>
        {state.deliveryStatus !== '주문접수' && <span>{state.invoiceNumber}</span>}
      </div>
      <div className="flexWidthCenter">
        {state.deliveryStatus === '배송중' && <span>배송조회</span>}
        {(state.deliveryStatus === '주문접수' || state.deliveryStatus === '상품 준비중') && (
          <span>주문취소</span>
        )}
        {state.deliveryStatus === '배송완료' && <span>반품/취소</span>}
      </div>
    </MainDiv>
  );
};
export default OrderProductFrom;
