import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { useMedia } from '../../hooks/useMedia';

import { MainStyle, MenuMainStyle } from './style';

const AdminMain = () => {
  const media = useMedia();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const pageMod = useParams().page;

  return (
    <MainStyle media={media}>
      {/* 메뉴 */}
      <MenuMainStyle media={media} colorTheme={colorTheme}>
        <div>
          <p>주문</p>
          <ul>
            <li>주문통계</li>
            <li>주문목록</li>
            <li>교환/반품</li>
          </ul>

          <p>상품</p>
          <ul>
            <li>재고관리</li>
            <li>상품문의</li>
          </ul>

          <p>시스템</p>
          <ul>
            <li>메시지</li>
            <li>고객센터 질문</li>
          </ul>
        </div>
      </MenuMainStyle>
    </MainStyle>
  );
};
export default AdminMain;
