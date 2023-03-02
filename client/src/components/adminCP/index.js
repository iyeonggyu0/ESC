import {} from 'react';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { useMedia } from '../../hooks/useMedia';

import {} from '@reducer/productReducer';

import { MainStyle, MenuMainStyle } from './style';
import InventoryQuantity from './_common/inventoryQuantity';

const AdminMain = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  // eslint-disable-next-line
  const userData = useContext(ThemeContext).userInfo.userData;

  const [pageMod, setPageMod] = useState('main');

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      {/* 메뉴 */}
      <MenuMainStyle media={media} colorTheme={colorTheme}>
        <p>주문</p>
        <ul>
          <li
            style={{ fontWeight: pageMod === 'main' ? '400' : '300' }}
            onClick={() => setPageMod('main')}
          >
            대시보드
          </li>
          <li
            style={{ fontWeight: pageMod === 'statistics' ? '400' : '300' }}
            onClick={() => setPageMod('statistics')}
          >
            주문통계
          </li>
          <li
            style={{ fontWeight: pageMod === 'order' ? '400' : '300' }}
            onClick={() => setPageMod('order')}
          >
            주문목록
          </li>
          <li
            style={{ fontWeight: pageMod === 'exchange' ? '400' : '300' }}
            onClick={() => setPageMod('exchange')}
          >
            교환/반품
          </li>
        </ul>

        <p>상품</p>
        <ul>
          <li
            style={{ fontWeight: pageMod === 'inventoryQuantity' ? '400' : '300' }}
            onClick={() => setPageMod('inventoryQuantity')}
          >
            재고관리
          </li>
          <li
            style={{ fontWeight: pageMod === 'inquiry' ? '400' : '300' }}
            onClick={() => setPageMod('inquiry')}
          >
            상품문의
          </li>
        </ul>

        <p>시스템</p>
        <ul>
          <li
            style={{ fontWeight: pageMod === 'message' ? '400' : '300' }}
            onClick={() => setPageMod('message')}
          >
            메시지
          </li>
          <li
            style={{ fontWeight: pageMod === 'serviceCenter' ? '400' : '300' }}
            onClick={() => setPageMod('serviceCenter')}
          >
            고객센터 질문
          </li>
        </ul>
      </MenuMainStyle>
      <section>
        {/* 재고관리 */}
        {}
        {pageMod === 'inventoryQuantity' && <InventoryQuantity />}
      </section>
    </MainStyle>
  );
};
export default AdminMain;
