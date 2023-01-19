import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';

const NotLogin = () => {
  const Login = useContext(ThemeContext).userInfo.login;
  const navigate = useNavigate();

  return (
    <>
      {/* 비로그인 사용자 */}
      {!Login && (
        <div
          style={{
            width: '100%',
            height: 'calc(100vh - 70px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            textAlign: 'center',
          }}
          onClick={() => navigate('/')}
        >
          로그인 세션이 만료되었습니다.
          <br /> (클릭 시 메인페이지로 이동)
        </div>
      )}
    </>
  );
};
export default NotLogin;
