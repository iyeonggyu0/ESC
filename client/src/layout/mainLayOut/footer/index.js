import { useMedia } from '../../../hooks/useMedia';
import { ThemeContext } from '../../../App';
import { useContext } from 'react';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

//style
import { Footer, Title, FooterDiv, IconDiv, MobileFooter } from './style';

const LayOutFooter = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;

  return (
    <>
      {media.isPc && (
        <Footer colorTheme={colorTheme}>
          <Title colorTheme={colorTheme}>ESC KEY</Title>
          <FooterDiv>
            <div>
              <p>Everything Styles' Custom Keyboard</p>
              <p>
                상호: ESC ( Everything Styles' Custom Keyboard )<br />
                사업자 등록 번호: 000-00-00000
                <br />
                이메일: esckey@gmail.com
                <br />
                주소: 서울특별시 강남구 ESCKEY 516-53
              </p>
            </div>
            <IconDiv colorTheme={colorTheme}>
              <div>
                <a href="https://github.com/iyeonggyu0" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={brands('github')} className={'icon'} />
                  <span>GitHub</span>
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/iyeonggyu1008/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={brands('instagram')} className={'icon instagram'} />
                  <span>Instagram</span>
                </a>
              </div>
            </IconDiv>
          </FooterDiv>
        </Footer>
      )}
      {(media.isMobile || media.isTablet) && (
        <MobileFooter colorTheme={colorTheme}>
          <Title colorTheme={colorTheme}>ESC KEY</Title>
          <FooterDiv>
            <div>
              <p>Everything Styles' Custom Keyboard</p>
              <p>
                상호: ESC ( Everything Styles' Custom Keyboard )<br />
                사업자 등록 번호: 000-00-00000
                <br />
                이메일: esckey@gmail.com
                <br />
                주소: 서울특별시 강남구 ESCKEY 516-53
              </p>
            </div>
            <IconDiv colorTheme={colorTheme}>
              <div>
                <a href="https://github.com/iyeonggyu0" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={brands('github')} className={'icon'} />
                  <span>GitHub</span>
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/iyeonggyu1008/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={brands('instagram')} className={'icon instagram'} />
                  <span>Instagram</span>
                </a>
              </div>
            </IconDiv>
          </FooterDiv>
        </MobileFooter>
      )}
    </>
  );
};
export default LayOutFooter;
