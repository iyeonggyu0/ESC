import { useContext, useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { useDispatch } from 'react-redux';
import { sendEmail } from '@reducer/userReducer';
import { putData } from '@reducer/userReducer';
import { encrypt } from '@util/crypto';

import { MyPageMainStyle, InputDivfixed, InputDiv, EmailSendDiv, Checkbox, Button } from './style';

const MyPageMain = () => {
  const media = useMedia();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  // data
  const [email, setEmail] = useState(userData.email);
  const [nick, setNick] = useState(userData.nickName);
  const [pw, setPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirm, setConfirm] = useState('');

  // check state
  const [snsFlag, setSNS] = useState(userData.snsFlag);

  const SnsChange = () => {
    setSNS(snsFlag === true ? false : true);
    console.log(snsFlag);
  };

  const [error, setError] = useState(null);

  const emailCGCheck = useRef(null);
  const authCode = useRef(null);
  const [userAuthCode, setUserAuthCode] = useState(''); //사용자 코드 입력
  const [mailSend, setMailSend] = useState(0);

  // exp
  const pwExp = useRef(
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
  );

  const emailExp = useRef(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  );

  const onSendEmailHandler = useCallback(
    () => {
      if (!emailExp.current.test(email)) {
        if (!alert('이메일 형식이 일치하지 않습니다')) {
          return;
        }
      }

      if (email === userData.email) {
        if (!alert('기존 메일과 동일합니다.')) {
          return;
        }
      }

      authCode.current = Math.random().toString(36).substr(2, 6);
      const data = {
        email: email,
        auth: encrypt(authCode.current, process.env.REACT_APP_USER_KEY),
        check: true,
      };
      dispatch(sendEmail({ data: data, setMailSend }));
    },
    // eslint-disable-next-line
    [email, dispatch],
  );

  useEffect(() => {
    if (email === userData.email) {
      emailCGCheck.current = false;
    } else if (email !== userData.email) {
      emailCGCheck.current = true;
    }
    // eslint-disable-next-line
  }, [email]);

  const onClickHandelr = (e) => {
    if (e.key === 'Enter') {
      onSendEmailHandler();
    }
  };

  useEffect(() => {
    if (
      userAuthCode === authCode.current ||
      (nick.length > 0 && nick !== userData.nickName) ||
      (confirm === newPw && pw.length > 0 && newPw.length > 0 && confirm.length > 0)
    ) {
      setError(false);
      return;
    } else {
      setError(true);
    }
  }, [confirm, pw, userAuthCode, authCode, newPw, nick]);

  const onCrystalHandler = useCallback(
    () => {
      if (pw.length > 0 && newPw.length > 0 && confirm.length > 0) {
        if (!pwExp.current.test(newPw)) {
          if (!alert('비밀번호 형식이 일치하지 않습니다 (대문자, 소문자, 특수문자 포함)')) {
            setNewPw('');
            setConfirm('');
            return;
          }
        }
      }

      if (email !== userData.email) {
        if (!emailExp.current.test(email)) {
          if (!alert('이메일 형식이 일치하지 않습니다')) {
            setEmail('');
            return;
          }
        }
      }
      console.log('실행');

      const data = {
        email: userData.email,
        newEmail: email,
        nickname: nick,
        password: encrypt(pw, process.env.REACT_APP_USER_KEY),
        newPassword: encrypt(newPw, process.env.REACT_APP_USER_KEY),
        snsFlag: snsFlag,
      };
      dispatch(putData({ data: data }));
    },
    // eslint-disable-next-line
    [pw, email, nick, snsFlag, newPw, dispatch],
  );

  return (
    <MyPageMainStyle colorTheme={colorTheme} media={media} snsFlagg={snsFlag}>
      <div>
        <p>My Profile</p>
        <InputDivfixed style={{ marginTop: '3%' }}>
          <p>NAME</p>
          <input
            type="text"
            placeholder=""
            autoComplete="off"
            defaultValue={userData.userName}
            // onChange={}
          />
        </InputDivfixed>

        <InputDiv style={{ marginTop: '5%' }}>
          <p>NICK</p>
          <input
            type="text"
            placeholder=""
            autoComplete="off"
            defaultValue={nick}
            onChange={(e) => setNick(e.target.value)}
          />
        </InputDiv>

        <InputDiv style={{ marginTop: '5%' }}>
          <p>EMAIL</p>
          <input
            type="text"
            placeholder=""
            autoComplete="off"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              pointerEvents: mailSend === 0 ? 'all' : 'none',
            }}
            onKeyPress={onClickHandelr}
          />
        </InputDiv>

        <EmailSendDiv media={media} emailCheck={emailCGCheck.current}>
          <div onClick={onSendEmailHandler}>발송</div>
          <input
            type="text"
            placeholder="인증코드"
            autoComplete="off"
            value={userAuthCode}
            onChange={(e) => setUserAuthCode(e.target.value)}
          />
        </EmailSendDiv>
        <div>
          {userAuthCode !== authCode.current && userAuthCode.length !== 0 && <p>잘못된 인증코드</p>}
          {userAuthCode === authCode.current && userAuthCode.length !== 0 && <p>인증코드 일치</p>}
        </div>
        <InputDivfixed style={{ marginTop: userAuthCode.length !== 0 ? 'calc(5% - 1rem)' : '5%' }}>
          <p>전화번호</p>
          <input
            type="text"
            placeholder=""
            autoComplete="off"
            defaultValue={userData.hpNumber}
            // onChange={}
          />
        </InputDivfixed>
        <InputDiv style={{ marginTop: '5%' }}>
          <p>기존 비밀번호</p>
          <input
            type="password"
            placeholder=""
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoComplete="off"
          />
        </InputDiv>
        <InputDiv style={{ marginTop: '25px' }}>
          <p>신규 비밀번호</p>
          <input
            type="password"
            placeholder=""
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            autoComplete="off"
          />
        </InputDiv>
        <InputDiv style={{ marginTop: '15px' }}>
          <p>비밀번호 확인</p>
          <input
            type="password"
            placeholder=""
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="off"
          />
        </InputDiv>
        <div className="text">
          {confirm !== newPw && newPw.length !== 0 && <p>일치하지 않습니다</p>}
        </div>
        <Checkbox colorTheme={colorTheme}>
          <input
            id="chk"
            type={'checkbox'}
            name={'snsFlag'}
            defaultChecked={snsFlag === '1' ? 'off' : 'on'}
            onClick={SnsChange}
          />
          <label for="chk"></label>
          <label for="chk">SNS 수신</label>
        </Checkbox>
      </div>
      <Button onClick={onCrystalHandler} colorTheme={colorTheme} err={error}>
        프로필 저장
      </Button>
    </MyPageMainStyle>
  );
};
export default MyPageMain;
