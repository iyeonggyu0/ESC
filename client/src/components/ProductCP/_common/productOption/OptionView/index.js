import { useContext, useState } from 'react';
import { MainDiv } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ThemeContext } from '../../../../../App';
import { useMedia } from '../../../../../hooks/useMedia';

const ProductOptionView = ({ textFun, setProductOption, productOption, data, editMode }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;

  const [select, setSelect] = useState('선택');
  const [selectMod, setSelectMod] = useState(false);

  const onSelectHandler = (text) => {
    setSelect(text);
  };
  console.log(data);

  // li > div
  return (
    <MainDiv media={media} colorTheme={colorTheme} selectMod={selectMod}>
      <div>
        <div className="flexHeightCenter">
          <p>{data.optionName}</p>
          <FontAwesomeIcon
            icon={solid('pen')}
            className="icon"
            onClick={() => editMode(data.optionName)}
          />
        </div>
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
              {data.ProductOptionProperty.map((prop, key) => (
                <li
                  key={key}
                  className="flexHeightCenter"
                  onClick={() => onSelectHandler(prop.property)}
                >
                  {/* FIXME: 0원 표시 끄기 */}
                  {prop.property} {prop.amount > 0 && <span>{`( + ${prop.amount} )`}</span>}
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
