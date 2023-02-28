import { useContext } from 'react';
import { ThemeContext } from '../App';
import AdminMain from '../components/adminCP';
import NotFountPage from '../components/_common/error/404';
import Layout from '../layout/mainLayOut/index';

const AdminPage = () => {
  const userData = useContext(ThemeContext).userInfo.userData;
  console.log(userData);
  return (
    <section>
      {(!userData || (userData && userData.authority !== 'admin')) && <NotFountPage />}
      {userData && userData.authority === 'admin' && (
        <Layout>
          <AdminMain />
        </Layout>
      )}
    </section>
  );
};
export default AdminPage;
