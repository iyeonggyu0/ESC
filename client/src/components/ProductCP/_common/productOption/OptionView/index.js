import { useContext, useState } from 'react';
import { MainDiv } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ThemeContext } from '../../../../../App';
import { useMedia } from '../../../../../hooks/useMedia';

const ProductOptionView = ({ data, editMode, onProductOptionCheck }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo;

  const [select, setSelect] = useState('선택');
  const [selectMod, setSelectMod] = useState(false);

  const onClick = (text, amount) => {
    setSelect(text);
    onProductOptionCheck(data.optionName, text, amount);
  };

  // li > div
  return (
    <MainDiv media={media} colorTheme={colorTheme} selectMod={selectMod}>
      <div>
        <div className="flexHeightCenter">
          <p>
            {data.optionName}
            {data.essential && <span style={{ color: 'orange' }}> *</span>}
          </p>
          {userData.login && userData.userData?.authority === 'admin' && (
            <FontAwesomeIcon
              icon={solid('pen')}
              className="icon"
              onClick={() => editMode(data.optionName)}
            />
          )}
        </div>
        <div onClick={() => setSelectMod(selectMod ? false : true)}>
          <div className="flexHeightCenter">
            <p className="flexHeightCenter">{select}</p>
            <FontAwesomeIcon
              icon={solid('angle-down')}
              style={{ color: '#000000' }}
              className="icon"
            />
          </div>
          {selectMod && (
            <ul className="optionList">
              <li className="flexHeightCenter" onClick={() => onClick('선택')}>
                선택
              </li>
              {/* 수정 */}
              {data.ProductOptionProperties.reverse().map((prop, key) => (
                <li
                  key={key}
                  className="flexHeightCenter"
                  onClick={() => onClick(prop.property, prop.amount)}
                >
                  {prop.property} {prop.amount > 0 && <span>{`( + ${prop.amount}원 )`}</span>}
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
