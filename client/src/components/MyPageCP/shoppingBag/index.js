import { useDispatch } from 'react-redux';
import { useMedia } from '../../../hooks/useMedia';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../App';

import { MainStyle } from './style';

const ShoppingBagMain = ({ ShoppingBags }) => {
  const media = useMedia();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <p>장바구니</p>
      <div>
        <span>전체 선택</span>
        <span>삭제</span>
      </div>
      <div>
        <ul className="flexHeightCenter">
          <li>선택</li>
          <li>상품/옵션 정보</li>
          <li>수량</li>
        </ul>
        <div>{ShoppingBags.map}</div>
      </div>
    </MainStyle>
  );
};
export default ShoppingBagMain;
