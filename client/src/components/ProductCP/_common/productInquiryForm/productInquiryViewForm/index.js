import { useCallback, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { InquiryViewFormDiv } from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch } from 'react-redux';
import { productInquiryDelete, productInquiryPut } from '@reducer/productReducer';
import AnswerInputForm from '../productAnswerInputForm';
import AnswerViewForm from '../productAnswerViewForm';

const InquiryViewForm = ({ inquiryData, userData, colorTheme, media }) => {
  const [explanation, setExplanation] = useState(false);
  const [content, setContent] = useState(inquiryData.content);
  const [modifyMod, setModifyMod] = useState(false);
  const [answerCreate, setAnswerCreate] = useState(false);
  const [answer, setAnswer] = useState(inquiryData.ProductAnswer);
  const [title, setTitle] = useState(inquiryData.title);
  const [secret, setSecret] = useState(inquiryData.secret);
  const [inquiryType, setInquiryType] = useState(inquiryData.inquiryType);
  const dispatch = useDispatch();

  const explanationHandler = () => {
    if (!inquiryData.secret) {
      setExplanation(explanation ? false : true);
    }
    if (userData && inquiryData.secret) {
      if (userData.email === inquiryData.email) {
        setExplanation(explanation ? false : true);
      }
    }
  };

  const onModifyModHandler = useCallback((e) => {
    e.preventDefault();
    if (!userData) {
      return alert('로그인이 필요합니다.');
    }
    if (userData.email === inquiryData.email) {
      setModifyMod(true);
    }
    // eslint-disable-next-line
  }, []);

  const onCancelHandler = () => {
    setModifyMod(false);
    setContent(inquiryData.content);
  };

  const onDeleteHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (confirm('정말 삭제하시겠습니까??') == true) {
        dispatch(productInquiryDelete({ id: inquiryData.id }));
      } else {
        //취소
        return false;
      }
    },
    // eslint-disable-next-line
    [dispatch, inquiryData],
  );

  const onSaveHandler = useCallback(
    (e) => {
      e.preventDefault();
      setModifyMod(false);
      if (title.leght === 0) {
        if (!alert('TITLE을 입력해주세요')) {
          return;
        }
      }
      if (content.leght === 0) {
        if (!alert('CONTENT을 입력해주세요')) {
          return;
        }
      }

      if (!userData) {
        if (!alert('로그인이 필요합니다')) return;
      }

      const data = {
        id: inquiryData.id,
        title: title,
        secret: secret,
        content: content,
        inquiryType: inquiryType,
      };
      dispatch(productInquiryPut({ data: data }));
    },
    [title, secret, content, inquiryType, inquiryData, userData, dispatch],
  );

  return (
    <InquiryViewFormDiv
      inquiryData={inquiryData}
      userData={userData}
      colorTheme={colorTheme}
      media={media}
      explanation={explanation}
      modifyMod={modifyMod}
    >
      <div className="flexHeightCenter" onClick={explanationHandler}>
        <p>{inquiryData.id}</p>
        <p style={{ color: inquiryData.ProductAnswer === null ? 'gray' : '#70BA64' }}>
          {inquiryData.ProductAnswer === null ? '미답변' : '답변완료'}
        </p>
        {inquiryData.inquiryType === 'product' && <p>상품</p>}
        {inquiryData.inquiryType === 'shipping' && <p>배송</p>}
        {inquiryData.inquiryType === 'exchange' && <p>교환</p>}
        {inquiryData.inquiryType === 'refund' && <p>반품/취소/환불</p>}
        {inquiryData.inquiryType === 'etc' && <p>기타</p>}
        <p>
          {inquiryData.title}
          {inquiryData.secret && <FontAwesomeIcon icon={solid('lock')} className={'icon'} />}
        </p>
        <p>
          {media.isPc &&
            inquiryData.email
              .toString()
              .replace(/@[a-zA-Z]+.[a-zA-Z]+/g, '')
              .replaceAll(/[a-zA-Z0-9]{1,4}$/g, '***')}
          {userData && inquiryData.email === userData.email && (
            <FontAwesomeIcon icon={solid('check')} className={'icon2'} />
          )}
          {!media.isPc && <FontAwesomeIcon icon={solid('xmark')} style={{ color: 'gray' }} />}
        </p>
      </div>
      {explanation && (
        <div>
          <div className="flexHeightCenter">
            <p>
              {modifyMod && 'TITLE'}
              {!modifyMod && 'CONTENT'}
            </p>
            {userData && userData.email === inquiryData.email && (
              <div className="flexCenter">
                {userData && userData.authority === 'admin' && !answerCreate && !answer && (
                  <p onClick={() => setAnswerCreate(true)}>답변</p>
                )}
                <p onClick={onDeleteHandler}>삭제</p>
                {!modifyMod && <p onClick={onModifyModHandler}>수정</p>}
                {modifyMod && <p onClick={onCancelHandler}>취소</p>}
                {modifyMod && <p onClick={onSaveHandler}>저장</p>}
              </div>
            )}
          </div>
          <div>
            {modifyMod && (
              <div className="inputDiv">
                <input
                  type="text"
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  autoComplete="off"
                  autoFocus
                />
              </div>
            )}
            {modifyMod && <p>CONTENT</p>}
            <ReactTextareaAutosize
              value={content || ''}
              onChange={(e) => setContent(e.target.value)}
              spellCheck="false"
              placeholder="도배성 질문은 삭제될 수 있습니다."
            />
          </div>
          {modifyMod && (
            <div className="flexHeightCenter">
              <div className="flexCenter">
                <p>문의유형</p>
                <select
                  name="inquiryType"
                  onChange={(e) => {
                    setInquiryType(e.target.value);
                  }}
                >
                  {inquiryData.inquiryType === 'product' && <option value="product">상품</option>}
                  {inquiryData.inquiryType === 'shipping' && <option value="shipping">배송</option>}
                  {inquiryData.inquiryType === 'exchange' && <option value="exchange">교환</option>}
                  {inquiryData.inquiryType === 'refund' && (
                    <option value="refund">반품/취소/환불</option>
                  )}
                  {inquiryData.inquiryType === 'etc' && <option value="etc">기타</option>}
                  <option value="product">상품</option>
                  <option value="shipping">배송</option>
                  <option value="exchange">교환</option>
                  <option value="refund">반품/취소/환불</option>
                  <option value="etc">기타</option>
                </select>
              </div>
              <div className="flexCenter">
                <p onClick={() => setSecret(true)} style={{ color: secret ? 'black' : 'gray' }}>
                  비밀글
                </p>
                <p onClick={() => setSecret(false)} style={{ color: !secret ? 'black' : 'gray' }}>
                  공개글
                </p>
              </div>
            </div>
          )}
          {answerCreate && (
            <AnswerInputForm
              inquiryId={inquiryData.id}
              email={userData.email}
              colorTheme={colorTheme}
              media={media}
              setAnswerCreate={setAnswerCreate}
              setAnswer={setAnswer}
            />
          )}
          {answer && (
            <AnswerViewForm
              userData={userData}
              answer={answer}
              colorTheme={colorTheme}
              media={media}
            />
          )}
        </div>
      )}
    </InquiryViewFormDiv>
  );
};
export default InquiryViewForm;
