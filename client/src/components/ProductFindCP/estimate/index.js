import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import ProductFindHeader from '../_common/header';

import { MainStyle } from './style';

const EstimateMain = ({ productData }) => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const pageNum = useParams('').pageNum;

  console.log(productData[pageNum - 1]);

  return (
    <MainStyle colorTheme={colorTheme} media={media}>
      <ProductFindHeader Page={'estimate'} />
      {/* 헤더 */}
      <div>
        <div></div>
        <div></div>
      </div>
      <div></div>
    </MainStyle>
  );
};
export default EstimateMain;
