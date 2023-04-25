import { useEffect, useState } from 'react';
import PlusMinusButtonFrom from '../../../_common/plusMinusButtonFrom';

import { MainStyle } from './style';

const ProductSelectionBox = ({ productName, data, removeFun }) => {
  const [num, setNum] = useState(data.productQuantity);

  const [save, setSave] = useState(false);

  useEffect(() => {
    if (num !== data.productQuantity) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [num, data.productQuantity]);

  useEffect(() => {
    if (num === 0) {
      setNum(1);
    }
  }, [num]);

  const handleDelete = () => {
    // 삭제 버튼 클릭 시 해당 데이터를 productOrderList에서 삭제
    removeFun(data.productOptionCheck);
  };

  return (
    <MainStyle>
      <p>{productName}</p>
      <div>
        {data.productOptionCheck.map((state, key) => (
          <span key={key}>
            {state.optionName}: &nbsp;{state.optionValue} &nbsp;{' '}
            <span>{`( + ${state.amount}원 )`}</span>
            <br />
          </span>
        ))}
      </div>
      <div className="flexHeightCenter">
        <PlusMinusButtonFrom val={num} setVal={setNum} height={25} />
        {save && <p className="flexCenter">저장</p>}
        <p className="flexCenter" onClick={handleDelete}>
          삭제
        </p>
      </div>
    </MainStyle>
  );
};
export default ProductSelectionBox;
