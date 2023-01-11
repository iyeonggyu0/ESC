import { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@reducer/userReducer';
import { useNavigate } from 'react-router-dom';
import { encrypt } from '@util/crypto';

import { LoginMainStyle } from './style';
import { ThemeContext } from '../../App';
import { useMedia } from '../../hooks/useMedia';

const LoginMain = () => {
  // util
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const media = useMedia();

  // state hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  useEffect(() => {
    if (email.length > 0 && password.length) {
      setError(false);
    } else {
      setError(true);
    }
  }, [email, password]);

  // exp
  const emailExp = useRef(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  );

  const navigateFun = (link) => {
    navigate(link);
  };

  // login dispatch
  const onLoginHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!emailExp.current.test(email)) {
        if (!alert('이메일 형식이 일치하지 않습니다')) {
          setEmail('');
          return;
        }
      }

      const data = {
        email: email,
        password: encrypt(password, process.env.REACT_APP_USER_KEY),
      };
      dispatch(loginUser({ data: data, navigateFun }));
    },
    // eslint-disable-next-line
    [email, password, dispatch, navigate],
  );
  // html

  return (
    <LoginMainStyle colorTheme={colorTheme} media={media} errorz={error}>
      <div>
        <p>LOGIN</p>
        <div>
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div onClick={onLoginHandler}>로그인</div>
        <div>
          <span onClick={() => navigate('/find-password')}>비밀번호 찾기</span>
          <div></div>
          <span onClick={() => navigate('/signup')}>회원가입</span>
        </div>
      </div>
    </LoginMainStyle>
  );
};
export default LoginMain;
