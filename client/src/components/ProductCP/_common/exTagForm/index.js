import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../../App';
import { useMedia } from '../../../../hooks/useMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { MainWapper, InputDivStyle, ExTagStyle } from './style';
import { useCallback } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../../../util/axios';
import ExTagSpan from './exTagSpan';

const ExTagForm = ({ tagText, setTagTextHandler, type }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;

  const [fullView, setFullView] = useState(false);
  const [additional, setAdditional] = useState(false);

  const [addTag, setAddTag] = useState('');
  const [tagArr, setTagArr] = useState([]);

  // setTag(
  //   '#' +
  //     productData.ProductTags.map((item) => item.tag)
  //       .join(' #')
  //       .replace(/_/g, ' '),
  // );

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/product/tag/ex/get`)
      .then((res) => {
        if (res.status === 200) {
          setTagArr(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // EX태그 리로드
  const exTagRelodeHandler = useCallback(() => {
    axios.get(`${axiosInstance}api/product/tag/ex/get`).then((res) => {
      if (res.status === 200) {
        setTagArr(res.data);
      }
    });
  }, []);

  // 추가(취소)
  const onCancelHandler = useCallback(() => {
    setAdditional(false);
    setAddTag(null);
  }, [setAdditional, setAddTag]);

  const onSaveHandler = useCallback((e) => {
    e.preventDefault();

    if (addTag.length === 0) {
      return alert('태그를 입력하세요');
    }

    if (!/#/.test(addTag)) {
      return alert('#가 포함되어야 합니다.');
    }

    // 추가(저장)
    setAdditional(false);
    if (addTag !== null) {
      axios
        .post(`${axiosInstance}api/product/tag/ex/post`, {
          tag: addTag
            .replace(/^#/g, '')
            .replace(/ {0,}#/g, ',')
            .replace(/ /g, '_')
            .split(/,/g),
          productType: type,
        })
        .then((res) => {
          if (res.status === 200) {
            alert('저장되었습니다.');
            exTagRelodeHandler();
          }
        });
    } else {
      return;
    }

    // eslint-disable-next-line
  }, []);

  console.log(tagArr);

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
            spellCheck="false"
            placeholder={`#${type}에 #태그를_추가합니다.`}
            value={addTag || ''}
            onChange={(e) => setAddTag(e.target.value)}
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
          {!additional && type !== null && (
            <div>
              <span onClick={() => setAdditional(additional ? false : true)}>
                추가
                <FontAwesomeIcon icon={solid('pen')} className="icon" />
              </span>
              <span onClick={() => setAdditional(additional ? false : true)}>
                삭제
                <FontAwesomeIcon icon={solid('trash-can')} className="icon" />
              </span>
            </div>
          )}
        </div>
        <div></div>
        {/* 전체 보기 */}
        <div>
          {tagArr.map((item, index) => (
            <ExTagStyle key={index} media={media}>
              <h2>{Object.keys(item)[0]}</h2>
              <div className="flexHeightCenter">
                {Object.values(item)[0].map((subItem, subIndex) => (
                  <ExTagSpan
                    key={subIndex}
                    colorTheme={colorTheme}
                    tagText={tagText}
                    tag={subItem.tag}
                    setTagTextHandler={setTagTextHandler}
                  />
                ))}
              </div>
            </ExTagStyle>
          ))}
        </div>
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
