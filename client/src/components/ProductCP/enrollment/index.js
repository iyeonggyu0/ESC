import { useContext, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import NotAdmin from '../../_common/notAdmin';
import NotLogin from '../../_common/notLogin';
import { useInput } from '@hooks/useInput';
import { axiosInstance } from '@util/axios';

import { EnrollmentStyle, TextInputDiv, TextEditorDiv } from './style';
import FileUploadInput from '../../_common/multer/input';
import axios from 'axios';

const ProductEnrollmentMain = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const login = useContext(ThemeContext).userInfo.login;

  const [name, onChangeName] = useInput('');
  const [type, setType] = useState('');
  const [price, onChangePrice] = useInput('');

  const [productMainImg, setProductMainImg] = useState(localStorage.getItem('productMainImgRoute'));
  const [productImg, setProductImg] = useState(localStorage.getItem('productImgRoute'));

  const [error, setError] = useState(null);

  const deleteImg = useCallback(() => {
    if (productImg !== null) {
      axios
        .post(`${axiosInstance}multer/delete`, {
          route: productImg,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (productMainImg !== null) {
      axios
        .post(`${axiosInstance}multer/delete`, {
          route: productMainImg,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // eslint-disable-next-line
  }, []);

  // 새로고침 / 뒤로가기방지
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };
  useEffect(() => {
    (() => {
      localStorage.setItem('productMainImgRoute', `${productMainImg}`);
      localStorage.setItem('productImgRoute', `${productImg}`);
      deleteImg();
      window.addEventListener('beforeunload', preventClose);
    })();
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
    // eslint-disable-next-line
  }, []);
  const preventGoBack = () => {
    history.pushState(null, '', location.href);
  };
  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (name.length > 0 && type.length > 0 && price.length > 0) {
      setError(false);
      return;
    } else {
      setError(true);
    }
  }, [name, type, price]);

  return (
    <>
      {login && (
        <>
          {userData.authority === 'admin' && (
            <EnrollmentStyle colorTheme={colorTheme} media={media} errorz={error}>
              <div>
                <p>Add Product</p>
                <div>
                  <TextInputDiv>
                    <p>NAME</p>
                    <input
                      type="text"
                      autoComplete="off"
                      value={name}
                      onChange={onChangeName}
                      autoFocus
                    />
                  </TextInputDiv>
                  <TextInputDiv>
                    <p>TYPE</p>
                    <div>
                      <span
                        onClick={() => setType('case')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'case'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'case'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        CASE
                      </span>
                      <span
                        onClick={() => setType('pcb')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'pcb'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'pcb'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        PCB
                      </span>
                      <span
                        onClick={() => setType('plate')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'plate'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'plate'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        PLATE
                      </span>
                      <span
                        onClick={() => setType('switches')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'switches'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'switches'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        SWITCHES
                      </span>
                      <span
                        onClick={() => setType('keycaps')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'keycaps'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'keycaps'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        KEYCAPS
                      </span>
                      <span
                        onClick={() => setType('etc')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'etc'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'etc'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        ETC
                      </span>
                    </div>
                  </TextInputDiv>
                  <TextInputDiv>
                    <p>PRICE</p>
                    <input
                      type="text"
                      autoComplete="off"
                      value={price.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      onChange={onChangePrice}
                    />
                  </TextInputDiv>
                  <TextInputDiv style={{ pointerEvents: error ? 'none' : 'all' }}>
                    <p>IMG</p>
                    <FileUploadInput type={'product'} name={name} fun={setProductMainImg} />
                  </TextInputDiv>
                </div>
                <TextEditorDiv style={{ pointerEvents: error ? 'none' : 'all' }}>
                  <p>Product Detailed Description</p>
                  <FileUploadInput type={'product'} name={name} fun={setProductImg} />
                </TextEditorDiv>
                <div>
                  <div style={{ backgroundColor: '#ff6d6d', border: '0px' }}>취소</div>
                  <div style={{ pointerEvents: error ? 'none' : 'all' }}>저장</div>
                </div>
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
