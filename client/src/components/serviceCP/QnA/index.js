import { useContext, useState } from 'react';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { MainStyle } from './style';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { axiosInstance } from '../../../util/axios';
import axios from 'axios';
import QnAViewer from '../_common/QnAViewer';

const ServiceQnAMain = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const navigate = useNavigate();
  // const userData = useContext(ThemeContext).userInfo.userData;
  const userData = useContext(ThemeContext).userInfo.userData;

  const [qnaData, setQnaData] = useState(null);

  const onMoveCreateHandler = () => {
    if (!userData) {
      return alert('로그인이 필요합니다');
    }
    navigate('/service/qna/create');
  };

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/service/get`)
      .then((res) => {
        setQnaData(res.data.reverse());
      })
      .catch((err) => console.error()(err));
  }, []);

  const reLoadingData = () => {
    if (userData && userData.authority !== 'admin') {
      return alert('권한이 없습니다.');
    }

    axios
      .get(`${axiosInstance}api/service/get`)
      .then((res) => {
        setQnaData(res.data.reverse());
      })
      .catch((err) => console.error()(err));
  };

  const removeItemById = (id) => {
    const updatedQnaData = qnaData.filter((item) => item.id !== id);
    setQnaData(updatedQnaData);
  };

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <p>Q & A</p>
      <p>
        <span onClick={onMoveCreateHandler}>질문하기</span>
      </p>
      {qnaData !== null && qnaData.length == 0 && (
        <div
          style={{ width: '100%', height: '80px', backgroundColor: '#F0F0F0', marginTop: '3vh' }}
          className="flexCenter"
        >
          작성된 Q&A가 없습니다
        </div>
      )}
      {qnaData !== null && qnaData.length > 0 && (
        <div>
          {qnaData.map((state, idx) => (
            <QnAViewer
              key={idx}
              QnaData={state}
              removeItemById={removeItemById}
              reLoadingData={reLoadingData}
            />
          ))}
        </div>
      )}
    </MainStyle>
  );
};
export default ServiceQnAMain;
