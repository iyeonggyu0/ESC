import { useCallback, useEffect, useState, useRef, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUser } from '@reducer/userReducer';
// import AgreeCheckBox from '../agreeCheckBox';
import { useInput } from '@hooks/useInput';
import { encrypt } from '@util/crypto';
import { useMedia } from '../../hooks/useMedia';
import { ThemeContext } from '../../App';

// style
import { SignMainStyle } from './style';

const SignMain = () => {
  // util
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const media = useMedia();

  // state hook
  const [email, onChangeEmail, setEmail] = useInput('');
  const [userName, onChangeUserName] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [pw, onChnagePw, setPw] = useInput('');
  const [hp, onChnageHp, setHp] = useInput('');
  const [confirm, onChnageConfirm] = useInput('');

  const [error, setError] = useState(null);

  // check state
  const [snsFlag, setSNS] = useState(0);
  // const [acceptFlag, setAccept] = useState(0);
  // const [promtFlag, setPromt] = useState(0);

  // confirm check func

  useEffect(() => {
    if (pw.length > 0 && confirm.length > 0) {
      if (confirm === pw) {
        setError(false);
        return;
      } else {
        setError(true);
      }
    } else {
      setError(false);
    }
  }, [confirm, pw]);

  // exp
  const pwExp = useRef(
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
  );

  const emailExp = useRef(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  );

  // result check func
  const onSignHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!pwExp.current.test(pw)) {
        if (!alert('비밀번호 형식이 일치하지 않습니다 (대문자, 소문자, 특수문자 포함)')) {
          setPw('');
          return;
        }
      }
      if (!emailExp.current.test(email)) {
        if (!alert('이메일 형식이 일치하지 않습니다')) {
          setEmail('');
          return;
        }
      }
      if (hp.length !== 13) {
        if (!alert('전화번호 형식이 일치하지 않습니다')) {
          setHp('');
          return;
        }
      }

      const data = {
        email: email,
        name: userName,
        nickname: nick,
        password: encrypt(pw, process.env.REACT_APP_USER_KEY),
        hpNumber: hp,
        snsFlag: snsFlag,
      };
      dispatch(signUser({ data: data, navigate: navigate }));
    },
    [pw, email, userName, nick, pw, hp, snsFlag, dispatch],
  );

  //html

  return (
    <SignMainStyle colorTheme={colorTheme} media={media}>
      <div>
        <p>SING UP</p>
        <input
          type="text"
          placeholder="EMAIL"
          autoComplete="off"
          vale={email}
          onChange={onChangeEmail}
        />

        <input
          type="text"
          placeholder="NAME"
          maxLength={4}
          autoComplete="off"
          value={userName}
          onChange={onChangeUserName}
        />

        <input
          type="text"
          placeholder="NICKNAME"
          maxLength={6}
          autoComplete="off"
          value={nick}
          onChange={onChangeNick}
        />

        <input
          type="password"
          placeholder="PW"
          // 대문자, 소문자, 특수문자 포함 8자리 이상
          maxLength={16}
          autoComplete="off"
          value={pw}
          onChange={onChnagePw}
        />

        <input
          type="password"
          placeholder="PW 확인"
          maxLength={16}
          autoComplete="off"
          value={confirm}
          onChange={onChnageConfirm}
        />
        {error && <span>비밀번호 확인이 일치하지 않습니다</span>}

        <input
          type="text"
          placeholder="번호"
          maxLength={13}
          autoComplete="off"
          value={hp
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/\-{1,2}$/g, '')}
          onChange={onChnageHp}
        />

        <div type="reverse" size="full" height="2rem" margin="0.5rem 0" fontSize="0.825rem">
          <button disabled>인증하기</button>
        </div>
        <div>
          <span>SNS 수신</span>
          <input type={'checkbox'} />
        </div>
        <div
          type="normal"
          size="full"
          height="2rem"
          margin="0.5rem 0"
          fontSize="0.825rem"
          onClick={onSignHandler}
          disabled={error}
        >
          회원가입
        </div>
      </div>
    </SignMainStyle>
  );
};
export default SignMain;
