import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productGetData } from '@reducer/productReducer';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { MainStyle, ProductFormDiv, PaginationBox } from './style';
import { ThemeContext } from '../../../../App.js';
import CommonLoading from '../../../_common/loading';
import { decrypt } from '@util/crypto';
import Pagination from 'react-js-pagination';
import theme from '@style/theme.js';
import { useMedia } from '../../../../hooks/useMedia';
import axios from 'axios';
import { axiosInstance } from '../../../../util/axios';
import OrderAdminFrom from './orderFrom';

const OrderListAdmin = () => {
  const media = useMedia();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;

  const [sortFocus, setSortFocus] = useState(false);
  const [sort, setSort] = useState('기본');

  const [orderList, setOrderList] = useState([]);
  const [orderListRoad, setOrderListRoad] = useState('');

  const [checkList, setCheckList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log('체크리스트');
    console.log(checkList);
  }, [checkList]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setCheckList(orderList.map((item) => item.id));
    } else {
      setCheckList([]);
    }
  };

  const handleCheckboxClick = (id) => {
    const data = [...checkList, id];
    setCheckList(data);
    handleCheckAll(data.length);
  };

  const removeItemByIndex = (idx) => {
    const updatedList = [...checkList];
    const index = updatedList.indexOf(idx);
    if (index !== -1) {
      updatedList.splice(index, 1);
    }
    setCheckList(updatedList);
    handleCheckAll(updatedList.length);
  };

  const handleCheckAll = (lengths) => {
    if (lengths === orderList.length) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/product/admin/payment/get/${sort}`)
      .then((res) => {
        if (res.status === 200) {
          const decryptData = decrypt(res.data, process.env.REACT_APP_USER_KEY);
          console.log(decryptData);
          setOrderList(decryptData);
        } else {
          console.log(res);
          setOrderListRoad(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // eslint-disable-next-line
  }, []);

  const axiosFun = (data) => {
    console.log(data);
    axios
      .put(`${axiosInstance}api/product/admin/payment/put`, data)
      .then((res) => {
        if (res.status === 200) {
          alert(`${res.data.message}`);
          reLodeProduct();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const reLodeProduct = () => {
    setOrderListRoad('');
    axios
      .get(`${axiosInstance}api/product/admin/payment/get/${sort}`)
      .then((res) => {
        if (res.status === 200) {
          const decryptData = decrypt(res.data, process.env.REACT_APP_USER_KEY);
          console.log(decryptData);
          setOrderList(decryptData);
        } else {
          console.log(res);
          setOrderListRoad(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  };

  const editChecklistStatus = (mode) => {
    if (checkList.length === 0) {
      return alert('체크된 항목이 없습니다.');
    }

    if (!window.confirm(`${checkList}번 상품 총 ${checkList.length}개를 수정합니다.`)) {
      return;
    }

    const data = {
      status: `${mode}`,
      paymentId: checkList,
    };
    axiosFun(data);
  };

  return (
    <MainStyle colorTheme={colorTheme} media={media}>
      <p>주문 목록</p>
      <div>
        {/* 정렬 */}
        <div onClick={() => setSortFocus(sortFocus ? false : true)}>
          <div className="flexCenter">
            {sort}
            {sortFocus && media.isPc && (
              <FontAwesomeIcon icon={solid('chevron-up')} className={'icon'} />
            )}
            {!sortFocus && media.isPc && (
              <FontAwesomeIcon icon={solid('chevron-down')} className={'icon'} />
            )}
          </div>
          {sortFocus && (
            <>
              {/* 기본: 오래된 주문순서 (주문접수 / 준비중) */}
              <div onClick={() => setSort('기본')}>기본</div>
              {/* 오늘 주문 건: 오늘 들어온 주문(주문접수 / 준비중) */}
              <div onClick={() => setSort('오늘 주문 건')}>오늘 주문 건</div>
              <div onClick={() => setSort('전체 주문')}>전체 주문</div>
            </>
          )}
        </div>
        <div onClick={reLodeProduct} className="flexCenter">
          불러오기
        </div>
        <div className="flexHeightCenter">
          <p>체크된 항목 상태 변경:</p>
          <p onClick={() => editChecklistStatus('상품 준비 중')}>준비</p>
          <p onClick={() => editChecklistStatus('배송중')}>배송중</p>
          <p onClick={() => editChecklistStatus('재고부족')}>재고부족</p>
        </div>
      </div>

      {/* 상품 */}
      <ProductFormDiv>
        {orderList?.list && <CommonLoading />}
        {orderList !== null && (
          <>
            <ul className="ProductFormDivMenu flexHeightCenter">
              <li>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              </li>
              <li>주문 상품</li>
              <li>주문 일자</li>
              <li>결제 금액</li>
              <li>처리 상태</li>
              <li>상태 변경</li>
            </ul>
            {orderListRoad?.length !== 0 && (
              <p style={{ textAlign: 'center', fontSize: '1.5rem', padding: '5vh 0' }}>
                {orderListRoad}
              </p>
            )}
            {orderList?.length > 0 && orderListRoad?.length === 0 && (
              <div>
                {orderList
                  .slice()
                  .reverse()
                  .map((state, key) => (
                    <OrderAdminFrom
                      key={key}
                      state={state}
                      checkList={checkList}
                      addCheckboxId={handleCheckboxClick}
                      removeCheckboxId={removeItemByIndex}
                      axiosFun={axiosFun}
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </ProductFormDiv>
    </MainStyle>
  );
};
export default OrderListAdmin;
