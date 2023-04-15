import { useState } from 'react';

const ProductSelectionBox = ({ optionName, removeFun }) => {
  const [productQuantity, setProductQuantity] = useState(1);

  return (
    <>
      <>
        <PlusMinusButtonFrom val={productQuantity} setVal={setProductQuantity} />
      </>
    </>
  );
};
export default ProductSelectionBox;
