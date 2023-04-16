import { useContext, useState } from 'react';
import { MainDiv } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ThemeContext } from '../../../../../App';
import { useMedia } from '../../../../../hooks/useMedia';

const ProductOptionView = ({ textFun, setProductOption, productOption, data }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;

  const [select, setSelect] = useState('선택');
  const [selectMod, setSelectMod] = useState(false);

  const onSelectHandler = (text) => {
    setSelect(text);
  };

  // li > div
  return (
    <MainDiv media={media} colorTheme={colorTheme} selectMod={selectMod}>
      <div>
        <p>{data.optionName}</p>
        <div onClick={() => setSelectMod(selectMod ? false : true)}>
          <div className="flexHeightCenter">
            <p>{select}</p>
            <FontAwesomeIcon
              icon={solid('angle-down')}
              style={{ color: '#000000' }}
              className="icon"
            />
          </div>
          {selectMod && (
            <ul>
              {data.ProductOptionProperty.map((prop) => (
                <li
                  key={prop.id}
                  className="flexHeightCenter"
                  onClick={() => onSelectHandler(prop.property)}
                >
                  {prop.property}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MainDiv>
  );
};
export default ProductOptionView;
