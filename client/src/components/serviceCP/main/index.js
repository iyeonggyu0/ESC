import { useContext } from 'react';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { MainStyle } from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const ServiceMain = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <div>
        <p>커스텀 과정 / 메뉴얼</p>
        <div>
          <a
            href="/servicePDF/guidePDF.pdf"
            download={'estimate_guidePDF.pdf'}
            className="flexHeightCenter"
          >
            <div>
              <p>견적 패키지</p>
              <span>가이드</span>
            </div>
            <div className="flexCenter">
              <FontAwesomeIcon icon={regular('file')} className="icon" />
              <FontAwesomeIcon icon={solid('file-arrow-down')} className="downIcon" />
            </div>
          </a>
          <a
            href="/servicePDF/guidePDF.pdf"
            download={'lubrication_guidePDF.pdf'}
            className="flexHeightCenter"
          >
            <div>
              <p>키보드 윤활</p>
              <span>가이드</span>
            </div>
            <div className="flexCenter">
              <FontAwesomeIcon icon={regular('file')} className="icon" />
              <FontAwesomeIcon icon={solid('file-arrow-down')} className="downIcon" />
            </div>
          </a>
          <a
            href="/servicePDF/guidePDF.pdf"
            download={'wristRest_guidePDF.pdf'}
            className="flexHeightCenter"
          >
            <div>
              <p>키보드 흡음</p>
              <span>가이드</span>
            </div>
            <div className="flexCenter">
              <FontAwesomeIcon icon={regular('file')} className="icon" />
              <FontAwesomeIcon icon={solid('file-arrow-down')} className="downIcon" />
            </div>
          </a>
        </div>
        <div>
          <p>잦은 질문</p>
          <ul>
            <li className="flexHeightCenter">
              <p>전체질문 보기</p>
              <div>바로가기</div>
            </li>
            <li className="flexHeightCenter">
              <p>반품 정책 및 보증</p>
              <div className="flexHeightCenter">
                {media.isPc && <p>2022</p>}
                {media.isPc && <p>PDF</p>}
                <a href="/servicePDF/guidePDF.pdf" download={'lubrication_guidePDF.pdf'}>
                  다운로드
                </a>
              </div>
            </li>
            <li className="flexHeightCenter">
              <p>배송</p>
              <div className="flexHeightCenter">
                {media.isPc && <p>2023</p>}
                {media.isPc && <p>PDF</p>}
                <a href="/servicePDF/guidePDF.pdf" download={'lubrication_guidePDF.pdf'}>
                  다운로드
                </a>
              </div>
            </li>
            <li className="flexHeightCenter">
              <p>안전성과 인증</p>
              <div className="flexHeightCenter">
                {media.isPc && <p>2023</p>}
                {media.isPc && <p>PDF</p>}
                <a href="/servicePDF/guidePDF.pdf" download={'lubrication_guidePDF.pdf'}>
                  다운로드
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </MainStyle>
  );
};
export default ServiceMain;
