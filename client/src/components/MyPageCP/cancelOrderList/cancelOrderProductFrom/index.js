import { useMedia } from '../../../../hooks/useMedia';
import { MainDiv } from './style';

const CancelOrderProductFrom = ({ state, product, index }) => {
  const dateObject = new Date(state.createdAt);
  const dateText = `${dateObject.getFullYear()}년 ${
    dateObject.getMonth() + 1
  }월 ${dateObject.getDate()}일`;
  console.log(state);
  const media = useMedia();
  return (
    <MainDiv media={media} className="flexHeightCenter">
      <div>{state.cancelType}</div>
      <div className="flexWidthCenter">
        <p>{product.name}</p>
        <p>
          <span>(외 {state?.paymentData?.purchaseProductInformation.length}개) </span>
          취소일: {dateText}
        </p>
      </div>
      <div>{state.paymentData?.amountOfPayment.toLocaleString()}원</div>
      <div>
        {(
          state.paymentData?.amountOfPayment -
          state.paymentData?.deliveryFee -
          (state.cancelType === '반품' ? 3000 : 0)
        ).toLocaleString()}
        원
      </div>
      <div className="flexWidthCenter">
        <p>{state.processStep}</p>
      </div>
      <div className="flexWidthCenter">
        {!state.clearStep && state.processStep !== '상품 회수 중' && <span>철회</span>}
      </div>
    </MainDiv>
  );
};
export default CancelOrderProductFrom;
