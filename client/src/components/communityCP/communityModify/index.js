import { useCallback, useContext, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';

const CommunityModify = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [postData, setPostData] = useState({});
  const postId = useParams().postId;

  useEffect(() => {
    if (!userData) {
      navigate(`/community/${postId}`);
      return alert('로그인이 필요합니다');
    }

    axios
      .get(`${axiosInstance}api/community/modify/get/${postId}/${userData.email}`)
      .then((res) => {
        if (res.status == 200) {
          setPostData(res.data);
          setTitle(res.data.title);
          setContents(res.data.content);

          console.log(res.data);
        } else {
          alert('Error');
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 403) {
          alert('재로그인이 필요합니다.');
          navigate(`/community/${postId}`);
          return window.location.reload();
        } else {
          // 기타 에러 처리 (예: 사용자에게 에러 메시지 표시)
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      });
    // eslint-disable-next-line
  }, []);

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

    if (contents.replace(/ /g, '').length < 30) {
      return alert('내용은 30글자 이상이어야 합니다');
    }

    if (postData.email !== userData.email) {
      if (userData.authority === 'admin') {
        // 권한이 "admin"인 경우 넘어가기
      } else {
        alert('수정할 권한이 없습니다.');
        return;
      }
    }

    const data = {
      postId: postData.id,
      email: userData.email,
      title: title,
      contents: contents,
    };

    axios
      .patch(`${axiosInstance}api/community/modify/save`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 202) {
          alert('실패');
          return navigate(`/community/${postId}`);
        }

        if (res.status === 201) {
          alert('글이 수정되었습니다.');
          return navigate(`/community/${postId}`);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 403) {
          alert('재로그인이 필요합니다.');
          navigate(`/community/${postId}`);
          return window.location.reload();
        } else {
          // 기타 에러 처리 (예: 사용자에게 에러 메시지 표시)
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      });

    console.log(data);
  }, [title, contents, userData, navigate, postId, postData]);

  const cancellationHandler = () => {
    alert('취소되었습니다.');
    navigate(`/community/${postId}`);
  };

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <p>Modify - {postId}</p>
      <div>
        <p>제목{media.isMobile && <span className="isMobile">{title.length}/35</span>}</p>
        <div>
          <input type="text" value={title} onChange={onTitleHandler} />
          {media.isPc && <span className="isPc">{title.length}/35</span>}
        </div>
      </div>
      <div>
        <p>본문 내용</p>
        <TextEditorInCommunity textDataFun={contentsInput} basicData={contents} />
      </div>
      <div className="flexHeightCenter">
        <div onClick={cancellationHandler} className="flexCenter">
          취소
        </div>
        <div onClick={saveHandler} className="flexCenter">
          저장
        </div>
      </div>
    </MainStyle>
  );
};
export default CommunityModify;
