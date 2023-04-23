import { useContext, useRef, useState } from 'react';
import { MainDiv } from './style';
import { useMedia } from '../../../../hooks/useMedia';
import { ThemeContext } from '../../../../App';
import ProductOptionView from './optionView';
import ProductSelectionBox from './optionConfirmation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// productOption 추가하기
const ProductOption = ({ textFun, setProductOption, productName, productOption }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;

  const [optionName, setOptionName] = useState(null);
  const [createMod, setCreateMod] = useState(false);

  const [attributeArr, setAttributeArr] = useState([]);
  const [addAttributeText, setAddAttributeText] = useState('');
  const [additionalAmount, setAdditionalAmount] = useState(null);
  const [mod, setMod] = useState('Create');
  const [editKey, setEditKey] = useState(null);
  const inputRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    if (setIsChecked) {
      setIsChecked(event.target.checked); // 체크 박스의 체크 상태를 상태 변수에 반영
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setAddAttributeText('');
      setAdditionalAmount(null);
      setAttributeArr((prevAttributeArr) => {
        const newItem = {
          property: addAttributeText,
          amount: Number(additionalAmount) || 0,
        };
        return [...prevAttributeArr, newItem];
      });
      inputRef.current.focus();
    }
  };

  const createModHandelr = () => {
    setMod('Create');
    setEditKey(null);
    setCreateMod(true);
  };

  const handleDelete = (index) => {
    // 삭제 버튼이 클릭되었을 때 해당 아이템을 배열에서 삭제하는 함수
    setAttributeArr((prevAttributeArr) => {
      const newArray = [...prevAttributeArr]; // 이전 배열을 복사하여 새로운 배열 생성
      newArray.splice(index, 1); // 해당 인덱스의 아이템 삭제
      return newArray; // 새로운 배열로 상태 업데이트
    });
  };

  const cancelCreationHandler = () => {
    setAddAttributeText('');
    setAttributeArr([]);
    setAdditionalAmount(null);
    setOptionName(null);
    setEditKey(null);
    setCreateMod(false);
    setIsChecked(true);
  };

  const createSaveHandler = () => {
    if (editKey !== null || mod === 'Edit') {
      // 배열의 불변성을 유지하면서 index가 editKey인 객체의 값을 수정
      setProductOption((prevProductOption) => {
        const updatedOption = { ...prevProductOption[editKey] }; // index가 editKey인 객체 복사
        updatedOption.optionName = optionName; // 값을 수정
        updatedOption.essential = isChecked; //
        updatedOption.ProductOptionProperties = attributeArr; // 값을 수정
        return [
          ...prevProductOption.slice(0, editKey), // 수정된 객체를 포함하기 전까지의 객체들 복사
          updatedOption, // 수정된 객체 추가
          ...prevProductOption.slice(editKey + 1), // 수정된 객체를 포함한 이후의 객체들 복사
        ];
      });
    } else {
      textFun(
        [
          ...productOption,
          { optionName: optionName, essential: isChecked, ProductOptionProperties: attributeArr },
        ],
        setProductOption,
      );
    }

    cancelCreationHandler();
  };

  const editMode = (index) => {
    productOption.map((obj, key) => {
      if (obj.optionName === index) {
        setAttributeArr(obj.ProductOptionProperties);
        setOptionName(obj.optionName.toString());
        setEditKey(key);
        setIsChecked(obj.essential);
      }
    });
    setMod('Edit');
    setCreateMod(true);
  };

  const optionDeleteHandler = () => {
    setProductOption((productOptionArr) => {
      const newArray = [...productOptionArr]; // 이전 배열을 복사하여 새로운 배열 생성
      newArray.splice(editKey, 1); // 해당 인덱스의 아이템 삭제
      return newArray; // 새로운 배열로 상태 업데이트
    });
    cancelCreationHandler();
  };

  // li > div
  return (
    <MainDiv media={media} colorTheme={colorTheme}>
      <div>
        {productOption.length > 0 &&
          productOption.map((opt, key) => (
            <ProductOptionView
              key={key}
              textFun={textFun}
              setProductOption={setProductOption}
              data={opt}
              editMode={editMode}
            />
          ))}

        {productOption.length === 0 && (
          <ProductSelectionBox optionName={productName} className="length0" />
        )}

        {!createMod && (
          <div className="flexCenter plus" onClick={() => createModHandelr()}>
            +
          </div>
        )}
      </div>
      {createMod && (
        <div className="Create">
          <p>{mod}</p>
          <div>
            <div>
              <p>옵션 명</p>
              <input
                type="text"
                placeholder="(영어 사용 시 첫 글자 대문자)"
                value={optionName || ''}
                onChange={(e) => setOptionName(e.target.value)}
              />
            </div>
            <div>
              <p>하위 속성 명</p>
              <input
                type="text"
                value={addAttributeText || ''}
                onChange={(e) => setAddAttributeText(e.target.value)}
                ref={inputRef}
              />
            </div>
            <div>
              <p>속성 추가 금액</p>
              <input
                type="text"
                placeholder="엔터를 눌러 속성 추가"
                value={additionalAmount || ''}
                onChange={(e) => setAdditionalAmount(e.target.value.replace(/\D+/g, ''))}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div>
            <p>추가한 속성</p>
            <div>
              {attributeArr.length > 0 &&
                attributeArr.map((state, key) => (
                  <div key={key} className="flexHeightCenter">
                    <p>
                      {state.property}
                      {state.amount > 0 && (
                        <span>{`( + ${state.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 )`}</span>
                      )}
                    </p>

                    <FontAwesomeIcon
                      className="icon"
                      icon={solid('xmark')}
                      onClick={() => handleDelete(key)}
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
            <label>
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              <span>필수 선택 여부</span>
            </label>
          </div>
          <div className="flexHeightCenter">
            {mod === 'Edit' && <div onClick={() => optionDeleteHandler()}>삭제</div>}
            <div onClick={() => cancelCreationHandler()}>취소</div>
            <div onClick={() => createSaveHandler()}>저장</div>
          </div>
        </div>
      )}
    </MainDiv>
  );
};
export default ProductOption;
