import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ButtonFromDiv } from './style';

const PlusMinusButtonFrom = ({ val, setVal }) => {
  const minusHandler = (e) => {
    e.preventDefault();
    if (val !== 0) {
      setVal(val - 1);
    }
  };

  const plusHandler = (e) => {
    e.preventDefault();
    setVal(val + 1);
  };

  return (
    <ButtonFromDiv>
      <div onClick={minusHandler}>
        <FontAwesomeIcon icon={solid('minus')} />
      </div>
      <div>
        <input type="text" autoComplete="off" value={val} onChange={setVal} />
      </div>
      <div onClick={plusHandler}>
        <FontAwesomeIcon icon={solid('plus')} />
      </div>
    </ButtonFromDiv>
  );
};
export default PlusMinusButtonFrom;
