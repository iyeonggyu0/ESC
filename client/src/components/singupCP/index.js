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
  const [snsFlag, setSNS] = useState(false);
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
    // eslint-disable-next-line
    [pw, email, userName, nick, hp, snsFlag, dispatch],
  );

  //html

  return (
    <SignMainStyle colorTheme={colorTheme} media={media} errorz={error}>
      <div>
        <p>SIGN UP</p>
        <div>
          <input
            type="text"
            placeholder="EMAIL"
            autoComplete="off"
            vale={email}
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="NAME"
            maxLength={4}
            autoComplete="off"
            value={userName}
            onChange={onChangeUserName}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="NICKNAME"
            maxLength={6}
            autoComplete="off"
            value={nick}
            onChange={onChangeNick}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="PW"
            // 대문자, 소문자, 특수문자 포함 8자리 이상
            maxLength={16}
            autoComplete="off"
            value={pw}
            onChange={onChnagePw}
            style={{ marginBottom: '-30px' }}
          />
        </div>
        <div style={{ marginBottom: 'calc(50px - 0.8rem)' }}>
          <input
            type="password"
            placeholder="PW 확인"
            maxLength={16}
            autoComplete="off"
            value={confirm}
            onChange={onChnageConfirm}
          />
          <p
            style={{
              textAlign: 'end',
              fontFamily: 'Gothic A1',
              paddingTop: '0.5rem',
              fontSize: '0.8rem',
            }}
          >
            일치하지 않습니다
          </p>
        </div>
        {/* 번호인증 */}
        <div>
          <input
            className="hpnum"
            type="text"
            placeholder="PHONE NUMBER"
            maxLength={13}
            autoComplete="off"
            value={hp
              .replace(/[^0-9]/g, '')
              .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
              .replace(/\-{1,2}$/g, '')}
            onChange={onChnageHp}
          />
        </div>
        <div>
          <input
            id="checkbox1"
            type={'checkbox'}
            name={'snsFlag'}
            onClick={() => (snsFlag === false ? setSNS(true) : setSNS(false))}
          />
          <label for="checkbox1" className="label">
            SNS 수신
          </label>
        </div>
        <div onClick={onSignHandler} disabled={error}>
          회원가입
        </div>
      </div>
    </SignMainStyle>
  );
};
export default SignMain;
