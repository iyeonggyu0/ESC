import { useContext, useEffect, useState } from 'react';
import { MainDiv } from './style';
import { ThemeContext } from 'styled-components';
import { useMedia } from '../../../../../hooks/useMedia';

const CancelOrderAdminFrom = ({ state, checkList, addCheckboxId, removeCheckboxId, axiosFun }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;

  console.log(state);
  const paymentDate = new Date(state.paymentDate);
  const createdAt = new Date(state.createdAt);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (checkList) {
      const isChecked22 = checkList.includes(state.id);
      setIsChecked(isChecked22);
    } else {
      setIsChecked(false);
    }
    // eslint-disable-next-line
  }, [checkList]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      addCheckboxId(state.id);
    } else {
      removeCheckboxId(state.id);
    }
  };

  const recoveringButton = () => {
    if (state.processStep === '상품 회수 중') return alert('이미 해당 상태입니다.');

    const data = {
      status: '상품 회수 중',
      paymentId: [state.id],
    };
    axiosFun(data);
  };

  const canceledButton = () => {
    if (state.processStep === '환불 완료') return alert('이미 해당 상태입니다.');

    const data = {
      status: '환불 완료',
      paymentId: [state.id],
    };
    axiosFun(data);
  };

  return (
    <MainDiv media={media} colorTheme={colorTheme} className="flexHeightCenter">
      <div>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      </div>
      <div>
        {/* 구분 */}
        {state.cancelType}
      </div>
      <div>
        {/* 구매ID */}
        {state.paymentId}
      </div>
      <div>
        {paymentDate.getMonth() + 1}월 {paymentDate.getDate()}일<br />
        {paymentDate.getHours()}:{paymentDate.getMinutes()}분
      </div>
      <div>
        {createdAt.getMonth() + 1}월 {createdAt.getDate()}일<br />
        {createdAt.getHours()}:{createdAt.getMinutes()}분
      </div>
      <div>
        {(
          state.paymentData.amountOfPayment -
          state.paymentData.deliveryFee -
          3000
        ).toLocaleString()}
        원
      </div>
      <div>
        <p>{state.processStep}</p>
        <p>{state.clearStep.toString()}</p>
      </div>
      <div className="flexWidthCenter">
        <span onClick={recoveringButton}>상품 회수 중</span>
        <span onClick={canceledButton}>환불</span>
      </div>
    </MainDiv>
  );
};
export default CancelOrderAdminFrom;
