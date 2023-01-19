import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';

const NotAdmin = () => {
  const userData = useContext(ThemeContext).userInfo.userData;
  const login = useContext(ThemeContext).userInfo.login;
  const navigate = useNavigate();

  return (
    <>
      {login && (
        <>
          {/* 관리자가 아닌 사람이 접근시 */}
          {userData.authority !== 'admin' && (
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
              접근 권한이 없는 이용자입니다.
              <br /> (클릭 시 메인페이지로 이동)
            </div>
          )}
        </>
      )}
    </>
  );
};
export default NotAdmin;
