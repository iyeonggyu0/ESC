import {} from 'react';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { useMedia } from '../../hooks/useMedia';

import {} from '@reducer/productReducer';

import { MainStyle, MenuMainStyle } from './style';
import InventoryQuantity from './_common/inventoryQuantity';
import OrderListAdmin from './_common/orderList';
import CancelOrderListAdmin from './_common/cancelOrderList';

const AdminMain = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  // eslint-disable-next-line
  const userData = useContext(ThemeContext).userInfo.userData;

  const page = useParams().page;

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      {/* 메뉴 */}
      {media.isPc && (
        <MenuMainStyle media={media} colorTheme={colorTheme}>
          <p>주문</p>
          <ul>
            <li
              style={{ fontWeight: page === 'dashboard' ? '500' : '300' }}
              onClick={() => navigate('/admin/dashboard')}
            >
              대시보드
            </li>
            <li
              style={{ fontWeight: page === 'orderList' ? '500' : '300' }}
              onClick={() => navigate('/admin/orderList')}
            >
              주문목록
            </li>
            <li
              style={{ fontWeight: page === 'exchange' ? '500' : '300' }}
              onClick={() => navigate('/admin/exchange')}
            >
              취소/반품
            </li>
          </ul>

          <p>상품</p>
          <ul>
            <li
              style={{ fontWeight: page === 'inventoryQuantity' ? '500' : '300' }}
              onClick={() => navigate('/admin/inventoryQuantity')}
            >
              재고관리
            </li>
            <li
              style={{ fontWeight: page === 'inquiry' ? '500' : '300' }}
              onClick={() => navigate('/admin/inquiry')}
            >
              상품문의
            </li>
          </ul>

          <p>시스템</p>
          <ul>
            <li
              style={{ fontWeight: page === 'message' ? '500' : '300' }}
              onClick={() => navigate('/admin/message')}
            >
              메시지
            </li>
            <li
              style={{ fontWeight: page === 'serviceCenter' ? '500' : '300' }}
              onClick={() => navigate('/admin/serviceCenter')}
            >
              고객센터 질문
            </li>
          </ul>
        </MenuMainStyle>
      )}
      <section>
        {/* 오더리스트 */}
        {page === 'orderList' && <OrderListAdmin />}
        {/* 재고관리 */}
        {page === 'inventoryQuantity' && <InventoryQuantity />}
        {page === 'exchange' && <CancelOrderListAdmin />}
      </section>
    </MainStyle>
  );
};
export default AdminMain;
