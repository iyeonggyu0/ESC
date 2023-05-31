import { useMedia } from '../../../../hooks/useMedia';
import { MainDiv } from './style';

const OrderProductFrom = ({ state, product, index, orderCancelUpdate }) => {
  const dateObject = new Date(state.createdAt);
  const dateText = `${dateObject.getFullYear()}년 ${
    dateObject.getMonth() + 1
  }월 ${dateObject.getDate()}일`;
  console.log(state);
  const media = useMedia();
  return (
    <MainDiv media={media} className="flexHeightCenter">
      <div>{state.id}</div>
      <div>
        <p>
          {product.name}{' '}
          {state?.purchaseProductInformation.length - 1 > 0 && (
            <span>(외 {state?.purchaseProductInformation.length - 1}개)</span>
          )}
        </p>
        <p>{dateText}</p>
      </div>
      <div>{state.amountOfPayment.toLocaleString()}원</div>
      <div className="flexWidthCenter">
        <p>{state.deliveryStatus}</p>
        {state.deliveryStatus !== '주문접수' ||
          (state.deliveryStatus !== '상품 준비 중' && <span>{state.invoiceNumber}</span>)}
      </div>
      <div className="flexWidthCenter">
        {state.deliveryStatus === '배송중' && <span>배송조회</span>}
        {(state.deliveryStatus === '주문접수' || state.deliveryStatus === '상품 준비 중') && (
          <span onClick={() => orderCancelUpdate(index, '취소')}>주문취소</span>
        )}
        {state.deliveryStatus === '배송완료' && <span>반품</span>}
      </div>
    </MainDiv>
  );
};
export default OrderProductFrom;
