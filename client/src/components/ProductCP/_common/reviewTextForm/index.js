import ReactTextareaAutosize from 'react-textarea-autosize';
import { useInput } from '@hooks/useInput';
import { axiosInstance } from '@util/axios';
import { ListDiv, ButtonForm, ModifyButtonForm } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { productReviewDelete, productReviewPut } from '@reducer/productReducer';

const ReviewTextForm = ({ reviewData, userData, colorTheme, media }) => {
  const [content, onChangeContent, setContent] = useInput(reviewData.content);
  const [like, setLike] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [modify, setModify] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [grade, setGrade] = useState(reviewData.reviewerGrade);
  const dispatch = useDispatch();

  const Data = {
    nickName: reviewData.User.nickName,
    updatedAt: reviewData.updatedAt,
  };

  useEffect(() => {
    if (
      reviewData.User.profileImg === '/img/profileImg/basicProfileImg.webp' &&
      colorTheme === 'game'
    ) {
      setProfileImg('/img/profileImg/gameProfileImg.webp');
    } else setProfileImg(`"/img/profileImg/uploads/${reviewData.User.profileImg}"`);
    // eslint-disable-next-line
  }, [reviewData, colorTheme]);

  useEffect(() => {
    if (userData) {
      axios
        .post(`${axiosInstance}api/product/review/like`, {
          type: 'get',
          ProductReviewId: reviewData.id,
          UserEmail: userData.email,
        })
        .then((res) => {
          setLike(res.data.result);
          setLikeNum(res.data.like);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, [userData, axiosInstance, reviewData]);

  const ModifyCancel = () => {
    setModify(false);
    setContent(reviewData.content);
    setGrade(reviewData.reviewerGrade);
  };

  // Handler

  //삭제
  const onDeleteHandler = useCallback((e) => {
    e.preventDefault();
    const data = {
      reviewId: reviewData.id,
    };
    if (!alert('리뷰를 삭제합니다.')) {
      dispatch(productReviewDelete({ data: data }));
    }
    // eslint-disable-next-line
  }, []);

  //좋아요
  const onLikeHandler = useCallback((e, text) => {
    e.preventDefault();
    if (!userData) {
      if (!alert('로그인이 필요합니다.')) {
        return;
      }
      return;
    }
    const data = {
      type: `${text}`,
      ProductReviewId: reviewData.id,
      UserEmail: userData.email,
    };
    axios
      .post(`${axiosInstance}api/product/review/like`, data)
      .then((res) => {
        setLike(res.data.result);
        setLikeNum(res.data.like);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  const onModifyHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (content.length === 0) {
        if (!alert('수정될 내용을 입력해주세요.')) {
          return;
        }
      }

      setModify(false);

      const data = {
        content: content === reviewData.content ? null : content,
        reviewerGrade: grade === reviewData.reviewerGrade ? null : grade,
        reviewId: reviewData.id,
      };

      dispatch(productReviewPut({ data: data }));
    },
    // eslint-disable-next-line
    [content, grade, reviewData, userData, dispatch],
  );

  return (
    <ListDiv
      colorTheme={colorTheme}
      media={media}
      reviewData={reviewData}
      profileImg={profileImg}
      modify={modify}
    >
      <div>{media.isPc && <div>{/* 프로필 */}</div>}</div>
      <div>
        <div>
          <p style={{ pointerEvents: modify ? 'all' : 'none' }}>
            {Data.nickName}&nbsp;&nbsp;
            <FontAwesomeIcon
              icon={solid('star')}
              onClick={() => setGrade(1)}
              style={{ color: grade >= 1 ? 'black' : 'gray' }}
            />
            <FontAwesomeIcon
              icon={solid('star')}
              onClick={() => setGrade(2)}
              style={{ color: grade >= 2 ? 'black' : 'gray' }}
            />
            <FontAwesomeIcon
              icon={solid('star')}
              onClick={() => setGrade(3)}
              style={{ color: grade >= 3 ? 'black' : 'gray' }}
            />
            <FontAwesomeIcon
              icon={solid('star')}
              onClick={() => setGrade(4)}
              style={{ color: grade >= 4 ? 'black' : 'gray' }}
            />
            <FontAwesomeIcon
              icon={solid('star')}
              onClick={() => setGrade(5)}
              style={{ color: grade >= 5 ? 'black' : 'gray' }}
            />
          </p>
          <p>
            {Data.updatedAt
              .replace(
                /T[-_\.]?[0-9a-zA-Z]{2}:[-_\.]?[0-9a-zA-Z]{2}:[-_\.]?[0-9a-zA-Z]{2}.[0-9a-zA-Z]+/g,
                '',
              )
              .replace(/-/g, ' / ')}
          </p>
        </div>
        <div>
          <ReactTextareaAutosize
            value={content.replace(/[<br/>]{1}/g, '/n')}
            onChange={onChangeContent}
            spellCheck="false"
            minRows={5}
          />
          {modify && <ButtonForm onClick={onModifyHandler}>저장</ButtonForm>}
        </div>
        <div>
          {userData && (
            <>
              {userData.email === reviewData.User.email && (
                <ModifyButtonForm>
                  {!modify && <p onClick={() => setModify(true)}>수정</p>}
                  {modify && <p onClick={ModifyCancel}>취소</p>}
                  <p onClick={onDeleteHandler}>삭제</p>
                </ModifyButtonForm>
              )}
            </>
          )}
          <p>{likeNum}</p>
          {like && (
            <FontAwesomeIcon onClick={(e) => onLikeHandler(e, 'minus')} icon={solid('thumbs-up')} />
          )}
          {!like && (
            <FontAwesomeIcon onClick={(e) => onLikeHandler(e, 'add')} icon={regular('thumbs-up')} />
          )}
        </div>
      </div>
    </ListDiv>
  );
};
export default ReviewTextForm;
