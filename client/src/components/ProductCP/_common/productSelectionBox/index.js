import { useState } from 'react';
import PlusMinusButtonFrom from '../../../_common/plusMinusButtonFrom';

const ProductSelectionBox = ({ optionName, removeFun }) => {
  const [productQuantity, setProductQuantity] = useState(1);

  return (
    <div
      style={{
        width: '100%',
        height: '130px',
        padding: '20px',
        position: 'relative',
        border: '1px solid black',
        borderRadius: '8px',
      }}
    >
      <p style={{ width: '100%', fontSize: '1.1rem' }}>
        {optionName ? `${optionName}` : '상품이름'}
      </p>
      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        <PlusMinusButtonFrom val={productQuantity} setVal={setProductQuantity} />
      </div>
    </div>
  );
};
export default ProductSelectionBox;
