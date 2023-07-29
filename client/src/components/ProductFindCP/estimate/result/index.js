import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../../App';

import { MainStyle } from './style';
import ProductFindHeader from '../../_common/header';
import EstimateResultInBox from '../resultInBox';
import { useDispatch } from 'react-redux';
import { shoppingBagPost } from '@reducer/productReducer';
import axios from 'axios';
import { axiosInstance } from '../../../../util/axios';

const EstimateResult = ({ productData, selectionList }) => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  const [productOrderList, setProductOrderList] = useState([{}, {}, {}, {}, {}]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const dispatch = useDispatch();

  const typeList = ['CASE', 'PCB', 'PLATE', 'SWITCH', 'KEYCAPS'];

  const addShoppingBag = useCallback(() => {
    if (productOrderList.some((item) => item && item.error === true)) {
      alert('필수 옵션을 선택하세요');
      return;
    }

    if (!userData) {
      return alert('로그인이 필요합니다');
    }

    productOrderList.map((state, idx) => {
      if (state === null) return;

      const data = {
        productId: productData[idx].find((product) => product.id === state),
        userEmail: userData.email,
        options: productOrderList[idx],
      };
      dispatch(shoppingBagPost({ data: data }));
    });
  }, [userData, productData, productOrderList, dispatch]);

  const buyButton = () => {
    if (!userData) {
      return alert('로그인이 필요합니다');
    }

    if (productOrderList.some((item) => item && item.error === true)) {
      alert('필수 옵션을 선택하세요');
      return;
    }

    // 총 할인
    let checkList = selectionList?.flatMap((state, idx) => {
      if (state === 0) {
        return;
      }
      const data = productData[idx].find((product) => product.id === state);

      const discount = data?.ProductDiscount?.discountAmount || 0;
      const options = productOrderList[idx]?.productOptionCheck;
      const quantity = productOrderList[idx]?.productQuantity;
      const objAmount = productOrderList[idx]?.productOptionCheck?.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
      return {
        amount: objAmount,
        discount,
        options,
        quantity,
        price: data.price,
        productId: data.id,
        userEmail: userData.email,
      };
    });

    checkList = checkList.filter((item) => item !== undefined);

    const amountOfPayment = checkList.reduce((acc, item) => {
      const num = (item.price + item.amount - item.discount) * item.quantity;
      return acc + num;
    }, 0);

    const data = {
      userEmail: userData.email,
      // 결제금액
      amountOfPayment: amountOfPayment < 100000 ? amountOfPayment + 3000 : amountOfPayment,
      productPrice: checkList.reduce((acc, item) => {
        return acc + item.price;
      }, 0),
      discount: checkList.reduce((acc, item) => {
        return acc + item.discount;
      }, 0),
      deliveryFee: amountOfPayment < 100000 ? 3000 : 0,
      purchaseProductInformation: checkList,
    };

    if (data) {
      axios
        .post(`${axiosInstance}api/product/payment/post`, data)
        .then((res) => {
          if (res.status === 200) {
            if (window.confirm(`구매되었습니다. (구매내역 보러 가기)`)) {
              return navigate('/mypage/orderList');
            } else {
              window.location.reload();
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const saveOrder = (data, idx) => {
    let newOrderData = [...productOrderList];
    newOrderData[idx] = data;
    setProductOrderList(newOrderData, idx);
  };

  useEffect(() => {
    console.log(productOrderList);
    let updateTotalAmount = 0;
    productOrderList.map((state) => {
      if (!state.productOptionCheck) {
        return;
      }
      if (state.productOptionCheck.length < 1) {
        return;
      }

      updateTotalAmount += state.productOptionCheck.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
    });
    setTotalAmount(updateTotalAmount);
  }, [productOrderList]);

  useEffect(() => {
    let orderListData = [{}, {}, {}, {}, {}];
    selectionList.map((state, idx) => {
      const data = productData[idx].find((product) => product.id === state);

      if (!data) {
        return (orderListData[idx] = null);
      }

      if (data.ProductOptions?.length > 0) {
        return (orderListData[idx] = { error: true, comment: '필수 옵션 선택 안함' });
      }

      // 새로운 객체를 생성하여 productOptionCheck와 productQuantity를 포함하여 productOrderList 배열의 뒤에 추가
      const newOrder = { productOptionCheck: [], productQuantity: 1 };
      orderListData[idx] = newOrder;
    });
    setProductOrderList(orderListData);

    let totalPrice = 0;
    let totalDiscount = 0;
    selectionList.map((state, idx) => {
      totalPrice += productData[idx].find((product) => product.id === state).price;
      if (productData[idx].find((product) => product.id === state).ProductDiscount) {
        totalDiscount += productData[idx].find((product) => product.id === state).ProductDiscount
          .discountAmount;
      } else {
        return;
      }
    });
    setTotalPrice(totalPrice);
    setTotalDiscount(totalDiscount);
  }, []);

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <ProductFindHeader Page={'result'} selectionList={selectionList} />
      <div>
        <p>선택한 상품</p>
        {selectionList && productData && (
          <div>
            {selectionList.map((state, idx) => (
              <div key={idx}>
                <p>{typeList[idx]}</p>
                {state !== 0 && (
                  <EstimateResultInBox
                    productOrderList={productOrderList}
                    saveOrder={saveOrder}
                    idx={idx}
                    productData={productData[idx].find((product) => product.id === state)}
                  />
                )}
                {state === 0 && (
                  <div className="flexCenter notSelectionStap">해당 단계를 건너뛰셨습니다.</div>
                )}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: '10vh' }}>
          <p>
            구매
            <span>10만 원 이상 구매 시 무료 배송</span>
          </p>
          <div className="flexCenter">
            <p>{(totalPrice + totalAmount).toLocaleString()}</p>
            {totalDiscount > 0 && <p className="specialSymbol">-</p>}
            {totalDiscount > 0 && (
              <p>
                <span className="deliveryFee">할인: </span>
                {totalDiscount.toLocaleString()}
              </p>
            )}
            <p className="specialSymbol">+</p>
            <p>
              <span className="deliveryFee">배송비: </span>
              {totalPrice - totalDiscount < 100000 ? '3,000' : '무료'}
            </p>
            <p className="specialSymbol"> = </p>
            <p>
              {(
                totalPrice -
                totalDiscount +
                totalAmount +
                (totalPrice - totalDiscount < 100000 ? 3000 : 0)
              ).toLocaleString()}
              원
            </p>
          </div>
          <div>
            <div className="flexCenter" onClick={addShoppingBag}>
              장바구니
            </div>
            <div className="flexCenter" onClick={buyButton}>
              구매
            </div>
          </div>
        </div>
      </div>
    </MainStyle>
  );
};
export default EstimateResult;
