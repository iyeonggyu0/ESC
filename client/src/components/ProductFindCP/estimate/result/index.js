import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';
import { useContext } from 'react';
import { ThemeContext } from '../../../../App';

import { MainStyle } from './style';
import ProductFindHeader from '../../_common/header';
import EstimateResultInBox from '../resultInBox';

const EstimateResult = ({ productData, selectionList }) => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <ProductFindHeader Page={'result'} selectionList={selectionList} />
      <div>
        <p>선택한 상품</p>
        {selectionList && productData && (
          <div>
            {selectionList.map((state, idx) => (
              <div key={idx}>
                {idx === 0 && <p>CASE</p>}
                {idx === 1 && <p>PCB</p>}
                {idx === 2 && <p>PLATE</p>}
                {idx === 3 && <p>SWITCH</p>}
                {idx === 4 && <p>KEYCAPS</p>}
                {state !== 0 && (
                  <EstimateResultInBox
                    productData={productData[idx].find((product) => product.id === state)}
                  />
                )}
                {state === 0 && (
                  <div className="flexCenter notSelectionStap">해당 단계를 건너뛰셨습니다.</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainStyle>
  );
};
export default EstimateResult;
