import { useState } from 'react';
import PlusMinusButtonFrom from '../../../../_common/plusMinusButtonFrom';

import { MainStyle } from './style';

const ProductSelectionBox = ({ optionName, removeFun }) => {
  const [productQuantity, setProductQuantity] = useState(1);

  return (
    <MainStyle>
      <p>{optionName ? `${optionName}` : '상품이름'}</p>
      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        <PlusMinusButtonFrom val={productQuantity} setVal={setProductQuantity} />
      </div>
    </MainStyle>
  );
};
export default ProductSelectionBox;
