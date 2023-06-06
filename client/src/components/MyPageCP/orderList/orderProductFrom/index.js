import { useContext, useEffect, useState } from 'react';
import { useMedia } from '../../../../hooks/useMedia';
import { MainDiv } from './style';
import { ThemeContext } from '../../../../App';
import axios from 'axios';
import { axiosInstance } from '../../../../util/axios';
import { useNavigate } from 'react-router-dom';

const OrderProductFrom = ({
  state,
  product,
  index,
  orderCancelUpdate,
  paymentConfirmedHandler,
}) => {
  const userData = useContext(ThemeContext).userInfo.userData;
  const dateObject = new Date(state.createdAt);
  const dateText = `${dateObject.getFullYear()}년 ${
    dateObject.getMonth() + 1
  }월 ${dateObject.getDate()}일`;
  console.log(state);
  const media = useMedia();
  const navigate = useNavigate();

  const [deliveryCompleted, setDeliveryCompleted] = useState(state.deliveryStatus);

  useEffect(() => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const updatedAtDate = new Date(state.updatedAt);
    const isTwoDaysPassed = updatedAtDate < twoDaysAgo;

    if (isTwoDaysPassed) {
      if (deliveryCompleted === '배송중') {
        deliveryStatusUpdata();
      }
    }
    // eslint-disable-next-line
  }, [state, userData]);

  const deliveryStatusUpdata = () => {
    axios
      .put(`${axiosInstance}api/product/payment/deliveryCompleted`, { paymentId: state.id })
      .then((res) => {
        if (res.status === 200) {
          setDeliveryCompleted('배송완료');
        } else {
          console.error(res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const leaveReview = () => {
    localStorage.setItem('pageModLoc', '구매후기');
    navigate(`/product/${state.id}`);
  };

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
        <p>{deliveryCompleted}</p>
      </div>
      <div className="flexWidthCenter">
        {deliveryCompleted === '배송중' && <span>배송조회</span>}
        {(deliveryCompleted === '주문접수' || deliveryCompleted === '상품 준비 중') && (
          <span onClick={() => orderCancelUpdate(index, '취소')}>주문취소</span>
        )}
        {userData.authority === 'admin' && deliveryCompleted === '배송중' && (
          <span onClick={deliveryStatusUpdata}>배송완료</span>
        )}
        {deliveryCompleted === '배송완료' && (
          <span onClick={() => paymentConfirmedHandler(index)}>구매확정</span>
        )}
        {deliveryCompleted === '배송완료' && (
          <span onClick={() => orderCancelUpdate(index, '반품')}>반품</span>
        )}
        {deliveryCompleted === '구매확정' && <span onClick={leaveReview}>리뷰 남기기</span>}
      </div>
    </MainDiv>
  );
};
export default OrderProductFrom;
