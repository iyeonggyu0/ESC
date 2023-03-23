import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useMedia } from '../../../../hooks/useMedia';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from '../../../../App';
import theme from '../../../../style/theme';

import { HeaderWapper } from './style';

const ProductFindHeader = ({ Page }) => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const pageNum = useParams('').pageNum;
  const [pageChangeMode, setPageChangeMode] = useState(false);

  const onClickChangePage = useCallback(() => {
    if (!pageChangeMode) {
      return;
    }

    if (Page === 'EstimateMain') {
      return navigate('/preference/1');
    }

    if (Page === 'PreferenceMain') {
      return navigate('/estimate/1');
    }
  }, [Page, pageChangeMode, navigate]);

  return (
    <HeaderWapper pageChangeMode={pageChangeMode} media={media} colorTheme={colorTheme}>
      <section onClick={() => setPageChangeMode(pageChangeMode ? false : true)}>
        <div className={'flexHeightCenter'}>
          <div>
            {Page === 'EstimateMain' && <p>CUSTOM</p>}
            {Page === 'PreferenceMain' && <p>KEYBOARD</p>}
            {Page === 'EstimateMain' && <p>KEYBOARD</p>}
            {Page === 'PreferenceMain' && <p>TYPE CHECK</p>}
          </div>

          {!pageChangeMode && <FontAwesomeIcon icon={solid('angle-down')} />}
          {pageChangeMode && <FontAwesomeIcon icon={solid('angle-up')} />}
        </div>
        {pageChangeMode && (
          <div className={'flexHeightCenter'}>
            <div onClick={onClickChangePage}>
              {Page !== 'EstimateMain' && <p>CUSTOM</p>}
              {Page !== 'PreferenceMain' && <p>KEYBOARD</p>}
              {Page !== 'EstimateMain' && <p>KEYBOARD</p>}
              {Page !== 'PreferenceMain' && <p>TYPE CHECK</p>}
            </div>
          </div>
        )}
      </section>
      {media.isPc && Page === 'EstimateMain' && (
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
              PCB
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
              PLATE
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
              SWITCH
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
              KEYCAPS
            </li>
          </ul>
        </section>
      )}
      {media.isPc && Page === 'PreferenceMain' && (
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
