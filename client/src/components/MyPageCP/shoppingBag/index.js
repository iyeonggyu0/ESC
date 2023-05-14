import { useDispatch } from 'react-redux';
import { useMedia } from '../../../hooks/useMedia';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../App';

import { MainStyle, ProductDiv, ProductOptionDiv } from './style';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';
import { decrypt } from '@util/crypto';
import ShoppingBagProductFrom from './productFrom';

const ShoppingBagMain = () => {
  const media = useMedia();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  const [shoppingBagList, setShoppingBagList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/user/get/shoppingBag/${userData.email}`)
      .then((res) => {
        const decryptData = decrypt(res.data, process.env.REACT_APP_USER_KEY);
        console.log(decryptData);
        setShoppingBagList(decryptData);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

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
          <li>가격</li>
          <li>수량</li>
        </ul>
        <div>
          {Array.isArray(shoppingBagList) &&
            shoppingBagList.map((state, index) => (
              <ShoppingBagProductFrom key={index} state={state} />
            ))}
        </div>
      </div>
    </MainStyle>
  );
};
export default ShoppingBagMain;
