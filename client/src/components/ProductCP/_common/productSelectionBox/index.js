import { useEffect, useState } from 'react';
import PlusMinusButtonFrom from '../../../_common/plusMinusButtonFrom';

import { MainStyle } from './style';

const ProductSelectionBox = ({ productName, data, removeFun, id, changeOrderQuantity }) => {
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
    removeFun(data.productOptionCheck);
  };

  const saveHandler = () => {
    if (!save) return;
    changeOrderQuantity(id, num);
    setSave(false);
  };

  return (
    <MainStyle>
      <p>{productName}</p>
      <div>
        {data.productOptionCheck.map((state, key) => (
          <span key={key}>
            {state.optionName}: &nbsp;{state.optionValue} &nbsp;{' '}
            {state.amount > 0 && <span>{`( + ${state.amount}원 )`}</span>}
            <br />
          </span>
        ))}
      </div>
      <div className="flexHeightCenter">
        <PlusMinusButtonFrom val={num} setVal={setNum} height={25} />
        {save && (
          <p className="flexCenter" onClick={saveHandler}>
            저장
          </p>
        )}
        <p className="flexCenter" onClick={handleDelete}>
          삭제
        </p>
      </div>
    </MainStyle>
  );
};
export default ProductSelectionBox;
