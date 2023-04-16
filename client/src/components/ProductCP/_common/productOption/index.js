import { useContext, useState } from 'react';
import { MainDiv } from './style';
import { useMedia } from '../../../../hooks/useMedia';
import { ThemeContext } from '../../../../App';
import ProductOptionView from './OptionView';
import ProductSelectionBox from '../productSelectionBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// productOption 추가하기
const ProductOption = ({ textFun, setProductOption, productName, data }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;

  const [addAttributeText, setAddAttributeText] = useState('');
  const [additionalAmount, setAdditionalAmount] = useState(null);
  const [optionName, setOptionName] = useState(null);
  const [attributeArr, setAttributeArr] = useState('');
  const [createMod, setCreateMod] = useState(false);

  let productOption = data || [];

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setAddAttributeText('');
      setAdditionalAmount(null);
      const newData = {
        optionName: optionName,
        ProductOptionProperty: [
          {
            text: addAttributeText,
            amount: additionalAmount,
          },
        ],
      };

      productOption = [...productOption, newData];
      console.log();
    }
  };

  //FIXME:

  const handleRemoveAttribute = (text) => {
    let updatedAttributeArr = attributeArr;
    if (attributeArr.includes(`${text},`)) {
      updatedAttributeArr = attributeArr.replace(`${text},`, '');
    } else if (attributeArr.includes(`,${text}`)) {
      updatedAttributeArr = attributeArr.replace(`,${text}`, '');
    } else if (attributeArr.includes(`${text}`)) {
      updatedAttributeArr = attributeArr.replace(`${text}`, '');
    }
    setAttributeArr(updatedAttributeArr);
  };

  console.log(attributeArr);

  // li > div
  return (
    <MainDiv media={media} colorTheme={colorTheme}>
      <div>
        {productOption.length > 0 &&
          productOption.map((opt) => (
            <ProductOptionView
              key={opt.id}
              textFun={textFun}
              setProductOption={setProductOption}
              data={opt}
            />
          ))}

        {productOption.length >= 0 && (
          <ProductSelectionBox optionName={productName} className="length0" />
        )}

        {!createMod && productOption.length > 0 && (
          <div className="flexCenter plus" onClick={() => setCreateMod(createMod ? false : true)}>
            +
          </div>
        )}
      </div>
      {createMod && (
        <div className="Create">
          <p>Create</p>
          <div>
            <div>
              <p>옵션 명</p>
              <input
                type="text"
                placeholder="(영어 사용 시 첫 글자 대문자)"
                value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
              />
            </div>
            <div>
              <p>하위 속성</p>
              <input
                type="text"
                value={addAttributeText}
                onChange={(e) => setAddAttributeText(e.target.value)}
              />
            </div>
            <div>
              <p>속성 추가 금액</p>
              <input
                type="text"
                placeholder="엔터를 눌러 속성 추가"
                value={additionalAmount}
                onChange={(e) => setAdditionalAmount(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div>
            <p>추가한 속성</p>
            <div>
              {attributeArr.length > 0 &&
                attributeArr.split(',').map((state, key) => (
                  <div key={key} className="flexHeightCenter">
                    <p>{state.text}</p>
                    {state.additionalAmount > 0 && <span>{`+ ${state.additionalAmount}`}</span>}
                    <FontAwesomeIcon
                      className="icon"
                      icon={solid('xmark')}
                      onClick={() => handleRemoveAttribute(state.text)}
                    />
                  </div>
                ))}
              {attributeArr.length === 0 && (
                <div className="flexHeightCenter">
                  <p style={{ color: 'gray', fontSize: '0.85rem', fontWeight: '300' }}>
                    추가된 속성 없음
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flexHeightCenter">
            <div>취소</div>
            <div>저장</div>
          </div>
        </div>
      )}
    </MainDiv>
  );
};
export default ProductOption;
