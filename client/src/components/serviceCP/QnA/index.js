import { useContext } from 'react';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { MainStyle } from './style';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';

const ServiceQnAMain = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const navigate = useNavigate();

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <p>Q & A</p>
      <p>
        <span onClick={() => navigate('/service/qna/create')}>질문하기</span>
      </p>
    </MainStyle>
  );
};
export default ServiceQnAMain;
