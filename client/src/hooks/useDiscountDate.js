import axios from 'axios';
import { useCallback, useState } from 'react';
import { axiosInstance } from '@util/axios';

export const useDiscountDate = () => {
  const date = new Date();
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth() + 1;
  const nowDay = date.getDate();

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
        return axios
          .delete(`${axiosInstance}api/product/discount/delete/${value.id}`)
          .then(alert('적용기간이 지난 쿠폰을 삭제했습니다.'));
      }
      setCheck(true);
    },
    // eslint-disable-next-line
    [],
  );

  return [check, handler];
};
