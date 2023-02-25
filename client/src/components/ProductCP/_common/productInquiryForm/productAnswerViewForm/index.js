import { MainStyle } from './style';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch } from 'react-redux';
import { productAnswerDelete, productAnswerPut } from '@reducer/productReducer';

const AnswerViewForm = ({ answer, colorTheme, media, userData }) => {
  const [modifyMod, setModifyMod] = useState(false);
  const [content, setContent] = useState(answer.content);
  const dispatch = useDispatch();

  const onModifyModHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!userData) {
        return alert('로그인이 필요합니다.');
      }
      if (userData.authority === 'admin') {
        setModifyMod(true);
      }
    },
    [userData],
  );

  const onDeleteHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (confirm('정말 삭제하시겠습니까??') == true) {
        if (!answer || !answer.id) {
          return;
        }
        dispatch(productAnswerDelete({ id: answer.id }));
        setModifyMod(false);
      } else {
        //취소
        return false;
      }
    },
    [answer, dispatch],
  );

  const onCancelHandler = useCallback(
    (e) => {
      e.preventDefault();
      setModifyMod(false);
      setContent(answer.content);
    },
    [answer],
  );

  const onSaveHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (content.leght === 0) {
        if (!alert('CONTENT을 입력해주세요')) {
          return;
        }
      }
      const data = {
        content: content,
        id: answer.id,
      };
      console.log(data);
      setModifyMod(false);
      dispatch(productAnswerPut({ data: data }));
    },
    [content, answer, dispatch],
  );

  return (
    <MainStyle colorTheme={colorTheme} media={media} modifyMod={modifyMod}>
      <div className="flexCenter">
        <p>
          <FontAwesomeIcon icon={solid('arrow-right')} className={'arrowIcon'} />
          &nbsp; ANSWER
        </p>
        {userData && userData.authority === 'admin' && (
          <div className="flexCenter">
            <p onClick={onDeleteHandler}>삭제</p>
            {!modifyMod && <p onClick={onModifyModHandler}>수정</p>}
            {modifyMod && <p onClick={onCancelHandler}>취소</p>}
            {modifyMod && <p onClick={onSaveHandler}>저장</p>}
          </div>
        )}
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
export default AnswerViewForm;
