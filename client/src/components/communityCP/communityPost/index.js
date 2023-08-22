import { useCallback, useContext } from 'react';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { MainStyle } from './style';
import { useState } from 'react';
// import TextEditor from '../../_common/textEditor';
import TextEditorInCommunity from '../../_common/textEditorCommunity';
import { axiosInstance } from '../../../util/axios';
import axios from 'axios';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';

const CommunityPost = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const onTitleHandler = (event) => {
    if (event.target.value.length > 35) {
      return;
    }
    setTitle(event.target.value);
  };

  const contentsInput = (text) => {
    setContents(`${text}`);
  };

  const saveHandler = useCallback(() => {
    if (!userData) {
      return alert('재로그인이 필요합니다');
    }

    if (title.replace(/ /g, '').length === 0) {
      return alert('제목을 입력하세요');
    }

    if (contents.replace(/ /g, '').length < 100) {
      return alert('내용은 100글자 이상이어야 합니다');
    }

    const data = {
      email: userData.email,
      title: title,
      contents: contents,
    };

    axios
      .post(`${axiosInstance}api/community/post`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 403) {
          return alert('재로그인이 필요합니다.');
        }

        if (res.status === 201) {
          alert('글이 작성되었습니다.');
          return navigate('/community');
        }
      })
      .catch((err) => console.error(err));

    console.log(data);
  }, [title, contents, userData, navigate]);

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <p>Post</p>
      <div>
        <p>제목{media.isMobile && <span className="isMobile">{title.length}/35</span>}</p>
        <div>
          <input type="text" value={title} onChange={onTitleHandler} />
          {media.isPc && <span className="isPc">{title.length}/35</span>}
        </div>
      </div>
      <div>
        <p>본문 내용</p>
        <TextEditorInCommunity textDataFun={contentsInput} />
      </div>
      <div onClick={saveHandler} className="flexCenter">
        저장
      </div>
    </MainStyle>
  );
};
export default CommunityPost;
