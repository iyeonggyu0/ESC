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
  const [activePage, setActivePage] = useState(1);
  // eslint-disable-next-line
  const [items, setItems] = useState(theme.paginationItem.adminInventoryQuantity);

  const [orderList, setOrderList] = useState([]);
  const [orderListRoad, setOrderListRoad] = useState('');

  const onActivePageHandler = (page) => {
    setActivePage(page);
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

  const reLodeProduct = useCallback(() => {
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

    setActivePage(1);
    // eslint-disable-next-line
  }, [sort]);

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
          <p>접수</p>
          <p>준비</p>
          <p>배송중</p>
        </div>
      </div>

      {/* 상품 */}
      <ProductFormDiv>
        {orderList?.list && <CommonLoading />}
        {orderList !== null && (
          <>
            <ul className="ProductFormDivMenu flexHeightCenter">
              <li>
                <input type="checkbox" />
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
                {orderList.map((state, key) => (
                  <OrderAdminFrom key={key} state={state} />
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
