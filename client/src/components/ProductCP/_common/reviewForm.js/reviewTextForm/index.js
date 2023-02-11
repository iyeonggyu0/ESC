import ReactTextareaAutosize from 'react-textarea-autosize';
import { useInput } from '@hooks/useInput';
import { axiosInstance } from '@util/axios';
import { ListDiv } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useCallback, useEffect } from 'react';
import axios from 'axios';

const ReviewTextForm = ({ reviewData, userData, colorTheme, media }) => {
  const [content, onChangeContent] = useInput(reviewData.content);
  const Data = {
    nickName: reviewData.User.nickName,
    updatedAt: reviewData.updatedAt,
  };
  console.log(reviewData);
  const LikeAdd = useCallback((e) => {
    e.preventDefault();
    if (!userData) {
      if (!alert('로그인이 필요합니다.')) {
        return;
      }
      return;
    }

    const data = {
      type: 'add',
      ProductReviewId: reviewData.id,
      UserId: userData.id,
    };
    console.log(data);
    axios
      .post(`${axiosInstance}api/product/review/like`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // if (userData) {
    axios
      .post(`${axiosInstance}api/product/review/like`, {
        type: 'get',
        ProductReviewId: reviewData.id,
        // UserId: userData.id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    // }
  });

  return (
    <ListDiv colorTheme={colorTheme} media={media} reviewData={reviewData}>
      <div>
        <div>{/* 프로필 */}</div>
      </div>
      <div>
        <div>
          {Data.nickName}&nbsp;
          {Data.updatedAt
            .replace(
              /T[-_\.]?[0-9a-zA-Z]{2}:[-_\.]?[0-9a-zA-Z]{2}:[-_\.]?[0-9a-zA-Z]{2}.[0-9a-zA-Z]+/g,
              '',
            )
            .replace(/-/g, '/')}
        </div>
        <ReactTextareaAutosize
          value={content.replace(/[<br/>]{1}/g, '/n')}
          onChange={onChangeContent}
          spellcheck="false"
          minRows={5}
        />
        <div>
          <p>수정</p>
          <p>삭제</p>
          <FontAwesomeIcon icon={solid('thumbs-up')} />
          <FontAwesomeIcon onClick={LikeAdd} icon={regular('thumbs-up')} />
        </div>
      </div>
    </ListDiv>
  );
};
export default ReviewTextForm;
