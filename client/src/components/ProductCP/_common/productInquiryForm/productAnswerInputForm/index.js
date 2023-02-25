import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { MainStyle } from './style';
import { productAnswerPost } from '@reducer/productReducer';

const AnswerInputForm = ({ inquiryId, colorTheme, email, media, setAnswerCreate, setAnswer }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const onCancelHandler = (e) => {
    e.preventDefault();
    setContent('');
    setAnswerCreate(false);
  };

  const onPostHandler = useCallback(
    (e) => {
      e.preventDefault();
      setAnswerCreate(false);
      setAnswer(content);
      const data = {
        inquiryId: inquiryId,
        email: email,
        content: content,
      };
      dispatch(productAnswerPost({ data: data }));
    },
    [inquiryId, email, content, setAnswerCreate, setAnswer, dispatch],
  );

  return (
    <MainStyle colorTheme={colorTheme} media={media}>
      <div className="flexHeightCenter">
        <p>To answer</p>
        <div className="flexCenter">
          <p onClick={onCancelHandler}>취소</p>
          <p onClick={onPostHandler}>저장</p>
        </div>
      </div>
      <ReactTextareaAutosize
        value={content || ''}
        onChange={(e) => setContent(e.target.value)}
        spellCheck="false"
        placeholder="답변을 입력하세요"
        autoFocus
      />
    </MainStyle>
  );
};
export default AnswerInputForm;
