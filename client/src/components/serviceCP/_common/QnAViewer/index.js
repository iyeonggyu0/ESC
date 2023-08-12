import { useMedia } from '../../../../hooks/useMedia';
import { MainStyle } from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDate } from '../../../../hooks/useDate';
import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from '../../../../App';
import TextEditorViewer from '../../../_common/textEditorViewer';
import { decrypt } from '@util/crypto';

const QnAViewer = ({ QnaData }) => {
  const media = useMedia();
  const userData = useContext(ThemeContext).userInfo.userData;
  const date = useDate(QnaData.createdAt);
  console.log(date);

  const atIndex = QnaData.email.indexOf('@'); // '@'의 인덱스 찾기
  const username = QnaData.email.slice(0, atIndex); // '@' 앞의 문자열 추출
  const maskedUsername = username
    .substring(0, Math.min(3, username.length))
    .padEnd(username.length, '*'); // 첫 3글자 '*'로 마스킹

  const [contentOpen, setContentOpen] = useState(false);
  const [decryptContents, setDecryptContents] = useState(QnaData.content);

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
      }

      setContentOpen(true);
    } else {
      setContentOpen(false);
    }
  }, [QnaData, userData, contentOpen]);

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
              <span>답변하기</span>
              <span>삭제</span>
              <span>수정</span>
            </p>
          </div>
          <TextEditorViewer contents={decryptContents} />
        </div>
      )}
    </MainStyle>
  );
};
export default QnAViewer;
