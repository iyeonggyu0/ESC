import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import NotAdmin from '../../_common/notAdmin';
import NotLogin from '../../_common/notLogin';
import { useInput } from '@hooks/useInput';
import { axiosInstance } from '@util/axios';
import { productCreate, multerPut } from '@reducer/productReducer';

import { EnrollmentStyle, TextInputDiv, TextEditorDiv, TagDiv, ImgsDiv, OptionDiv } from './style';
import FileUploadInput from '../../_common/multer/input';
import axios from 'axios';
import ExTagForm from '../_common/exTagForm';
import ProductImgForm from '../_common/productImgForm';
import ProductOption from '../_common/productOption';
// import ProductImgForm from '../_common/productImgForm';

const ProductEnrollmentMain = () => {
  const media = useMedia();
  const dispatch = useDispatch();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const login = useContext(ThemeContext).userInfo.login;

  const [name, onChangeName] = useInput('');
  const [type, setType] = useState(null);
  const [tagText, setTagText] = useState(null);
  const [price, onChangePrice] = useInput('');
  const [inventoryQuantity, onChangeInventoryQuantity] = useInput(0);

  const [productImg, setProductImg] = useState('');

  const [productMainImg, setProductMainImg] = useState(null);
  const [productImgs, setProductImgs] = useState(null);

  const [productOption, setProductOption] = useState([]);

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
  }, []);

  const textFun = (text, f) => {
    f(text);
  };

  // 상품 메인 이미지
  // 멀터input에서 수정하는 uploadFile를 감지하여 productImgs에 이어 붙히기

  const uploadFile = (uploadFileText) => {
    if (productImgs?.length > 0) {
      setProductImgs((text) => text + ',' + uploadFileText);
    } else if (productImgs?.length === 0 || productImgs === null) {
      setProductImgs(uploadFileText);
      if (!productMainImg) {
        setProductMainImg(uploadFileText);
      }
    }
    console.log(uploadFileText);
  };

  // 상품 이미지
  const onChangeProductImg = (text) => {
    if (productImg?.length > 0) {
      axios
        .post(`${axiosInstance}api/multer/delete/fill`, {
          route: `/img/product/${
            localStorage.getItem('route') === 'null' || localStorage.getItem('route') === null
              ? name
              : localStorage.getItem('route')
          }/${productImg}`,
        })
        .then(() => {
          setProductImg(text);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setProductImg(text);
    }
  };

  useEffect(() => {
    const img = localStorage.getItem('img');
    const route = localStorage.getItem('route');

    if (route === 'null' || route === null) {
      return localStorage.setItem('route', null);
    }

    if (route !== 'null' || route !== null) {
      console.log('새로고침', img, route);
      axios
        .post(`${axiosInstance}api/multer/delete/route`, {
          route: `img/product/${route}`,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem('route', null);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (name?.length > 0 && type?.length > 0 && price?.length > 0) {
      setError(false);
      return;
    } else {
      setError(true);
    }
  }, [name, type, price]);

  const setTagTextHandler = (text) => {
    setTagText(text);
  };

  const cancelHandler = useCallback((e) => {
    e.preventDefault();
    setProductMainImg(null);
    setProductImg(null);
    const img = localStorage.getItem('route');
    if (img !== null) {
      axios
        .post(`${axiosInstance}api/multer/delete/route`, {
          route: `/img/product/${img}`,
        })
        .then(() => {
          localStorage.removeItem('route');
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
      const route = localStorage.getItem('route');

      if (productMainImg?.length === 0 || productMainImg === null) {
        return alert('메인 이미지를 선택해 주세요');
      }

      if (route !== name) {
        dispatch(
          multerPut({
            route: `/img/product/${route}`,
            newRoute: `/img/product/${name.replace(/[^\w\s]/gi, '')}`,
          }),
        );
        localStorage.setItem('route', name.replace(/[^\w\s]/gi, ''));
      }

      const data = {
        name: name,
        type: type,
        price: price,
        imgRoute:
          name === localStorage.getItem('route')
            ? localStorage.getItem('route')
            : name.replace(/[^\w\s]/gi, ''),
        imgArr: productImgs?.split(/,/g),
        img: productMainImg === null || productMainImg?.length === 0 ? null : productMainImg,
        detailedImg: productImg === null || productImg?.length === 0 ? null : productImg,
        inventoryQuantity: inventoryQuantity,
        tag: tagText
          ?.replace(/^#/g, '')
          .replace(/ {0,}#/g, ',')
          .replace(/ /g, '_')
          .split(/,/g),
        productOption: productOption,
      };
      console.log(data);
      dispatch(productCreate({ data: data }));
    },
    [
      name,
      type,
      price,
      productMainImg,
      productImgs,
      productImg,
      inventoryQuantity,
      tagText,
      productOption,
      dispatch,
    ],
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
                  <TextInputDiv>
                    <p>TAG</p>
                    <TagDiv colorTheme={colorTheme} media={media}>
                      <ExTagForm
                        tagText={tagText}
                        setTagTextHandler={setTagTextHandler}
                        type={type}
                      />
                    </TagDiv>
                  </TextInputDiv>
                  <TextInputDiv style={{ pointerEvents: error ? 'none' : 'all' }}>
                    <p>IMG</p>
                    <FileUploadInput
                      type={'product'}
                      name={
                        localStorage.getItem('route') === 'null' ||
                        localStorage.getItem('route') === null
                          ? name.replace(/[^\w\s]/gi, '')
                          : localStorage.getItem('route')
                      }
                      fun={uploadFile}
                      textFun={textFun}
                    />
                  </TextInputDiv>
                  <ImgsDiv className="flexHeightCenter">
                    <div></div>
                    {productImgs?.length > 0 && (
                      <div>
                        {/* productImgs */}
                        <ProductImgForm
                          productImgs={productImgs}
                          setProductImgs={setProductImgs}
                          productMainImg={productMainImg}
                          setProductMainImg={setProductMainImg}
                          textFun={textFun}
                          name={
                            localStorage.getItem('route') === 'null' ||
                            localStorage.getItem('route') === null
                              ? name.replace(/[^\w\s]/gi, '')
                              : localStorage.getItem('route')
                          }
                        />
                      </div>
                    )}
                  </ImgsDiv>
                </div>
                <TextEditorDiv style={{ pointerEvents: error ? 'none' : 'all' }}>
                  <p>Product Detailed Description</p>
                  <FileUploadInput
                    type={'product'}
                    name={
                      localStorage.getItem('route') === 'null' ||
                      localStorage.getItem('route') === null
                        ? name.replace(/[^\w\s]/gi, '')
                        : localStorage.getItem('route')
                    }
                    fun={onChangeProductImg}
                  />
                </TextEditorDiv>
                <OptionDiv>
                  <p>
                    Option <span>상품 옵션을 설정합니다.</span>
                  </p>
                  <div>
                    {productOption.length === 0 && (
                      <p>
                        설정된 옵션이 없습니다.{' '}
                        <span>(설정값이 없을때는 수량만 선택 가능합니다)</span>
                      </p>
                    )}
                    <ProductOption
                      productName={name}
                      productOption={productOption}
                      textFun={textFun}
                      setProductOption={setProductOption}
                    />
                  </div>
                </OptionDiv>
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
