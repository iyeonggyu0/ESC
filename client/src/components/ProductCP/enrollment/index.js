import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import NotAdmin from '../../_common/notAdmin';
import NotLogin from '../../_common/notLogin';

import TextEditor from '../../_common/textEditor/index';

import { EnrollmentStyle } from './style';

const ProductEnrollmentMain = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const login = useContext(ThemeContext).userInfo.login;

  return (
    <>
      {login && (
        <>
          {userData.authority === 'admin' && (
            <EnrollmentStyle colorTheme={colorTheme} media={media}>
              <p>Add Product</p>
              <div>
                <div>
                  <p>NAME</p>
                  <p>TYPE</p>
                  <p>PRICE</p>
                  <p>IMG</p>
                </div>
                <div>
                  <input
                    type="text"
                    autoComplete="off"
                    // value={}
                    // onChange={}
                    autoFocus
                  />
                  <input
                    type="text"
                    autoComplete="off"
                    // value={}
                    // onChange={}
                    autoFocus
                  />
                  <input
                    type="text"
                    autoComplete="off"
                    // value={}
                    // onChange={}
                    autoFocus
                  />
                </div>
              </div>
              <div>
                <p>Product Detailed Description</p>
                <TextEditor />
              </div>
            </EnrollmentStyle>
          )}
        </>
      )}
      <NotAdmin />
      <NotLogin />
    </>
  );
};
export default ProductEnrollmentMain;
