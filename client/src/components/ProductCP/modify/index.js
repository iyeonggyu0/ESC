import { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import NotAdmin from '../../_common/notAdmin';
import NotLogin from '../../_common/notLogin';
import { useInput } from '@hooks/useInput';

import { productGetOneData, productDelete } from '@reducer/productReducer';

import { EnrollmentStyle, TextInputDiv, TextEditorDiv } from './style';
import FileUploadInput from '../../_common/multer/input';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

const ProductModifyMain = () => {
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

  // /////////////////////////////////////////////////////////////////

  const media = useMedia();
  const dispatch = useDispatch();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const login = useContext(ThemeContext).userInfo.login;

  const [name, onChangeName, setName] = useInput('');
  const [type, setType] = useState('');
  const [price, onChangePrice, setPrice] = useInput('');

  const [productMainImg, setProductMainImg] = useState(null);
  const [productImg, setProductImg] = useState(null);

  const [productData, setProductData] = useState(null);

  const [error, setError] = useState(null);

  //  product Data
  const productId = useParams().productId;

  // dataGet
  useEffect(() => {
    dispatch(productGetOneData({ productId: productId, setProductData: setProductData }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (productData !== null) {
      setName(productData.name);
      setType(productData.type);
      setPrice(productData.price);
    }
    // eslint-disable-next-line
  }, [productData]);

  // const data = {
  //   id: productData === null ? 'null' : productData.id,
  //   name: productData === null ? 'null' : productData.name,
  //   price: productData === null ? 'null' : `${productData.price}`,
  //   grade: productData === null ? 'null' : productData.grade,
  //   img:
  //     productData === null
  //       ? 'null'
  //       : productData.img === '/null'
  //       ? '/img/product/notImg.png'
  //       : `"${productData.img}"`,
  //   detailedImg:
  //     productData === null
  //       ? 'null'
  //       : productData.detailedImg === '/null'
  //       ? '/img/product/notImg.png'
  //       : `"${productData.detailedImg}"`,
  // };

  // axios
  //   .post(`${axiosInstance}multer/delete`, {
  //     route: img,
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  const textFun = (text, f) => {
    f(text);
  };

  useEffect(() => {
    if (name.length > 0 && type.length > 0 && price.length > 0) {
      setError(false);
      return;
    } else {
      setError(true);
    }
  }, [name, type, price]);

  const productDeleteHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (window.confirm('삭제하시겠습니까?')) {
        dispatch(productDelete({ produceId: productData.id }));
      }
    },
    // eslint-disable-next-line
    [dispatch],
  );
  return (
    <>
      {login && (
        <>
          {userData.authority === 'admin' && (
            <EnrollmentStyle colorTheme={colorTheme} media={media} errorz={error}>
              <div>
                <p>Modify Product</p>
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
                  <TextInputDiv style={{ pointerEvents: error ? 'none' : 'all' }}>
                    <p>IMG</p>
                    <FileUploadInput
                      type={'product'}
                      name={name}
                      // fun={setProductMainImg}
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
                    onClick={productDeleteHandler}
                  >
                    삭제
                  </div>
                  <div
                    style={{ backgroundColor: '#ff6d6d', border: '0px' }}
                    // onClick={cancelHandler}
                  >
                    취소
                  </div>
                  <div
                    style={{ pointerEvents: error ? 'none' : 'all' }}
                    // onClick={onProductCreateHandler}
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
export default ProductModifyMain;
