import axios from 'axios';
import { useCallback, useContext, useState } from 'react';
import { axiosInstance } from '@util/axios';
import { ThemeContext } from '../App';

export const useDiscountDate = (productData) => {
  const date = new Date();
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth() + 1;
  const nowDay = date.getDate();
  const userData = useContext(ThemeContext).userInfo.userData;

  // true: 사용가능
  // false: 사용불가능
  const [check, setCheck] = useState(false);

  const handler = useCallback(
    (value) => {
      if (value.periodYear < nowYear) {
        setCheck(false);
      }

      if (value.periodMonth <= nowMonth && value.periodDate < nowDay) {
        setCheck(false);
        return axios.delete(`${axiosInstance}api/product/discount/delete/${value.id}`).then(() => {
          if (userData && userData.authority === 'admin')
            alert(`적용기간이 ${productData.name}상품의 할인을 삭제했습니다.`);
        });
      }
      setCheck(true);
    },
    // eslint-disable-next-line
    [],
  );

  return [check, handler];
};
