import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useMedia } from '../../../../hooks/useMedia';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from '../../../../App';
import theme from '../../../../style/theme';

import { HeaderWapper } from './style';

const ProductFindHeader = ({ Page, selectionList }) => {
  const media = useMedia();
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const pageNum = useParams('').pageNum;
  const [pageChangeMode, setPageChangeMode] = useState(false);

  const onClickChangePage = useCallback(() => {
    if (!pageChangeMode) {
      return;
    }

    if (Page === 'estimate') {
      return navigate('/preference/1');
    }

    if (Page === 'preference') {
      return navigate('/estimate/1');
    }
  }, [Page, pageChangeMode, navigate]);

  const nextStage = useCallback(
    (num) => {
      if (pageNum === num) {
        return;
      }

      if (pageNum >= num) {
        if (window.confirm('선택하신 단계 이후의 선택이 초기화 됩니다.')) {
          navigate(`/estimate/${num}`);
        } else {
          return;
        }
      } else {
        navigate(`/estimate/${num}`);
      }
    },
    [pageNum, navigate],
  );

  return (
    <HeaderWapper pageChangeMode={pageChangeMode} media={media} colorTheme={colorTheme}>
      <section
        onClick={() =>
          Page !== 'result'
            ? setPageChangeMode(pageChangeMode ? false : true)
            : setPageChangeMode(false)
        }
      >
        {(Page === 'estimate' || Page === 'preference') && (
          <div className={'flexHeightCenter'}>
            {Page === 'preference' && (
              <div>
                <p>KEYBOARD</p>
                <p>TYPE CHECK</p>
              </div>
            )}
            {Page === 'estimate' && (
              <div>
                <p>CUSTOM</p>
                <p>KEYBOARD</p>
              </div>
            )}

            {!pageChangeMode && <FontAwesomeIcon icon={solid('angle-down')} />}
            {pageChangeMode && <FontAwesomeIcon icon={solid('angle-up')} />}
          </div>
        )}
        {Page === 'result' && <div className={'flexHeightCenter result'}>Selection List</div>}
        {pageChangeMode && Page !== 'result' && (
          <div className={'flexHeightCenter'} onClick={onClickChangePage}>
            {Page === 'preference' && (
              <div onClick={onClickChangePage}>
                <p>CUSTOM</p>
                <p>KEYBOARD</p>
              </div>
            )}
            {Page === 'estimate' && (
              <div onClick={onClickChangePage}>
                <p>KEYBOARD</p>
                <p>TYPE CHECK</p>
              </div>
            )}
          </div>
        )}
      </section>
      {media.isPc && Page === 'estimate' && (
        <section className={'flexHeightCenter'}>
          <ul className={'flexHeightCenter'}>
            <li
              style={{
                color:
                  pageNum === '1' && colorTheme === 'game'
                    ? theme.palette.white
                    : pageNum === '1'
                    ? theme.palette.basicFont
                    : pageNum !== '1' && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              <span onClick={() => nextStage(1)}>CASE</span>
              <FontAwesomeIcon icon={solid('angle-right')} className={'icon'} />
            </li>
            <li
              style={{
                color:
                  pageNum === '2' && colorTheme === 'game'
                    ? theme.palette.white
                    : pageNum === '2'
                    ? theme.palette.basicFont
                    : pageNum !== '2' && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              <span onClick={() => nextStage(2)}>PCB</span>
              <FontAwesomeIcon icon={solid('angle-right')} className={'icon'} />
            </li>
            <li
              style={{
                color:
                  pageNum === '3' && colorTheme === 'game'
                    ? theme.palette.white
                    : pageNum === '3'
                    ? theme.palette.basicFont
                    : pageNum !== '3' && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              <span onClick={() => nextStage(3)}>PLATE</span>
              <FontAwesomeIcon icon={solid('angle-right')} className={'icon'} />
            </li>
            <li
              style={{
                color:
                  pageNum === '4' && colorTheme === 'game'
                    ? theme.palette.white
                    : pageNum === '4'
                    ? theme.palette.basicFont
                    : pageNum !== '4' && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              <span onClick={() => nextStage(4)}>SWITCH</span>
              <FontAwesomeIcon icon={solid('angle-right')} className={'icon'} />
            </li>
            <li
              style={{
                color:
                  pageNum === '5' && colorTheme === 'game'
                    ? theme.palette.white
                    : pageNum === '5'
                    ? theme.palette.basicFont
                    : pageNum !== '5' && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              <span onClick={() => nextStage(5)}>KEYCAPS</span>
            </li>
          </ul>
        </section>
      )}
      {media.isPc && Page === 'result' && (
        <section className={'flexHeightCenter'}>
          <ul className={'flexHeightCenter'}>
            <li
              style={{
                color:
                  selectionList[0] != 0 && colorTheme === 'game'
                    ? theme.palette.white
                    : selectionList[0] != 0
                    ? theme.palette.basicFont
                    : selectionList[0] == 0 && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              <span onClick={() => nextStage(1)}>CASE</span>
              <FontAwesomeIcon icon={solid('angle-right')} className={'icon'} />
            </li>
            <li
              style={{
                color:
                  selectionList[1] != 0 && colorTheme === 'game'
                    ? theme.palette.white
                    : selectionList[1] != 0
                    ? theme.palette.basicFont
                    : selectionList[1] == 0 && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              <span onClick={() => nextStage(2)}>PCB</span>
              <FontAwesomeIcon icon={solid('angle-right')} className={'icon'} />
            </li>
            <li
              style={{
                color:
                  selectionList[2] != 0 && colorTheme === 'game'
                    ? theme.palette.white
                    : selectionList[2] != 0
                    ? theme.palette.basicFont
                    : selectionList[2] == 0 && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              <span onClick={() => nextStage(3)}>PLATE</span>
              <FontAwesomeIcon icon={solid('angle-right')} className={'icon'} />
            </li>
            <li
              style={{
                color:
                  selectionList[3] != 0 && colorTheme === 'game'
                    ? theme.palette.white
                    : selectionList[3] != 0
                    ? theme.palette.basicFont
                    : selectionList[3] == 0 && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              <span onClick={() => nextStage(4)}>SWITCH</span>
              <FontAwesomeIcon icon={solid('angle-right')} className={'icon'} />
            </li>
            <li
              style={{
                color:
                  selectionList[4] != 0 && colorTheme === 'game'
                    ? theme.palette.white
                    : selectionList[4] != 0
                    ? theme.palette.basicFont
                    : selectionList[4] == 0 && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              <span onClick={() => nextStage(5)}>KEYCAPS</span>
            </li>
          </ul>
        </section>
      )}
      {media.isPc && Page === 'preference' && (
        <section className={'flexHeightCenter'}>
          <ul className={'flexHeightCenter'}>
            <li
              style={{
                color:
                  pageNum === '1' && colorTheme === 'game'
                    ? theme.palette.white
                    : pageNum === '1'
                    ? theme.palette.basicFont
                    : pageNum !== '1' && colorTheme === 'game'
                    ? '#ADADAD'
                    : theme.palette.basicSubFont,
              }}
            >
              CASE
              <FontAwesomeIcon icon={solid('angle-right')} className={'icon'} />
            </li>
          </ul>
        </section>
      )}
      <div className="flexCenter" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={solid('house')} />
      </div>
    </HeaderWapper>
  );
};
export default ProductFindHeader;
