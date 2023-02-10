import ReactTextareaAutosize from 'react-textarea-autosize';
import { useInput } from '@hooks/useInput';

import { ListDiv } from './style';

const ReviewTextForm = ({ reviewData, userData, colorTheme, media }) => {
  const [content, onChangeContent] = useInput(reviewData.content);
  const Data = {
    nickName: reviewData.User.nickName,
    updatedAt: reviewData.updatedAt,
  };

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
          minRows={5}
        />
      </div>
    </ListDiv>
  );
};
export default ReviewTextForm;
