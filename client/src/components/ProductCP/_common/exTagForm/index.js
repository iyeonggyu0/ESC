import { useContext, useState } from 'react';
import { ThemeContext } from '../../../../App';
import { useMedia } from '../../../../hooks/useMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { useInput } from '@hooks/useInput';

import { MainWapper, InputDivStyle } from './style';
import { useCallback } from 'react';

const ExTagForm = ({ tagEx, tagText, setTagText, type }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const [tag, onChangeTag, setTag] = useInput(tagText);

  const [fullView, setFullView] = useState(false);
  const [additional, setAdditional] = useState(false);

  const onCancelHandler = useCallback((e) => {
    e.preventDefault();
    setAdditional(false);
    setTag(null);
    // eslint-disable-next-line
  }, []);

  const onSaveHandler = useCallback((e) => {
    e.preventDefault();

    if (tag.length === 0) {
      return alert('태그를 입력하세요');
    }

    if (!/#/.test(tag)) {
      return alert('#가 포함되어야 합니다.');
    }

    if (confirm('저장과 함께 새로고침 됩니다.') == true) {
      setAdditional(false);
      setTagText(tag);
    } else {
      return;
    }

    // eslint-disable-next-line
  }, []);

  console.log(tagEx);
  // FIXME: 추가구간 만들기
  return (
    <div>
      {additional && (
        <InputDivStyle
          className="flexHeightCenter"
          style={{ marginBottom: '20px' }}
          media={media}
          colorTheme={colorTheme}
        >
          <input
            type="text"
            autoComplete="off"
            placeholder={'#태그(TYPE) #태그(TYPE)'}
            value={tag || ''}
            onChange={onChangeTag}
          />
          <div onClick={onCancelHandler} className="flexCenter">
            취소
          </div>
          <div onClick={onSaveHandler} className="flexCenter">
            저장
          </div>
        </InputDivStyle>
      )}
      <MainWapper media={media} colorTheme={colorTheme}>
        <div>
          {!type && <span>선택된 TYPE가 없습니다.</span>}
          {type && <span>{type}와 관련된 태그입니다.</span>}
          {!additional && (
            <span onClick={() => setAdditional(additional ? false : true)}>
              추가
              <FontAwesomeIcon icon={solid('pen')} className="icon" />
            </span>
          )}
        </div>
        <div>{tagEx && tagEx.map((item) => item.tag)}</div>
        <div>
          <span onClick={() => setFullView(fullView ? false : true)}>
            {fullView && (
              <FontAwesomeIcon
                icon={solid('caret-up')}
                className="icon"
                onClick={() => setFullView(fullView ? false : true)}
              />
            )}
            {fullView && <br />}
            {!fullView && '전체 태그 보기'}
            {fullView && 'TYPE 태그만 보기'}
            <br />
            {!fullView && (
              <FontAwesomeIcon
                icon={solid('caret-down')}
                className="icon"
                onClick={() => setFullView(fullView ? false : true)}
              />
            )}
          </span>
        </div>
      </MainWapper>
    </div>
  );
};
export default ExTagForm;
