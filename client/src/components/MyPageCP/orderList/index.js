import { useContext, useEffect, useState } from 'react';

import { MainDiv } from './style';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';
import { decrypt } from '@util/crypto';
import { useMedia } from '../../../hooks/useMedia';
import { ThemeContext } from '../../../App';
import CommonLoading from '../../_common/loading';
import OrderProductFrom from './orderProductFrom';

const OrderList = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  const [orderList, setOrderList] = useState([]);
  const [orderListRoad, setOrderListRoad] = useState(true);

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/product/payment/get/${userData.email}`)
      .then((res) => {
        if (res.status === 200) {
          const decryptData = decrypt(res.data, process.env.REACT_APP_USER_KEY);
          console.log(decryptData);
          setOrderList(decryptData);
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
            orderList.map((state, index) => <OrderProductFrom key={index} state={state} />)}
        </div>
      </div>
    </MainDiv>
  );
};
export default OrderList;
