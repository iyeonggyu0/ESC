import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ButtonFromDiv, SelectButtonDiv } from './style';
import { useState } from 'react';

const PlusMinusButtonFrom = ({ val, setVal }) => {
  const [num, setNum] = useState(val);

  const minusHandler = (e) => {
    e.preventDefault();
    if (num !== 0) {
      setNum(num - 1);
    }
  };

  const plusHandler = (e) => {
    e.preventDefault();
    setNum(num + 1);
  };

  const selectHandler = (e) => {
    e.preventDefault();
    setVal(num);
  };

  return (
    <div style={{ display: 'flex' }}>
      <ButtonFromDiv>
        <div onClick={minusHandler}>
          <FontAwesomeIcon icon={solid('minus')} className={'icon'} />
        </div>
        <div>
          <input
            type="text"
            autoComplete="off"
            value={num}
            onChange={(e) => setNum(e.target.value)}
          />
        </div>
        <div onClick={plusHandler}>
          <FontAwesomeIcon icon={solid('plus')} className={'icon'} />
        </div>
      </ButtonFromDiv>
      <SelectButtonDiv onClick={selectHandler}>선택</SelectButtonDiv>
    </div>
  );
};
export default PlusMinusButtonFrom;
