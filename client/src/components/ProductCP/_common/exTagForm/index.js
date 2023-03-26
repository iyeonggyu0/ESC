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
  const [exAllTag, setExAllTag] = useState([]);
  const [tagArr, setTagArr] = useState([]);
  const [tagCommonArr, setTagCommonArr] = useState([]);

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
          console.log(res);
          setTagArr(res.data.data);
          setTagCommonArr(res.data.common);
          setExAllTag(res.data);
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
        setTagArr(res.data.data);
        setTagCommonArr(res.data.common);
        setExAllTag(res.data);
      }
    });
  }, []);

  // 수정
  const onCorrectionHandler = useCallback(() => {
    exTagRelodeHandler();

    if (type === null) {
      exAllTag?.common?.COMMON?.length > 0 &&
        setAddTag(
          '#' +
            exAllTag?.common?.COMMON?.map((item) => item.tag)
              .join(' #')
              .replace(/_/g, ' '),
        );
      console.log(exAllTag.common.COMMON);
    }

    if (type !== null) {
      exAllTag?.type?.COMMON?.length > 0 &&
        setAddTag(
          '#' +
            exAllTag?.common?.COMMON?.map((item) => item.tag)
              .join(' #')
              .replace(/_/g, ' '),
        );
      console.log(exAllTag.common.COMMON);
    }

    setAdditional(true);
  }, [exTagRelodeHandler, exAllTag, type]);

  // 취소
  const onCancelHandler = useCallback(() => {
    setAdditional(false);
    setAddTag('');
  }, [setAdditional, setAddTag]);

  // 저장
  const onSaveHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (!/#[a-zA-Zㄱ-ㅎ가-힣0-9]{1,}/g.test(addTag)) {
        return alert('#가 포함된 태그를 입력하세요.');
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
            productType: type === null ? 'COMMON' : type,
          })
          .then((res) => {
            if (res.status === 200) {
              alert('저장되었습니다.');
              setAddTag('');
              exTagRelodeHandler();
            }
          });
      } else {
        return;
      }
    },
    [addTag, type, setAddTag, exTagRelodeHandler],
  );

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
            placeholder={`#${type || 'COMMON'}의 #태그를_변경합니다.`}
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
          {!type && <span>선택된 TYPE가 없습니다.{tagText}</span>}
          {type && (
            <span>
              {type}와 관련된 태그입니다.{tagText}
            </span>
          )}

          {!additional && (
            <div>
              <span onClick={onCorrectionHandler}>
                수정
                <FontAwesomeIcon icon={solid('pen')} className="icon" />
              </span>
            </div>
          )}
        </div>
        <div>
          {tagArr &&
            tagArr.map((item, index) => (
              <ExTagStyle
                key={index}
                media={media}
                style={{
                  display:
                    (!fullView && Object.keys(item)[0] === type) || fullView ? 'block' : 'none',
                }}
              >
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
          {tagCommonArr && !fullView && (
            <ExTagStyle media={media}>
              <h2>COMMON</h2>
              <div className="flexHeightCenter">
                {tagCommonArr?.COMMON?.length > 0 &&
                  tagCommonArr.COMMON.map((item, key) => (
                    <ExTagSpan
                      key={key}
                      colorTheme={colorTheme}
                      tagText={tagText}
                      tag={item.tag}
                      setTagTextHandler={setTagTextHandler}
                    />
                  ))}
              </div>
            </ExTagStyle>
          )}
        </div>
        <div>
          <p onClick={() => setFullView(fullView ? false : true)}>
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
          </p>
        </div>
      </MainWapper>
    </div>
  );
};
export default ExTagForm;
