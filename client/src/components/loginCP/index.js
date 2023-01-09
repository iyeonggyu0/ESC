import { useCallback, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@reducer/userReducer';
import { useNavigate } from 'react-router-dom';
import { useInput } from '@hooks/useInput';
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
  const [email, onChangEmail] = useInput('');
  const [password, onChangPassword] = useInput('');

  // login dispatch
  const onLoginHandler = useCallback(
    (e) => {
      e.preventDefault();
      const data = {
        email: email,
        password: encrypt(password, process.env.REACT_APP_USER_KEY),
      };
      dispatch(loginUser({ data: data, navigate: navigate }));
    },
    // eslint-disable-next-line
    [email, password, dispatch, navigate],
  );

  // html

  return (
    <LoginMainStyle colorTheme={colorTheme} media={media}>
      <div>
        <p>LOGIN</p>
        <div>
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={onChangEmail}
            autoComplete="off"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={onChangPassword}
            autoComplete="off"
          />
        </div>

        <div onClick={onLoginHandler}>로그인</div>
        <div>
          <span>아이디 찾기</span>
          <div></div>
          <span>비밀번호 찾기</span>
        </div>
      </div>
    </LoginMainStyle>
  );
};
export default LoginMain;
