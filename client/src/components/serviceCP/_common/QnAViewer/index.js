import { useMedia } from '../../../../hooks/useMedia';
import { MainStyle } from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDate } from '../../../../hooks/useDate';
import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from '../../../../App';
import TextEditorViewer from '../../../_common/textEditorViewer';
import { decrypt } from '@util/crypto';
import axios from 'axios';
import { axiosInstance } from '../../../../util/axios';
import TextEditorInCommunity from '../../../_common/textEditorCommunity';
import { encrypt } from '@util/crypto';

const QnAViewer = ({ QnaData, removeItemById, reLoadingData }) => {
  const media = useMedia();
  const userData = useContext(ThemeContext).userInfo.userData;
  const date = useDate(QnaData.createdAt);

  const atIndex = QnaData.email.indexOf('@'); // '@'의 인덱스 찾기
  const username = QnaData.email.slice(0, atIndex); // '@' 앞의 문자열 추출
  const maskedUsername = username
    .substring(0, Math.min(3, username.length))
    .padEnd(username.length, '*'); // 첫 3글자 '*'로 마스킹

  const [contentOpen, setContentOpen] = useState(false);
  const [decryptContents, setDecryptContents] = useState(QnaData.content);
  const [decryptAnswerContents, setDecryptAnswerContents] = useState(null);

  const onClickHandler = useCallback(() => {
    if (QnaData.secret && !userData) {
      return;
    }

    if (QnaData.secret && userData.email !== QnaData.email) {
      return;
    }

    if (!contentOpen) {
      if (QnaData.secret) {
        const data = decrypt(QnaData.content, process.env.REACT_APP_USER_KEY);
        setDecryptContents(data);

        if (QnaData.ServiceAnswer) {
          const data2 = decrypt(QnaData.ServiceAnswer.content, process.env.REACT_APP_USER_KEY);
          setDecryptAnswerContents(data2);
        }
      } else {
        if (QnaData.ServiceAnswer) {
          setDecryptAnswerContents(QnaData.ServiceAnswer.content);
        }
      }

      setContentOpen(true);
    } else {
      setContentOpen(false);
    }
  }, [QnaData, userData, contentOpen]);

  const onDeleteHandler = useCallback(() => {
    if (!contentOpen) {
      return alert('열려있지 않은 질문입니다.');
    }

    if (userData && (userData.email !== QnaData.email || userData.authority !== 'admin')) {
      return alert('권한이 없습니다.');
    }

    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${axiosInstance}api/service/delete/inquiry/${QnaData.id}`)
        .then((res) => {
          if (res.status === 403) {
            return alert('재로그인이 필요합니다');
          }

          if (res.status === 201) {
            setContentOpen(false);
            return removeItemById(QnaData.id);
          }
        })
        .catch((err) => console.error(err));
    } else {
      return alert('취소되었습니다.');
    }
  }, [contentOpen, userData, QnaData, removeItemById]);

  //
  //
  // 답변 생성
  const [answerCreateOpen, setAnswerCreateOpen] = useState(false);
  const [answerContents, setAnswerContents] = useState('');

  const onAnswerHandler = useCallback(() => {
    if (!userData) return alert('로그인이 필요합니다');
    if (userData && userData.authority !== 'admin') return alert('어드민 권한이 업습니다');

    setContentOpen(true);
    setAnswerCreateOpen(true);
  }, [userData]);

  const textDataFun = (text) => {
    setAnswerContents(`${text}`);
  };

  const answerCancelHandler = () => {
    if (userData && (userData.email !== QnaData.email || userData.authority !== 'admin')) {
      return alert('권한이 없습니다.');
    }

    setAnswerContents('');
    setAnswerCreateOpen(false);
  };

  const answerSaveHandler = useCallback(() => {
    if (userData && (userData.email !== QnaData.email || userData.authority !== 'admin')) {
      return alert('권한이 없습니다.');
    }

    if (window.confirm('저장하시겠습니까?')) {
      const content = QnaData.secret
        ? encrypt(answerContents, process.env.REACT_APP_USER_KEY)
        : answerContents;

      const data = {
        inquiryId: QnaData.id,
        email: userData.email,
        contents: content,
      };

      axios
        .post(`${axiosInstance}api/service/answer/post`, data)
        .then((res) => {
          console.log(res);
          if (res.status === 403) {
            return alert('재로그인이 필요합니다');
          }

          if (res.status === 201) {
            reLoadingData();
            setAnswerCreateOpen(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [QnaData, userData, answerContents, reLoadingData]);

  const onDeleteAnswerHandler = () => {
    if (userData && (userData.email !== QnaData.email || userData.authority !== 'admin')) {
      return alert('권한이 없습니다.');
    }

    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${axiosInstance}api/service/delete/answer/${QnaData.id}`)
        .then((res) => {
          console.log(res);
          if (res.status === 403) {
            return alert('재로그인이 필요합니다');
          }

          if (res.status === 201) {
            reLoadingData();
            setDecryptAnswerContents(null);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <MainStyle media={media}>
      <div
        className="flexHeightCenter"
        style={{
          cursor:
            (userData && userData.email == QnaData.email) || !QnaData.secret ? 'pointer' : 'auto',
        }}
        onClick={onClickHandler}
      >
        {media.isPc && <p>{QnaData.id}</p>}
        {media.isPc && <p>{QnaData.inquiryType}</p>}
        <p>
          {QnaData.title}
          {QnaData.secret && <FontAwesomeIcon icon={solid('lock')} className="icon" />}
          {userData && userData.email == QnaData.email && <span>*</span>}
        </p>
        <p>
          {QnaData.ServiceAnswer && <span style={{ color: '#8BD48E' }}>완료</span>}
          {!QnaData.ServiceAnswer && <span>대기</span>}
        </p>
        {media.isPc && <p>{maskedUsername}</p>}
        {media.isPc && <p>{date}</p>}
      </div>
      {contentOpen && (
        <div>
          <div className="flexHeightCenter">
            <p>질문 내용:</p>
            <p>
              {userData &&
                userData.authority == 'admin' &&
                !answerCreateOpen &&
                QnaData.ServiceAnswer === null && <span onClick={onAnswerHandler}>답변하기</span>}
              {userData && (userData.email == QnaData.email || userData.authority == 'admin') && (
                <span onClick={onDeleteHandler}>삭제</span>
              )}
            </p>
          </div>
          <TextEditorViewer contents={decryptContents} />
        </div>
      )}
      {contentOpen && decryptAnswerContents !== null && (
        <div className="answerDiv">
          <div className="flexHeightCenter">
            <p>└ 남겨진 답변 입니다 :</p>
            {userData && userData.authority == 'admin' && (
              <p onClick={onDeleteAnswerHandler}>삭제</p>
            )}
          </div>

          <TextEditorViewer contents={decryptAnswerContents} />
        </div>
      )}
      {contentOpen && answerCreateOpen && (
        <div className="answerCreateDiv">
          <p>└ 답변 작성:</p>
          <TextEditorInCommunity textDataFun={textDataFun} />
          <div className="flexHeightCenter">
            <span onClick={answerCancelHandler}>취소</span>
            <span onClick={answerSaveHandler}>저장</span>
          </div>
        </div>
      )}
    </MainStyle>
  );
};
export default QnAViewer;
