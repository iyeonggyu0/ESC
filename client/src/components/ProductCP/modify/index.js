import { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import NotAdmin from '../../_common/notAdmin';
import NotLogin from '../../_common/notLogin';
import { useInput } from '@hooks/useInput';

import { productGetOneData, productDelete, productModify } from '@reducer/productReducer';

import { EnrollmentStyle, TextInputDiv, TextEditorDiv } from './style';
import FileUploadInput from '../../_common/multer/input';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';
import CommonLoadingPage from '../../_common/loadingPage';

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
  const [productMainNewImg, setProductMainNewImg] = useState(null);
  const [productImg, setProductImg] = useState(null);
  const [productNewImg, setProductNewImg] = useState(null);

  const [productData, setProductData] = useState(null);

  const [error, setError] = useState(false);

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
      if (productData.img === '/null' || productData.img === null) {
        setProductMainImg('/img/product/notImg.png');
      } else {
        setProductMainImg(`"${productData.img}"`);
      }

      if (productData.detailedImg === '/null' || productData.detailedImg === null) {
        setProductImg('/img/product/notImg.png');
      } else {
        setProductImg(`"${productData.detailedImg}"`);
      }
    }
    // eslint-disable-next-line
  }, [productData]);

  const textFunMainImg = (text, imagePath, fileName) => {
    console.log(imagePath, fileName);
    setProductMainNewImg(text);
    localStorage.setItem('setProductMainNewImg', `${imagePath}/${fileName}`);
  };

  const textFunImg = (text, imagePath, fileName) => {
    setProductNewImg(text);
    localStorage.setItem('setProductImg', `${imagePath}/${fileName}`);
  };

  useEffect(() => {
    if (name.length > 0 && type.length > 0 && price.length > 0) {
      setError(false);
      return;
    } else {
      setError(true);
    }
  }, [name, type, price]);

  const productModifyHandler = useCallback(
    (e) => {
      e.preventDefault();

      // newData에서 이미지의 경로가 null이 아니면 기존 파일 삭제 후 데이터 업데이트
      const productId = productData.id;

      const productNewData = {
        name: name,
        type: type,
        price: price,
        img: productMainNewImg === null ? null : productMainNewImg,
        detailedImg: productNewImg === null ? null : productNewImg,
      };
      dispatch(productModify({ productId: productId, productNewData: productNewData }));
    },
    [productData, name, type, price, productMainNewImg, productNewImg, dispatch],
  );

  useEffect(() => {
    const img = localStorage.getItem('setProductImg');
    const mainImg = localStorage.getItem('setProductMainNewImg');
    console.log(img);
    if (img !== null) {
      console.log('실행');
      axios
        .post(`${axiosInstance}api/multer/delete/fill`, {
          route: img,
        })
        .then(() => {
          localStorage.removeItem('setProductImg');
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (mainImg !== null) {
      axios
        .post(`${axiosInstance}api/multer/delete/fill`, {
          route: mainImg,
        })
        .then(() => {
          localStorage.removeItem('setProductMainNewImg');
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  const productCancelHandler = useCallback(
    (e) => {
      e.preventDefault();
      console.log(productNewImg, productMainNewImg);
      if (productNewImg !== null) {
        axios
          .post(`${axiosInstance}api/multer/delete/fill`, {
            route: `/img/product/${productData.name}/${productNewImg}`,
          })
          .then(() => {
            localStorage.removeItem('img');
            setProductNewImg(null);
            window.close();
          })
          .catch((err) => {
            console.error(err);
          });
      }
      if (productMainNewImg !== null) {
        axios
          .post(`${axiosInstance}api/multer/delete/fill`, {
            route: `/img/product/${productData.name}/${productMainNewImg}`,
          })
          .then(() => {
            localStorage.removeItem('img');
            setProductMainNewImg(null);
            window.close();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    // eslint-disable-next-line
    [],
  );

  const productDeleteHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (window.confirm('삭제하시겠습니까?')) {
        dispatch(productDelete({ productId: productId }));
      }
    },
    // eslint-disable-next-line
    [dispatch],
  );

  return (
    <>
      {productData === null && <CommonLoadingPage />}
      {login && productData !== null && (
        <>
          {userData.authority === 'admin' && (
            <EnrollmentStyle
              colorTheme={colorTheme}
              media={media}
              errorz={error}
              mainImg={productMainImg}
              img={productImg}
            >
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
                  <TextInputDiv>
                    <p>IMG</p>
                    <FileUploadInput
                      type={'product'}
                      name={productData.name}
                      fun={setProductMainNewImg}
                      textFun={textFunMainImg}
                      page={'modify'}
                    />
                    <div className="mainImg"></div>
                  </TextInputDiv>
                </div>
                <TextEditorDiv>
                  <p>Product Detailed Description</p>
                  <FileUploadInput
                    type={'product'}
                    name={productData.name}
                    fun={setProductNewImg}
                    textFun={textFunImg}
                    page={'modify'}
                  />
                  <div className="img"></div>
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
                    onClick={productCancelHandler}
                  >
                    취소
                  </div>
                  <div
                    style={{ pointerEvents: error ? 'none' : 'all' }}
                    onClick={productModifyHandler}
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
