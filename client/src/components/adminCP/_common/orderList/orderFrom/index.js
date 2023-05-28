import { useContext } from 'react';
import { MainDiv } from './style';
import { ThemeContext } from 'styled-components';
import { useMedia } from '../../../../../hooks/useMedia';

const OrderAdminFrom = ({ state }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;

  console.log(state);
  const dateObject = new Date(state.createdAt);
  return (
    <MainDiv media={media} colorTheme={colorTheme} className="flexHeightCenter">
      <div>
        <input type="checkbox" />
      </div>
      <div>주문 상품</div>
      <div>
        {dateObject.getMonth() + 1}월 {dateObject.getDate()}일<br />
        {dateObject.getHours()}:{dateObject.getMinutes()}분
      </div>
      <div>{state.amountOfPayment.toLocaleString()}원</div>
      <div>{state.deliveryStatus}</div>
      <div className="flexWidthCenter">
        <span>접수</span>
        <span>준비</span>
        <span>배송중</span>
      </div>
    </MainDiv>
  );
};
export default OrderAdminFrom;
