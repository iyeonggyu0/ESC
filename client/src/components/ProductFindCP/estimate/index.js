import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import ProductFindHeader from '../_common/header';

import { MainStyle } from './style';

const EstimateMain = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
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
