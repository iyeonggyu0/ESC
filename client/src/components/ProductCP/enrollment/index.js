import { useContext, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const login = useContext(ThemeContext).userInfo.login;

  const [name, onChangeName, setName] = useInput('');
  const [type, setType] = useState('');
  const [price, onChangePrice, setPrice] = useInput('');
  const [inventoryQuantity, onChangeInventoryQuantity] = useInput(0);

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
        .post(`${axiosInstance}api/multer/delete/route`, {
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
        .post(`${axiosInstance}api/multer/delete/route`, {
          route: img,
        })
        .then(() => {
          localStorage.removeItem('img');
          window.location.replace('');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const onProductCreateHandler = useCallback(
    (e) => {
      e.preventDefault();
      console.log(productMainImg === null ? null : `/img/product/${name}/${productMainImg}`);
      const data = {
        name: name,
        type: type,
        price: price,
        img: productMainImg === null ? null : `/img/product/${name}/${productMainImg}`,
        detailedImg: productImg === null ? null : `/img/product/${name}/${productImg}`,
        inventoryQuantity: inventoryQuantity,
      };
      dispatch(productCreate({ data: data, fun: { setName, setType, setPrice } }));
    },
    // eslint-disable-next-line
    [name, type, price, productMainImg, productImg, inventoryQuantity, dispatch],
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
                        onClick={() => setType('CASE')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'CASE'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'CASE'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        CASE
                      </span>
                      <span
                        onClick={() => setType('PCB')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'PCB'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'PCB'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        PCB
                      </span>
                      <span
                        onClick={() => setType('PLATE')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'PLATE'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'PLATE'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        PLATE
                      </span>
                      <span
                        onClick={() => setType('SWITCHES')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'SWITCHES'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'SWITCHES'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        SWITCHES
                      </span>
                      <span
                        onClick={() => setType('KEYCAPS')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'KEYCAPS'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'KEYCAPS'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        KEYCAPS
                      </span>
                      <span
                        onClick={() => setType('KEYBOARD')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'KEYBOARD'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'KEYBOARD'
                              ? '#796763'
                              : '#AEAEAE',
                        }}
                      >
                        KEYBOARD
                      </span>
                      <span
                        onClick={() => setType('ETC')}
                        style={{
                          color:
                            colorTheme === 'game' && type === 'ETC'
                              ? 'black'
                              : colorTheme !== 'game' && type === 'ETC'
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
                  <TextInputDiv>
                    <p style={{ fontFamily: 'Noto Sans Kr' }}>재고</p>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder={'0'}
                      value={inventoryQuantity === 0 ? '' : inventoryQuantity}
                      onChange={onChangeInventoryQuantity}
                    />
                  </TextInputDiv>
                  <TextInputDiv style={{ pointerEvents: error ? 'none' : 'all' }}>
                    <p>IMG</p>
                    <FileUploadInput
                      type={'product'}
                      name={name}
                      fun={setProductMainImg}
                      textFun={textFun}
                      page={'enrollment'}
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
                    page={'enrollment'}
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
