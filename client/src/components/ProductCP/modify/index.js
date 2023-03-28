import { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import NotAdmin from '../../_common/notAdmin';
import NotLogin from '../../_common/notLogin';
import { useInput } from '@hooks/useInput';

import { productGetOneData, productDelete, productModify } from '@reducer/productReducer';

import { EnrollmentStyle, TextInputDiv, TextEditorDiv, DiscountDiv, TagDiv, ImgDiv } from './style';
import FileUploadInput from '../../_common/multer/input';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';
import CommonLoadingPage from '../../_common/loadingPage';
import DateAndTimePickers from '../../_common/dateAndTimePickers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDiscountDate } from '../../../hooks/useDiscountDate';
import ExTagForm from '../_common/exTagForm';
import ProductImgForm from '../_common/productImgForm';

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
  const [price, setPrice] = useState(0);

  const [productMainImg, setProductMainImg] = useState(null);
  const [productMainNewImg, setProductMainNewImg] = useState(null);
  const [productImg, setProductImg] = useState(null);
  const [productNewImg, setProductNewImg] = useState(null);
  const [productImgs, setProductImgs] = useState(null);

  const [productData, setProductData] = useState(null);

  // 쿠폰
  const [discount, setDiscount] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(null);
  const [dateData, setDateData] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [date, setDate] = useState(null);

  const [tag, setTag] = useState('');

  const [discountDate, discountDateCheck] = useDiscountDate();

  useEffect(() => {
    if (dateData !== null) {
      setYear(dateData.toString().match(/20[0-9]{2}/g));

      setMonth(dateData.toString().match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g));

      setDate(
        dateData
          .toString()
          .replace(/\D/g, '')
          .match(/^[0-9]{2}/g),
      );
    }
  }, [dateData]);

  const [error, setError] = useState(false);

  //  product Data
  const productId = useParams().productId;

  const setTagTextHandler = (text) => {
    setTag(text);
  };

  const textFun = useCallback((text, f) => {
    f(text);
  }, []);

  // dataGet
  useEffect(() => {
    dispatch(productGetOneData({ productId: productId, setProductData: setProductData }));
  }, [dispatch, productId]);

  useEffect(() => {
    if (productData !== null) {
      setName(productData.name);
      setType(productData.type);
      setPrice(productData.price);

      if (productData?.ProductTags?.length > 0) {
        setTag(
          '#' +
            productData.ProductTags.map((item) => item.tag)
              .join(' #')
              .replace(/_/g, ' '),
        );
      }

      if (productData?.ProductImgs?.length > 0) {
        productData.ProductImgs.map((item) => {
          if (item.type === 'main') {
            setProductMainImg(item.img);
            if (productImgs) setProductImgs((state) => state + ',' + item.img);
            if (!productImgs) setProductImgs(item.img);
          } else {
            if (productImgs) setProductImgs((state) => state + ',' + item.img);
            if (!productImgs) setProductImgs(item.img);
          }
          console.log(item);
        });
      }

      // 디테일 이미지
      if (productData.detailedImg === '/null' || productData.detailedImg === null) {
        setProductImg('/img/product/notImg.png');
      } else {
        setProductImg(`"${productData.detailedImg}"`);
      }
      //쿠폰
      if (productData.ProductDiscount !== null) {
        if (discountDate) {
          setDiscount(true);
          setDiscountAmount(productData.ProductDiscount.discountAmount);
          setYear(productData.ProductDiscount.periodYear);
          setMonth(productData.ProductDiscount.periodMonth);
          setDate(productData.ProductDiscount.periodDate);
          discountDateCheck(productData.ProductDiscount);
        }
      }
    }
    // eslint-disable-next-line
  }, [productData, discountDate, discountDateCheck]);

  const textFunMainImg = (text, imagePath, fileName) => {
    setProductMainNewImg(text);
    localStorage.setItem('setProductMainNewImg', `${imagePath}/${fileName}`);
  };

  const textFunImg = (text, imagePath, fileName) => {
    setProductNewImg(text);
    localStorage.setItem('setProductImg', `${imagePath}/${fileName}`);
  };

  useEffect(() => {
    if (name.length > 0 && type.length > 0) {
      if (price === null) {
        setPrice(0);
      }

      if (discount) {
        if (discountAmount === 0 || year === null || month === null || date === null) {
          return setError(true);
        }
      }

      setError(false);
      return;
    } else {
      setError(true);
    }
  }, [name, type, price, discountAmount, discount, year, month, date]);

  const productModifyHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (discount && discountAmount > price) {
        return alert('할인된 값이 마이너스(-)입니다');
      }

      if (tag.length === 0) {
        return alert('태그를 입력하세요');
      }

      if (!/#/.test(tag)) {
        return alert('#가 포함되어야 합니다.');
      }

      // newData에서 이미지의 경로가 null이 아니면 기존 파일 삭제 후 데이터 업데이트
      const productId = productData.id;

      const productNewData = {
        name: name,
        type: type,
        price: price,
        img: productMainNewImg === null ? null : productMainNewImg,
        detailedImg: productNewImg === null ? null : productNewImg,
        tag: tag
          .replace(/^#/g, '')
          .replace(/ {1,}#/g, ',')
          .replace(/ /g, '_')
          .split(/,/g),
      };

      const newProductDiscount = {
        discount: discount,
        discountAmount: discountAmount,
        year: year,
        month: month
          ? month
              .toString()
              .replace(/Jan/g, 1)
              .replace(/Feb/g, 2)
              .replace(/Mar/g, 3)
              .replace(/Apr/g, 4)
              .replace(/May/g, 5)
              .replace(/Jun/g, 6)
              .replace(/Jul/g, 7)
              .replace(/Aug/g, 8)
              .replace(/Sep/g, 9)
              .replace(/Oct/g, 10)
              .replace(/Nov/g, 11)
              .replace(/Dec/g, 12)
          : '',
        date: date,
      };
      dispatch(
        productModify({
          productId: productId,
          productNewData: productNewData,
          newProductDiscount: newProductDiscount,
        }),
      );
    },
    [
      productData,
      name,
      type,
      price,
      productMainNewImg,
      productNewImg,
      discountAmount,
      year,
      month,
      date,
      discount,
      tag,
      dispatch,
    ],
  );

  useEffect(() => {
    const img = localStorage.getItem('setProductImg');
    const mainImg = localStorage.getItem('setProductMainNewImg');
    if (img !== null) {
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
  }, []);

  const productCancelHandler = useCallback(
    (e) => {
      e.preventDefault();

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
    [productData, productMainNewImg, productNewImg],
  );

  const productDeleteHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (window.confirm('삭제하시겠습니까?')) {
        dispatch(productDelete({ productId: productId }));
      }
    },
    [dispatch, productId],
  );

  console.log(productMainImg);
  console.log(productImgs);

  return (
    <>
      {productData === null && <CommonLoadingPage />}
      {login && productData !== null && media.isPc && (
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
                    <input
                      type="text"
                      autoComplete="off"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </TextInputDiv>
                  <TextInputDiv>
                    <p>TAG</p>
                    <TagDiv colorTheme={colorTheme} media={media}>
                      <ExTagForm tagText={tag} setTagTextHandler={setTagTextHandler} type={type} />
                    </TagDiv>
                  </TextInputDiv>
                  <TextInputDiv>
                    <p>IMG</p>
                    <FileUploadInput
                      type={'product'}
                      name={productData.name}
                      fun={setProductMainNewImg}
                      textFun={textFunMainImg}
                    />
                  </TextInputDiv>
                  <ImgDiv className="flexHeightCenter">
                    <div></div>
                    {productImgs?.length > 0 && (
                      <div>
                        {/* productImgs */}
                        <ProductImgForm
                          productImgs={productImgs}
                          setProductImgs={setProductImgs}
                          productMainImg={productMainImg}
                          setProductMainImg={setProductMainNewImg}
                          textFun={textFun}
                        />
                      </div>
                    )}
                  </ImgDiv>
                </div>
                <TextEditorDiv>
                  <p>Product Detailed Description</p>
                  <FileUploadInput
                    type={'product'}
                    name={`${productData.name} modify`}
                    fun={setProductNewImg}
                    textFun={textFunImg}
                    page={'modify'}
                  />
                </TextEditorDiv>
                <DiscountDiv media={media} colorTheme={colorTheme}>
                  <p>
                    DISCOUNT
                    {!discount && (
                      <span className={'icon'} onClick={() => setDiscount(true)}>
                        할인 추가
                        <FontAwesomeIcon icon={solid('plus')} />
                      </span>
                    )}
                    {discount && (
                      <span className={'icon'} onClick={() => setDiscount(false)}>
                        할인 제거
                        <FontAwesomeIcon icon={solid('minus')} />
                      </span>
                    )}
                  </p>
                  {discount && (
                    <div>
                      <TextInputDiv>
                        <div>
                          <p>할인 금액</p>
                          <input
                            type="text"
                            autoComplete="off"
                            value={discountAmount || ''}
                            onChange={(e) => setDiscountAmount(e.target.value)}
                          />
                        </div>
                        <div>
                          <p></p>
                          <div>
                            <p>{price}원</p>
                            <p>-</p>
                            <p>{discountAmount || 0}원</p>
                            <p>=</p>
                            <p>{price - discountAmount}원</p>
                          </div>
                        </div>
                      </TextInputDiv>
                      <div>
                        <p>적용기간</p>
                        <div>
                          <DateAndTimePickers
                            value={dateData}
                            setValue={setDateData}
                            label={'적용 기간'}
                            views={'day'}
                          />
                          {year && <p>{year}년</p>}
                          {month && (
                            <p>
                              {month
                                .toString()
                                .replace(/Jan/g, 1)
                                .replace(/Feb/g, 2)
                                .replace(/Mar/g, 3)
                                .replace(/Apr/g, 4)
                                .replace(/May/g, 5)
                                .replace(/Jun/g, 6)
                                .replace(/Jul/g, 7)
                                .replace(/Aug/g, 8)
                                .replace(/Sep/g, 9)
                                .replace(/Oct/g, 10)
                                .replace(/Nov/g, 11)
                                .replace(/Dec/g, 12)}
                              월
                            </p>
                          )}
                          {date && <p>{date}일</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </DiscountDiv>
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
