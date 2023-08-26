import { useNavigate, useParams } from 'react-router-dom';
import { useMedia } from '../../../hooks/useMedia';
import { MainPostViewrStyle } from './style';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import TextEditorViewer from '../../_common/textEditorViewer';
import { ThemeContext } from '../../../App';

const PostViewr = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  const postId = useParams().postId;
  const [postData, setPostData] = useState({
    CommunityComments: [],
    CommunityPostLikes: [],
    User: { nickName: '', id: 0 },
    id: postId,
    title: '',
    content: '<p></p>',
    createdAt: '0000-00-00T00:00:00.000Z',
    updatedAt: '0000-00-00T00:00:00.000Z',
  });
  const [date, upDataDtate] = useState('');
  const [likePush, setLikePush] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/community/one/${postId}`)
      .then((res) => {
        if (res.status == 200) {
          setPostData(res.data);

          const date = new Date(res.data.updatedAt);

          const year = date.getFullYear().toString().slice(2);
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');

          upDataDtate(`${year}.${month}.${day} ${hours}:${minutes}`);

          if (userData && res.data.CommunityPostLikes.some((like) => like.UserId === userData.id)) {
            setLikePush(true);
          }

          if (res.data.User.profileImg === '/img/profileImg/basicProfileImg.png') {
            if (colorTheme === 'game') {
              setProfileImage('/img/profileImg/gameProfileImg.webp');
            } else {
              setProfileImage('/img/profileImg/basicProfileImg.webp');
            }
          } else {
            setProfileImage(`/img/profileImg/uploads/${res.data.User.profileImg}`);
          }
          console.log(res.data);
        } else {
          alert('Error');
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  const likePushHandler = useCallback(() => {
    if (!userData) {
      return alert('로그인이 필요합니다.');
    }

    if (likePush) {
      // 좋아요 취소하기
      axios
        .delete(
          `${axiosInstance}api/community/delete/like/${
            postData.CommunityPostLikes.find((like) => like.UserId === userData.id)?.id
          }`,
        )
        .then((res) => {
          console.log(res);
          if (res.status === 403) {
            return alert('재 로그인이 필요합니다');
          }
          if (res.status === 201) {
            const updatedLikes = postData.CommunityPostLikes.filter(
              (like) => like.UserId !== userData.id,
            );

            setPostData({
              ...postData,
              CommunityPostLikes: updatedLikes,
            });
            setLikePush(false);
          }
          if (res.status === 202) {
            setLikePush(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 좋아요 누르기
      axios
        .post(`${axiosInstance}api/community/post/like`, {
          postId: postId,
          userId: userData.id,
        })
        .then((res) => {
          console.log(res);

          if (res.status === 202) {
            return setLikePush(true);
          }
          if (res.status === 201) {
            const updatedPostData = {
              ...postData,
              CommunityPostLikes: [...postData.CommunityPostLikes, res.data],
            };

            setPostData(updatedPostData);
            setLikePush(true);
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 403) {
            alert('재로그인이 필요합니다.');
            return window.location.reload();
          } else {
            // 기타 에러 처리 (예: 사용자에게 에러 메시지 표시)
            alert('오류가 발생했습니다. 다시 시도해주세요.');
          }
        });
    }
  }, [likePush, userData, postId, postData]);

  const postDeleteHandler = () => {
    if (!userData) {
      return alert('로그인이 필요합니다.');
    }

    if (postData.User.id !== userData.id) {
      if (userData.authority === 'admin') {
        // 권한이 "admin"인 경우 넘어가기
      } else {
        alert('삭제할 권한이 없습니다.');
        return;
      }
    }

    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${axiosInstance}api/community/delete/${postData.id}`)
        .then((res) => {
          if (res.status === 201) {
            alert('삭제되었습니다.');
            return navigate('/community');
          }
          if (res.status === 202) {
            alert('id값과 일치하는 Post 데이터가 없습니다');
            console.error(res);
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 403) {
            alert('재로그인이 필요합니다.');
            return window.location.reload();
          } else {
            // 기타 에러 처리 (예: 사용자에게 에러 메시지 표시)
            alert('오류가 발생했습니다. 다시 시도해주세요.');
          }
        });
    } else {
      return;
    }
  };

  const modifyHandler = () => {
    if (!userData) {
      return alert('로그인이 필요합니다.');
    }

    if (postData.User.id !== userData.id) {
      if (userData.authority === 'admin') {
        // 권한이 "admin"인 경우 넘어가기
      } else {
        alert('삭제할 권한이 없습니다.');
        return;
      }
    }

    return navigate(`/community/modify/${postData.id}`);
  };

  return (
    <MainPostViewrStyle colorTheme={colorTheme} media={media} profileImage={profileImage}>
      <div>
        <div className="flexHeightCenter">
          <div>{/* 이미지 */}</div>
          {postData.title}
        </div>
        <div className="flexHeightCenter">
          <p>
            {media.isPc && <span>id {postData.id}</span>}
            <span>
              <FontAwesomeIcon icon={solid('user')} className="icon" />
              {postData.User.nickName}
            </span>
            <span>
              <FontAwesomeIcon icon={solid('comment')} className="icon" />
              {postData.CommunityComments?.length}
            </span>
            <span>
              <FontAwesomeIcon icon={solid('thumbs-up')} className="icon" />
              {postData.CommunityPostLikes?.length}
            </span>
            {media.isPc && (
              <span>
                <FontAwesomeIcon icon={solid('clock')} className="icon" />
                {date}
              </span>
            )}
          </p>
          {userData && (userData.authority === 'admin' || postData.User.id == userData.id) && (
            <p>
              <span onClick={postDeleteHandler}>삭제</span>
              <span onClick={modifyHandler}>수정</span>
            </p>
          )}
        </div>
      </div>

      {/* content */}
      <div>
        <TextEditorViewer contents={postData.content} />
      </div>

      {/* 좋아요 */}
      <div
        onClick={likePushHandler}
        className="flexCenter"
        style={{ backgroundColor: likePush ? '#E3E3E3' : '#ffffff' }}
      >
        <p>
          <FontAwesomeIcon icon={solid('thumbs-up')} className="likeIcon" />
        </p>
        <p>{postData.CommunityPostLikes?.length}</p>
      </div>

      {/* 댓글 */}
      <div></div>
    </MainPostViewrStyle>
  );
};
export default PostViewr;
