import { useCallback, useContext, useEffect, useState } from 'react';

import { MainDiv } from './style';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';
import { decrypt } from '@util/crypto';
import { useMedia } from '../../../hooks/useMedia';
import { ThemeContext } from '../../../App';
import CommonLoading from '../../_common/loading';
import OrderProductFrom from './orderProductFrom';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const navigate = useNavigate();

  const [orderList, setOrderList] = useState([]);
  const [productData, setProductData] = useState([]);
  const [orderListRoad, setOrderListRoad] = useState(true);

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/product/payment/get/${userData.email}`)
      .then((res) => {
        if (res.status === 200) {
          const decryptData = decrypt(res.data, process.env.REACT_APP_USER_KEY);
          setOrderList(decryptData.userPaymentData);
          setProductData(decryptData.promises);
          setOrderListRoad(true);
        } else {
          setOrderList(res.data);
          setOrderListRoad(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    setTimeout(() => {
      if (orderList.length === 0) {
        setOrderListRoad(false);
      }
    }, 3000);
    // eslint-disable-next-line
  }, []);

  const paymentConfirmedHandler = useCallback(
    (index) => {
      if (window.confirm(`상품 구매를 확정합니다.`)) {
        axios
          .post(`${axiosInstance}api/product/payment/confirmed`, {
            paymentId: orderList[index].id,
            userEmail: userData.email,
          })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              alert(res.data.message);
              if (res.status === 201) {
                setOrderList((prevArray) => {
                  const newArray = [...prevArray]; // 이전 배열을 새로운 배열로 복사
                  newArray[index].deliveryStatus = '구매확정'; // 특정 인덱스의 요소 수정
                  return newArray; // 새로운 배열 반환
                });
              }
            } else if (res.status === 402) {
              return alert(`${type} 접수 실패`);
            } else if (res.status === 403) {
              return alert(`${type} 접수 실패`);
            }
          })
          .catch((err) => console.error(err));
      }
    },
    // eslint-disable-next-line
    [index],
  );

  const orderCancelUpdate = (index, type) => {
    console.log(type);
    // console.log('실행');
    // console.log(orderList[index].deliveryStatus);
    // if (
    //   orderList[index].deliveryStatus !== '주문접수' ||
    //   orderList[index].deliveryStatus !== '상품 준비 중'
    // ) {
    //   return;
    // }

    if (window.confirm(`${type}하시겠습니까?`)) {
      axios
        .post(`${axiosInstance}api/product/payment/cancel`, {
          id: orderList[index].id,
          email: userData.email,
          type: type,
        })
        .then((res) => {
          if (res.status === 200) {
            const updatedProductData = [...productData];
            updatedProductData.splice(index, 1);
            const updatedOrderList = [...orderList];
            updatedOrderList.splice(index, 1);
            setProductData(updatedProductData);
            setOrderList(updatedOrderList);

            if (window.confirm(`${type} 접수됨 (취소 내역 보러가기)`)) {
              return navigate('/mypage/cancellationList');
            }
          } else if (res.status === 402) {
            return alert(`${type} 접수 실패`);
          } else if (res.status === 403) {
            return alert(`${type} 접수 실패`);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <MainDiv media={media} colorTheme={colorTheme}>
      <p>주문목록 / 배송조회</p>
      <div>
        <ul className="flexHeightCenter">
          <li>id</li>
          <li>구매정보</li>
          <li>결제금액</li>
          <li>배송상태</li>
          <li>버튼</li>
        </ul>
        <div>
          {orderListRoad && orderList.length === 0 && <CommonLoading />}
          {!orderListRoad && orderList.length === 0 && (
            <p
              style={{
                textAlign: 'center',
                padding: '30px 0',
                fontSize: '1rem',
                fontWeight: '300',
              }}
            >
              구매 이력이 없습니다.
            </p>
          )}
          {orderList.length > 0 &&
            orderList.map((state, index) => (
              <OrderProductFrom
                key={index}
                state={state}
                product={productData[index]}
                index={index}
                orderCancelUpdate={orderCancelUpdate}
                paymentConfirmedHandler={paymentConfirmedHandler}
              />
            ))}
        </div>
      </div>
    </MainDiv>
  );
};
export default OrderList;
