import { useMedia } from '../../../hooks/useMedia';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../App';

import { MainStyle } from './style';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';
import { decrypt } from '@util/crypto';
import ShoppingBagProductFrom from './productFrom';
import CommonLoading from '../../_common/loading';

const ShoppingBagMain = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  const [shoppingBagList, setShoppingBagList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [shoppingBagListRoad, setCheckListRoad] = useState(true);

  // 구매하기 버튼
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/user/get/shoppingBag/${userData.email}`)
      .then((res) => {
        const decryptData = decrypt(res.data, process.env.REACT_APP_USER_KEY);
        console.log(decryptData);
        setShoppingBagList(decryptData);
        setCheckListRoad(true);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  const deleteProductHandler = (productId) => {
    const updatedCheckList = checkList.filter((item) => item.productId !== productId);
    setCheckList(updatedCheckList);
  };

  const deleteOptionHandler = (shoppingBagId) => {
    const updatedCheckList = checkList.filter((item) => item.shoppingBagId !== shoppingBagId);
    setCheckList(updatedCheckList);
  };

  const postProductHandler = (data) => {
    setCheckList((state) => [...state, ...data]);
  };

  // 삭제
  const deleteShoppingBagHandler = () => {
    const deleteRequests = checkList.map((state) =>
      axios.delete(
        `${axiosInstance}api/user/delete/shoppingBag/${state.shoppingBagId}/${state.productId}`,
      ),
    );

    Promise.all(deleteRequests)
      .then(() => {
        // 모든 삭제 요청이 완료된 후에 실행되는 코드
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log('checkList');
  console.log(checkList);

  console.log('shoppingBagList');
  console.log(shoppingBagList);

  useEffect(() => {
    setTimeout(() => {
      if (checkList.length === 0) {
        setCheckListRoad(false);
      }
    }, 3000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const totalPrice = checkList.reduce(
      (acc, obj) => acc + (obj.price + obj.amount) * obj.quantity,
      0,
    );
    const totalDiscount = checkList.reduce((acc, obj) => acc + obj.discount * obj.quantity, 0);
    const deliveryFee = totalPrice - totalDiscount < 100000 ? 3000 : 0;
    const finalPrice = totalPrice - totalDiscount + deliveryFee;

    setTotalPrice(totalPrice);
    setTotalDiscount(totalDiscount);
    setDeliveryFee(deliveryFee);
    setFinalPrice(finalPrice);
  }, [checkList]);

  const buyButton = () => {
    if (checkList) {
      const data = {
        userEmail: userData.email,
        amountOfPayment: finalPrice,
        productPrice: totalPrice,
        discount: totalDiscount,
        deliveryFee: deliveryFee,
        purchaseProductInformation: checkList,
        shoppingBagId: checkList.map((state) => state.shoppingBagId),
      };

      console.log(data);
      axios
        .post(`${axiosInstance}api/product/payment/post`, data)
        .then((res) => {
          if (res.status === 200) {
            if (!alert('구매되었습니다.')) {
              window.location.reload();
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert('상품을 선택해주세요');
    }
  };

  console.log(shoppingBagListRoad);

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <p>장바구니</p>
      <div>
        <span onClick={deleteShoppingBagHandler}>삭제</span>
      </div>
      <div>
        <ul className="flexHeightCenter">
          <li>선택</li>
          <li>상품/옵션 정보</li>
          <li>가격</li>
          <li>수량</li>
        </ul>
        <div>
          {shoppingBagListRoad && shoppingBagList.length === 0 && <CommonLoading />}
          {!shoppingBagListRoad && shoppingBagList.length === 0 && (
            <p
              style={{
                textAlign: 'center',
                padding: '30px 0',
                fontSize: '1rem',
                fontWeight: '300',
              }}
            >
              장바구니가 비었습니다.
            </p>
          )}
          {shoppingBagList.length > 0 &&
            shoppingBagList.map((state, index) => (
              <ShoppingBagProductFrom
                key={index}
                state={state}
                checkList={checkList}
                deleteProductHandler={deleteProductHandler}
                postProductHandler={postProductHandler}
                deleteOptionHandler={deleteOptionHandler}
              />
            ))}
        </div>
      </div>
      {shoppingBagList.length > 0 && (
        <div style={{ marginTop: '10vh' }}>
          <p>
            구매
            <span>10만 원 이상 구매 시 무료 배송</span>
          </p>
          {checkList.length === 0 && <div className="flexCenter">상품을 선택하세요</div>}
          {checkList.length > 0 && (
            <div className="flexCenter">
              <p>{totalPrice.toLocaleString()}</p>
              {totalDiscount > 0 && <p className="specialSymbol">-</p>}
              {totalDiscount > 0 && <p>{totalDiscount.toLocaleString()}</p>}
              <p className="specialSymbol">+</p>
              <p>
                {deliveryFee === 3000 ? '3,000' : '무료'}
                <span className="deliveryFee">(배송비)</span>
              </p>
              <p className="specialSymbol"> = </p>
              <p>{finalPrice.toLocaleString()}</p>
            </div>
          )}
          {checkList.length > 0 && (
            <div
              className="flexCenter"
              style={{
                width: '20%',
                height: '50px',
                backgroundColor: 'black',
                color: 'white',
                position: 'absolute',
                bottom: '0',
                right: '0',
                cursor: 'pointer',
              }}
              onClick={buyButton}
            >
              결제하기
            </div>
          )}
        </div>
      )}
    </MainStyle>
  );
};
export default ShoppingBagMain;
