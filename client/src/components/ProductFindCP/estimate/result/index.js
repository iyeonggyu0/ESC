import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';
import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from '../../../../App';

import { MainStyle } from './style';
import ProductFindHeader from '../../_common/header';
import EstimateResultInBox from '../resultInBox';
import { useDispatch } from 'react-redux';
import { shoppingBagPost } from '@reducer/productReducer';

const EstimateResult = ({ productData, selectionList }) => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  const [productOrderList, setProductOrderList] = useState([]);

  const dispatch = useDispatch();

  const typeList = ['CASE', 'PCB', 'PLATE', 'SWITCH', 'KEYCAPS'];

  console.log(productOrderList);
  const addShoppingBag = useCallback(() => {
    if (productOrderList?.length === 0) {
      return alert('옵션을 선택후 확정 버튼을 누르세요');
    }
    if (!userData) {
      return alert('로그인이 필요합니다');
    }

    const data = {
      productId: productData.id,
      userEmail: userData.email,
      options: productOrderList,
    };
    dispatch(shoppingBagPost({ data: data }));
  }, [userData, productData, productOrderList, dispatch]);

  const buyButton = () => {
    if (!productOrderList) {
      alert('상품을 선택해주세요');
      return;
    }

    // 총 할인
    const discount = productData?.ProductDiscount?.discountAmount || 0;

    const checkList = productOrderList?.map((obj) => {
      const options = obj.productOptionCheck;
      const quantity = obj.productQuantity;
      const objAmount = obj.productOptionCheck.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
      return {
        amount: objAmount,
        discount,
        options,
        quantity,
        price: productData.price,
        productId: productData.id,
        userEmail: userData.email,
      };
    });
    console.log(checkList);

    const amountOfPayment = checkList.reduce((acc, item) => {
      const num = (item.price + item.amount - item.discount) * item.quantity;
      return acc + num;
    }, 0);

    const data = {
      userEmail: userData.email,
      // 결제금액
      amountOfPayment: amountOfPayment < 100000 ? amountOfPayment + 3000 : amountOfPayment,
      productPrice: productData.price,
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

  const saveOrder = (data) => {
    setProductOrderList(data);
  };

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
      </div>
    </MainStyle>
  );
};
export default EstimateResult;
