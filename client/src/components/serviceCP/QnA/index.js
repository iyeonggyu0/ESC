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
  // const userData = useContext(ThemeContext).userInfo.userData;
  const userData = useContext(ThemeContext).userInfo.userData;

  const onMoveCreateHandler = () => {
    if (!userData) {
      return alert('로그인이 필요합니다');
    }
    navigate('/service/qna/create');
  };

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <p>Q & A</p>
      <p>
        <span onClick={onMoveCreateHandler}>질문하기</span>
      </p>
    </MainStyle>
  );
};
export default ServiceQnAMain;
