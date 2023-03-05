import { useContext, useState } from 'react';
import { ThemeContext } from '../../../../../App';
import { useMedia } from '../../../../../hooks/useMedia';

import { MainStyle } from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import axios from 'axios';
import { axiosInstance } from '../../../../../util/axios';

const ProductAdminForm = ({ productData }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;

  const [inventoryQuantity, setInventoryQuantity] = useState(productData.inventoryQuantity);
  const [inventoryQuantityModify, setInventoryQuantityModify] = useState(false);

  const openModify = () => {
    window.open(`/product/modify/${productData.id}`);
  };

  const openProduct = () => {
    window.open(`/product/${productData.id}`);
  };

  const onEnterHandelr = (e) => {
    if (e.key === 'Enter') {
      setInventoryQuantityModify(false);

      if (inventoryQuantity !== productData.inventoryQuantity) {
        axios
          .put(`${axiosInstance}api/product/put/inventoryQuantity`, {
            inventoryQuantity: inventoryQuantity,
            id: productData.id,
          })
          .then((res) => {
            if (res.status === 200) alert('수정 완료');
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  return (
    <MainStyle media={media} colorTheme={colorTheme} className={'flexHeightCenter'}>
      <p>{productData.id}</p>
      <p>{productData.type}</p>
      <p>
        <span onClick={openProduct}>{productData.name}</span>
      </p>
      <p>{productData.price}</p>
      <p>
        {inventoryQuantityModify && (
          <input
            type={'text'}
            value={inventoryQuantity}
            onChange={(e) => setInventoryQuantity(e.target.value)}
            onKeyPress={onEnterHandelr}
            autoComplete="off"
            autoFocus
          />
        )}
        {!inventoryQuantityModify && (
          <span>
            {inventoryQuantity}
            <FontAwesomeIcon
              icon={solid('square-plus')}
              className={'plus'}
              onClick={() => setInventoryQuantityModify(true)}
            />
          </span>
        )}
      </p>
      <p>
        <FontAwesomeIcon icon={solid('pen')} className={'icon'} onClick={openModify} />
      </p>
    </MainStyle>
  );
};
export default ProductAdminForm;
