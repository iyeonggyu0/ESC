import { useInput } from '@hooks/useInput';
import { useCallback, useState, useRef, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { useMedia } from '../../hooks/useMedia';
import { passwordUpdate } from '@reducer/userReducer';
import { encrypt } from '@util/crypto';
import { sendEmail } from '@reducer/userReducer';

import { FindPasswordMainStyle } from './style';

const FindPasswordMain = () => {
  // util
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const media = useMedia();

  // state hook
  const [email, onChangeEmail] = useInput('');
  const [userAuthCode, setUserAuthCode] = useState(''); //사용자 코드 입력
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');

  //사용자 코드입력값 비교 결과 ( 0: 발송 전 / 1: 후  )
  const [mailSend, setMailSend] = useState(0);

  const [error, setError] = useState(null);
  const authCode = useRef(null);

  useEffect(() => {
    if (pw.length > 0 && confirm.length > 0 && userAuthCode.length > 0) {
      if (confirm === pw && userAuthCode === authCode.current) {
        setError(false);
        return;
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [confirm, pw, userAuthCode]);

  const emailExp = useRef(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  );

  const pwExp = useRef(
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
  );

  // SendEmail dispatch
  const onSendEmailHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!emailExp.current.test(email)) {
        if (!alert('이메일 형식이 일치하지 않습니다')) {
          return;
        }
      }

      authCode.current = Math.random().toString(36).substr(2, 6);
      const data = {
        email: email,
        auth: encrypt(authCode.current, process.env.REACT_APP_USER_KEY),
        check: false,
      };
      dispatch(sendEmail({ data: data, setMailSend }));
    },
    // eslint-disable-next-line
    [email, dispatch],
  );

  const onFindHandler = useCallback(
    () => {
      if (!pwExp.current.test(pw)) {
        if (!alert('비밀번호 형식이 일치하지 않습니다 (대문자, 소문자, 특수문자 포함)')) {
          setPw('');
          setConfirm('');
          return;
        }
      }
      if (!emailExp.current.test(email)) {
        if (!alert('이메일 형식이 일치하지 않습니다')) {
          return;
        }
      }

      const data = {
        email: email,
        password: encrypt(pw, process.env.REACT_APP_USER_KEY),
      };
      dispatch(passwordUpdate({ data: data, navigate: navigate }));
    },
    // eslint-disable-next-line
    [pw, email, dispatch],
  );

  const onClickHandelr = (e) => {
    if (e.key === 'Enter') {
      if (error === false) {
        onFindHandler();
      }
    }
  };

  return (
    <FindPasswordMainStyle colorTheme={colorTheme} media={media} errorz={error}>
      <div>
        <p>FIND PASSWORD</p>
        <div>
          <input
            type="text"
            placeholder="EMAIL"
            autoComplete="off"
            vale={email}
            onChange={onChangeEmail}
            autoFocus
            style={{ width: '60%', pointerEvents: mailSend === 0 ? 'all' : 'none' }}
          />
          <div onClick={onSendEmailHandler}>발송</div>
        </div>
        <div>
          <input
            type="text"
            placeholder="인증코드"
            autoComplete="off"
            vale={userAuthCode}
            onChange={(e) => setUserAuthCode(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: userAuthCode.length !== 0 ? 'calc(50px - 1rem)' : '50px' }}>
          {userAuthCode !== authCode.current && userAuthCode.length !== 0 && <p>잘못된 인증코드</p>}
          {userAuthCode === authCode.current && userAuthCode.length !== 0 && <p>인증코드 일치</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="새 비밀번호"
            // 대문자, 소문자, 특수문자 포함 8자리 이상
            maxLength={16}
            autoComplete="off"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            style={{ marginBottom: '-30px' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            maxLength={16}
            autoComplete="off"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onKeyPress={onClickHandelr}
          />
        </div>
        <div
          style={{
            marginBottom: confirm.length !== 0 && confirm !== pw ? 'calc(50px - 1rem)' : '50px',
          }}
        >
          {confirm.length !== 0 && confirm !== pw && <p>일치하지 않습니다</p>}
        </div>
        <div onClick={onFindHandler} disabled={error}>
          저장
        </div>
      </div>
    </FindPasswordMainStyle>
  );
};
export default FindPasswordMain;
