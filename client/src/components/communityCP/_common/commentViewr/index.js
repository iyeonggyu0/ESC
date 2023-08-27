import { useCallback, useEffect, useState } from 'react';
import { CommentViewrMainStyle } from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import TextareaAutosize from 'react-textarea-autosize';
import { useInput } from '@hooks/useInput';
import axios from 'axios';
import { axiosInstance } from '../../../../util/axios';
import { useParams } from 'react-router-dom';

const CommentViewr = ({ state, colorTheme, media, userData }) => {
  const [date, upDataDtate] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [likePush, setLikePush] = useState(false);
  const [likeList, setLikeList] = useState(state.CommunityCommentLikes);
  const [modifyMod, setModifyMod] = useState(false);
  const [content, onChangeContent, setContent] = useInput(state.content);
  const postId = useParams().postId;

  useEffect(() => {
    const date = new Date(state.createdAt);

    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    upDataDtate(`${year}.${month}.${day} ${hours}:${minutes}`);
    if (userData && state.CommunityCommentLikes.some((like) => like.UserId === userData.id)) {
      setLikePush(true);
    }

    if (state.User.profileImg === '/img/profileImg/basicProfileImg.png') {
      if (colorTheme === 'game') {
        setProfileImage('/img/profileImg/gameProfileImg.webp');
      } else {
        setProfileImage('/img/profileImg/basicProfileImg.webp');
      }
    } else {
      setProfileImage(`/img/profileImg/uploads/${state.User.profileImg}`);
    }
  }, [state, colorTheme, userData]);

  const modifySaveHandler = useCallback(() => {
    if (!modifyMod) {
      return alert('저장 가능한 모드가 아닙니다.');
    }

    if (!userData) {
      return alert('로그인이 필요합니다.');
    }

    if (content.length < 5) {
      return alert('다섯 자리 이상 작성해 주세요');
    }

    if (content === state.content) {
      return alert('달라진 내용이 없습니다.');
    }

    if (state.User.id !== userData.id) {
      if (userData.authority === 'admin') {
        // 권한이 "admin"인 경우 넘어가기
      } else {
        alert('삭제할 권한이 없습니다.');
        return;
      }
    }
    if (window.confirm('수정 사항을 저장하시겠습니까?')) {
      axios
        .patch(`${axiosInstance}api/community/modify/comment/save`, {
          commentId: state.id,
          content: content,
        })
        .then((res) => {
          if (res.status === 200) {
            setModifyMod(false);
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
  }, [modifyMod, content, userData, state]);

  const modifyCancelHandler = () => {
    if (window.confirm('수정 사항을 취소하시겠습니까?')) {
      setContent(state.content);
      setModifyMod(false);
    }
  };

  const likePushHandler = useCallback(() => {
    if (!userData) {
      return alert('로그인이 필요합니다.');
    }

    if (likePush) {
      // 좋아요 취소하기
      axios
        .delete(
          `${axiosInstance}api/community/delete/comment/like/${
            likeList.find((like) => like.UserId === userData.id)?.id
          }`,
        )
        .then((res) => {
          if (res.status === 201) {
            const updatedLikes = likeList.filter((like) => like.UserId !== userData.id);
            setLikeList(updatedLikes);
            setLikePush(false);
          } else if (res.status === 202) {
            setLikePush(false);
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
      // 좋아요 누르기
      axios
        .post(`${axiosInstance}api/community/post/comment/like`, {
          postId: postId,
          commentId: state.id,
          userId: userData.id,
        })
        .then((res) => {
          if (res.status === 202) {
            return setLikePush(true);
          }
          if (res.status === 201) {
            const updatedPostData = [...likeList, res.data];
            setLikeList(updatedPostData);
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
  }, [likePush, userData, postId, state, likeList]);

  return (
    <CommentViewrMainStyle
      modifyMod={modifyMod}
      colorTheme={colorTheme}
      media={media}
      profileImage={profileImage}
    >
      <div>{/* 이미지 원 */}</div>
      <div>
        <div className="flexHeightCenter">
          <p>
            {state.User.nickName}
            <span>
              <FontAwesomeIcon icon={solid('clock')} className="icon" />
              {date}
            </span>
            <span>
              {(state.createdAt !== state.updatedAt || content !== state.content) && '(수정됨)'}
            </span>
          </p>
          {/* {userData && (userData.email === state.email || userData.authority === 'admin') && ( */}
          <p>
            {!modifyMod && <span onClick={() => setModifyMod(true)}>수정</span>}
            {modifyMod && <span onClick={modifySaveHandler}>저장</span>}
            {modifyMod && <span onClick={modifyCancelHandler}>취소</span>}
            <span>삭제</span>
          </p>
          {/* )} */}
        </div>

        <div>
          {/* content */}
          <TextareaAutosize
            value={content}
            onChange={onChangeContent}
            minRows={4}
            spellCheck="false"
            placeholder="욕설이 섞이거나 부적절한 댓글은 삭제될 수 있습니다."
          />
        </div>
        <div className="flexHeightCenter">
          <p
            onClick={likePushHandler}
            className="flexCenter"
            style={{ backgroundColor: likePush ? 'lightgray' : '#fff' }}
          >
            <FontAwesomeIcon icon={solid('thumbs-up')} className="likeIcon" />
            {likeList?.length || 0}
          </p>
        </div>
      </div>
    </CommentViewrMainStyle>
  );
};
export default CommentViewr;
