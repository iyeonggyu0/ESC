import { useContext, useEffect, useState } from 'react';

import { MainDiv } from './style';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';
import { decrypt } from '@util/crypto';
import { useMedia } from '../../../hooks/useMedia';
import { ThemeContext } from '../../../App';
import CommonLoading from '../../_common/loading';
import { useNavigate } from 'react-router-dom';
import CancelOrderProductFrom from './cancelOrderProductFrom';

const CancelOrderList = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const navigate = useNavigate();

  const [cancelOrderList, setCancelOrderList] = useState([]);
  const [cancelProductData, setCancelProductData] = useState([]);
  const [cancelOrderListRoad, setCancelOrderListRoad] = useState(true);

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/product/cancelPayment/get/${userData.email}`)
      .then((res) => {
        if (res.status === 200) {
          const decryptData = decrypt(res.data, process.env.REACT_APP_USER_KEY);
          console.log(decryptData);
          setCancelOrderList(decryptData.userCancelPaymentData);
          setCancelProductData(decryptData.promises);
          setCancelOrderListRoad(true);
        } else {
          setCancelOrderListRoad(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    setTimeout(() => {
      if (cancelOrderList.length === 0) {
        setCancelOrderListRoad(false);
      }
    }, 3000);
    // eslint-disable-next-line
  }, []);

  return (
    <MainDiv media={media} colorTheme={colorTheme}>
      <p>취소 / 반품 내역</p>
      <div>
        <ul className="flexHeightCenter">
          <li>구분</li>
          <li>구매정보</li>
          <li>결제금액</li>
          <li>환불 예정액</li>
          <li>처리상태</li>
          <li>버튼</li>
        </ul>
        <div>
          {cancelOrderListRoad && cancelOrderList.length === 0 && <CommonLoading />}
          {!cancelOrderListRoad && cancelOrderList.length === 0 && (
            <p
              style={{
                textAlign: 'center',
                padding: '30px 0',
                fontSize: '1rem',
                fontWeight: '300',
              }}
            >
              취소/반품 내역이 없습니다.
            </p>
          )}
          {cancelOrderList.length > 0 &&
            cancelOrderList
              .reverse()
              .map((state, index) => (
                <CancelOrderProductFrom
                  key={index}
                  state={state}
                  product={cancelProductData[index]}
                  index={index}
                />
              ))}
        </div>
      </div>
    </MainDiv>
  );
};
export default CancelOrderList;
