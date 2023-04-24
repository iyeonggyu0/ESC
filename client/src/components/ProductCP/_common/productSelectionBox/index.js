import { useState } from 'react';
import PlusMinusButtonFrom from '../../../_common/plusMinusButtonFrom';

import { MainStyle } from './style';

const ProductSelectionBox = ({ productName, productOptionCheck, onConfirm }) => {
  const [productQuantity, setProductQuantity] = useState(1);

  return (
    <MainStyle>
      <p>{productName}</p>
      <div>
        {productOptionCheck.map((state, key) => (
          <span key={key}>
            {state.optionName}: &nbsp;{state.optionValue}
            <br />
          </span>
        ))}
      </div>
      <div className="flexHeightCenter">
        <PlusMinusButtonFrom val={productQuantity} setVal={setProductQuantity} />
        <p className="flexCenter" onClick={handleConfirm}>
          확정
        </p>
      </div>
    </MainStyle>
  );
};
export default ProductSelectionBox;
