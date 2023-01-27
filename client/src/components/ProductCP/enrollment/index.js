import { useContext, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import NotAdmin from '../../_common/notAdmin';
import NotLogin from '../../_common/notLogin';
import { useInput } from '@hooks/useInput';
import { axiosInstance } from '@util/axios';

import { productCreate } from '@reducer/productReducer';

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

  const [name, onChangeName, setName] = useInput('');
  const [type, setType] = useState('');
  const [price, onChangePrice, setPrice] = useInput('');

  const [productMainImg, setProductMainImg] = useState(null);
  const [productImg, setProductImg] = useState(null);

  const [error, setError] = useState(null);

  // 새로고침 / 뒤로가기방지
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };
  useEffect(() => {
    (() => {
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

  const textFun = (text, f) => {
    f(text);
  };

  useEffect(() => {
    const img = localStorage.getItem('img');
    if (img !== null) {
      axios
        .post(`${axiosInstance}multer/delete`, {
          route: img,
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

  useEffect(() => {
    if (name.length > 0 && type.length > 0 && price.length > 0) {
      setError(false);
      return;
    } else {
      setError(true);
    }
  }, [name, type, price]);

  const cancelHandler = useCallback((e) => {
    e.preventDefault();
    setProductMainImg(null);
    setProductImg(null);
    const img = localStorage.getItem('img');
    if (img !== null) {
      axios
        .post(`${axiosInstance}multer/delete`, {
          route: img,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    localStorage.removeItem('img');
    window.location.replace('');
  }, []);

  const onProductCreateHandler = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        name: name,
        type: type,
        price: price,
        img: productMainImg,
        detailedImg: productImg,
      };
      dispatch(productCreate({ data: data, fun: { setName, setType, setPrice } }));
    },
    // eslint-disable-next-line
    [name, type, price, productMainImg, productImg, dispatch],
  );

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
                    <input type="text" autoComplete="off" value={price} onChange={onChangePrice} />
                  </TextInputDiv>
                  <TextInputDiv style={{ pointerEvents: error ? 'none' : 'all' }}>
                    <p>IMG</p>
                    <FileUploadInput
                      type={'product'}
                      name={name}
                      fun={setProductMainImg}
                      textFun={textFun}
                    />
                  </TextInputDiv>
                </div>
                <TextEditorDiv style={{ pointerEvents: error ? 'none' : 'all' }}>
                  <p>Product Detailed Description</p>
                  <FileUploadInput
                    type={'product'}
                    name={name}
                    fun={setProductImg}
                    textFun={textFun}
                  />
                </TextEditorDiv>
                <div>
                  <div
                    style={{ backgroundColor: '#ff6d6d', border: '0px' }}
                    onClick={cancelHandler}
                  >
                    취소
                  </div>
                  <div
                    style={{ pointerEvents: error ? 'none' : 'all' }}
                    onClick={onProductCreateHandler}
                  >
                    저장
                  </div>
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
