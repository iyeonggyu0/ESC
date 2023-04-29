import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { productGetOneData, shoppingBagPost } from '@reducer/productReducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import {
  ProductDetaliMain,
  ProductDetaliHeader,
  DetaliImgSection,
  ReviewDiv,
  ReviewFormWrapper,
  InquiryWrapper,
  PaginationBox,
} from './style';

import CommonLoadingPage from '../../_common/loadingPage';
import GradeForm from '../_common/gradeForm';
import { useDiscountDate } from '../../../hooks/useDiscountDate';
import ReviewInputForm from '../_common/reviewInputForm.js';
import ReviewTextForm from '../_common/reviewTextForm';
import ProductInquiryForm from '../_common/productInquiryForm';
import ExchangeReturn from '../_common/exchangeReturn';
import Pagination from 'react-js-pagination';
import theme from '@style/theme.js';
import ProductDetaliImgForm from '../_common/productDetaliImgForm';
import ProductOptionView from '../_common/productOption/optionView';
import ProductSelectionBox from '../_common/productSelectionBox';
import PlusMinusButtonFrom from '../../_common/plusMinusButtonFrom';

const ProductDetliMain = () => {
  const media = useMedia();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  const productId = useParams().productId;
  const [productData, setProductData] = useState(null);

  const [img, setImg] = useState([{}]);
  const [imgRoute, setImgRoute] = useState('');
  const [detailedImg, setDetailedImg] = useState(null);

  const pageModLoc = localStorage.getItem('pageModLoc');
  const [pageMod, setPageMod] = useState(`${pageModLoc}`);

  const [detaliImgSection, setDetaliImgSection] = useState(false);

  const [discountData, setDiscountData] = useState(0);
  const [discountDataCheck, setDiscountDataCheck] = useDiscountDate();

  const [sort, setSort] = useState('인기순');
  const [list, setList] = useState([]);

  const [activePage, setActivePage] = useState(1);
  // eslint-disable-next-line
  const [items, setItems] = useState(theme.paginationItem.productReview);

  const [productOption, setProductOption] = useState([]);
  const [productOptionCheck, setProductOptionCheck] = useState([]);
  const [productOrderList, setProductOrderList] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);

  const addShoppingBag = useCallback(() => {
    if (productOrderList?.length === 0) {
      return alert('옵션을 선택후 확정 버튼을 누르세요');
    }
    if (!userData) {
      return alert('로그인이 필요합니다');
    }

    const data = {
      productId: productId,
      userEmail: userData.email,
      options: productOrderList,
    };
    dispatch(shoppingBagPost({ data: data }));
  }, [userData, productId, productOrderList, dispatch]);

  const onProductOptionCheck = (optionName, optionValue, amount) => {
    const updatedProductOptionCheck = [...productOptionCheck];

    if (optionValue === '선택') {
      const existingOptionIndex = updatedProductOptionCheck.findIndex(
        (option) => option.optionName === optionName,
      );
      if (existingOptionIndex !== -1) {
        // 배열에서 해당 optionName을 가진 요소를 삭제
        updatedProductOptionCheck.splice(existingOptionIndex, 1);
        setProductOptionCheck(updatedProductOptionCheck);
      }
      return;
    }

    const existingOptionIndex = updatedProductOptionCheck.findIndex(
      (option) => option.optionName === optionName,
    );

    if (existingOptionIndex !== -1) {
      updatedProductOptionCheck[existingOptionIndex].optionValue = optionValue;
      updatedProductOptionCheck[existingOptionIndex].amount = amount;
    } else {
      updatedProductOptionCheck.push({ optionName, optionValue, amount });
    }
    setProductOptionCheck(updatedProductOptionCheck);
  };

  const handleProductQuantity = () => {
    // productOption에서 essential이 true인 옵션들의 optionName들을 추출하여 배열에 저장
    const essentialOptionNames = productOption
      .filter((option) => option.essential)
      .map((option) => option.optionName);
    // productOptionCheck에 있는 optionName들을 추출하여 배열에 저장
    const checkedOptionNames = productOptionCheck.map((option) => option.optionName);

    // essentialOptionNames 배열에 있는 모든 optionName들이 checkedOptionNames 배열에 있는지 확인
    const isAllEssentialOptionsChecked = essentialOptionNames.every((optionName) =>
      checkedOptionNames.includes(optionName),
    );

    if (!isAllEssentialOptionsChecked) {
      return alert('필수 옵션을 선택하세요');
    } else {
      // 새로운 객체를 생성하여 productOptionCheck와 productQuantity를 포함하여 productOrderList 배열의 뒤에 추가
      const newOrder = { productOptionCheck: productOptionCheck, productQuantity: productQuantity };
      setProductOrderList([...productOrderList, newOrder]);
      // productOptionCheck 상태를 초기화
      setProductOptionCheck([]);
      setProductQuantity(1);
    }
  };

  const productOrderRemove = (optionCheckToRemove) => {
    setProductOrderList((prevProductOrderList) => {
      // 이전의 productOrderList 상태를 복사
      const updatedProductOrderList = [...prevProductOrderList];
      // 삭제할 optionCheckToRemove와 동일한 값을 가진 데이터를 찾아 인덱스를 구함
      const indexToRemove = updatedProductOrderList.findIndex(
        (order) => order.productOptionCheck === optionCheckToRemove,
      );
      // 인덱스가 유효하다면 해당 데이터를 삭제
      if (indexToRemove >= 0) {
        updatedProductOrderList.splice(indexToRemove, 1);
      }
      // 새로운 productOrderList 상태를 반환
      return updatedProductOrderList;
    });
  };

  const changeOrderQuantity = (index, quantity) => {
    setProductOrderList((prevProductOrderList) => {
      const updatedProductOrderList = [...prevProductOrderList]; // 배열 복사
      updatedProductOrderList[index] = {
        ...updatedProductOrderList[index], // 해당 인덱스의 객체 복사
        productQuantity: quantity, // productQuantity 업데이트
      };
      return updatedProductOrderList;
    });
  };

  // dataGet
  useEffect(() => {
    dispatch(
      productGetOneData({ productId: productId, sort: sort, setProductData: setProductData }),
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (productData) {
      if (productData.ProductImgs?.length > 0) {
        const sortedProductImgs = productData.ProductImgs.filter(
          (item) => item.type === 'main',
        ).concat(productData.ProductImgs.reverse().filter((item) => item.type !== 'main'));

        setImg(sortedProductImgs);
        setImgRoute(productData.imgRoute);
      }

      if (productData.detailedImg === '/null' || productData.detailedImg === null) {
        setDetailedImg('/img/product/notImg.png');
      } else {
        setDetailedImg(`/img/product/${productData.imgRoute}/${productData.detailedImg}`);
      }

      if (productData.ProductDiscount !== null) {
        setDiscountData(productData.ProductDiscount);
        setDiscountDataCheck(productData.ProductDiscount);
      }

      if (productData.ProductReviews) {
        setList(productData.ProductReviews);
      }

      if (productData.ProductOptions) {
        setProductOption(productData.ProductOptions);
      }
    }

    // eslint-disable-next-line
  }, [productData]);

  useEffect(() => {
    localStorage.setItem('pageModLoc', pageMod);
  }, [pageMod]);

  const textFun = (text, f) => {
    f(text);
  };

  const productModifyHandler = () => {
    localStorage.setItem('route', null);
    window.open(`/product/modify/${productId}`);
  };

  return (
    <>
      {productData === null && <CommonLoadingPage />}
      {productData !== null && (
        <div>
          {/* HOME > 종류 > 이름 */}
          <ProductDetaliHeader media={media} colorTheme={colorTheme}>
            <div>
              <p>HOME</p>
              <FontAwesomeIcon icon={solid('angle-right')} />
              <p>{productData.type}</p>
              <FontAwesomeIcon icon={solid('angle-right')} />
              <p>{productData.name}</p>
            </div>
          </ProductDetaliHeader>
          <ProductDetaliMain media={media} colorTheme={colorTheme}>
            {/* mainImg, 가격, 구매버튼 등 */}
            <section className="flexHeightCenter">
              <ProductDetaliImgForm
                imgRoute={imgRoute}
                media={media}
                colorTheme={colorTheme}
                imgs={img}
              />
              <div>
                <p>{productData.name}</p>
                <div>
                  <div>
                    {productData.grade === 0 && <span>리뷰 없음</span>}
                    {0 < productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {2 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {3 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {4 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {5 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {/* 리뷰 수량 표시하기 */}
                    <span> ({productData.ProductReviews.length})&nbsp;</span>
                  </div>
                  <span>구매 {productData.sale}</span>
                </div>
                <p>
                  {discountDataCheck && <FontAwesomeIcon icon={solid('tags')} className={'icon'} />}
                  {discountDataCheck &&
                    (productData.price - discountData.discountAmount)
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  {!discountDataCheck &&
                    productData.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  원
                  {discountDataCheck && (
                    <span>
                      <span>
                        {discountData.periodYear}년 {discountData.periodMonth}월{' '}
                        {discountData.periodDate}일 까지
                      </span>
                      <span>
                        {productData.price
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </span>
                    </span>
                  )}
                </p>
                <div>
                  <div>
                    {productOption.length > 0 &&
                      productOption.map((opt, key) => (
                        <ProductOptionView
                          key={key}
                          textFun={textFun}
                          setProductOption={setProductOption}
                          data={opt}
                          onProductOptionCheck={onProductOptionCheck}
                        />
                      ))}
                    <div className="flexHeightCenter">
                      <PlusMinusButtonFrom
                        val={productQuantity}
                        setVal={setProductQuantity}
                        height={35}
                      />
                      <div className="flexCenter" onClick={handleProductQuantity}>
                        확정
                      </div>
                    </div>
                  </div>
                  <div>
                    {productOrderList.length > 0 &&
                      productOrderList.map((state, key) => {
                        return (
                          <ProductSelectionBox
                            key={key}
                            productName={productData.name}
                            data={state}
                            removeFun={productOrderRemove}
                            id={key}
                            changeOrderQuantity={changeOrderQuantity}
                          />
                        );
                      })}
                  </div>
                </div>
                <div>
                  <div onClick={addShoppingBag}>장바구니</div>
                  <div>구매</div>
                </div>
              </div>
            </section>

            {/* 페이지 모드 설정 메뉴 */}
            <section>
              <div>
                <p
                  onClick={() => setPageMod('상세설명')}
                  style={{ fontWeight: pageMod === '상세설명' ? '500' : '300' }}
                >
                  상세설명
                </p>
                <p
                  onClick={() => setPageMod('구매후기')}
                  style={{ fontWeight: pageMod === '구매후기' ? '500' : '300' }}
                >
                  구매후기
                </p>
                <p
                  onClick={() => setPageMod('상품문의')}
                  style={{ fontWeight: pageMod === '상품문의' ? '500' : '300' }}
                >
                  상품문의
                </p>
                <p
                  onClick={() => setPageMod('교환/반품')}
                  style={{ fontWeight: pageMod === '교환/반품' ? '500' : '300' }}
                >
                  교환/반품
                </p>
                {userData !== null && userData.authority === 'admin' && (
                  <p onClick={productModifyHandler}>상품 수정</p>
                )}
              </div>
            </section>

            {/* 이미지 */}
            {pageMod === '상세설명' && (
              <DetaliImgSection media={media} colorTheme={colorTheme} detail={detaliImgSection}>
                <div>
                  {!detaliImgSection && (
                    <div onClick={() => setDetaliImgSection(true)}>자세히 보기</div>
                  )}
                  {detaliImgSection && <div onClick={() => setDetaliImgSection(false)}>숨기기</div>}
                  <img src={detailedImg}></img>
                </div>
                <div></div>
              </DetaliImgSection>
            )}

            {/* 구매후기 */}
            {pageMod === '구매후기' && (
              <ReviewDiv media={media} colorTheme={colorTheme}>
                <GradeForm productData={productData} colorTheme={colorTheme} />
                <ReviewInputForm
                  productData={productData}
                  userData={userData}
                  colorTheme={colorTheme}
                />
                <ReviewFormWrapper colorTheme={colorTheme}>
                  {/* sort div */}
                  <div>
                    <div
                      onClick={() => setSort('인기순')}
                      style={{ fontWeight: sort === '인기순' ? '600' : '400' }}
                    >
                      인기순
                    </div>
                    <div
                      onClick={() => setSort('최신순')}
                      style={{ fontWeight: sort === '최신순' ? '600' : '400' }}
                    >
                      최신순
                    </div>
                  </div>
                  {/* list div */}
                  {list && (
                    <div style={{ minHeight: '50vh' }}>
                      {list.length === 0 && (
                        <div
                          style={{
                            width: '100%',
                            height: '100px',
                            backgroundColor: '#f7f7f9',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '10vh',
                          }}
                        >
                          남겨진 리뷰가 없습니다.
                        </div>
                      )}
                      {list
                        .slice(items * (activePage - 1), items * (activePage - 1) + items)
                        .map((state, key) => (
                          <ReviewTextForm
                            key={key}
                            reviewData={state}
                            userData={userData}
                            colorTheme={colorTheme}
                            media={media}
                          />
                        ))}
                      {list.length >= 1 && media.isPc && (
                        <PaginationBox colorTheme={colorTheme}>
                          <Pagination
                            activePage={activePage}
                            itemsCountPerPage={items}
                            totalItemsCount={parseInt(list.length / 1) + 1}
                            prevPageText={'‹'}
                            nextPageText={'›'}
                            onChange={onActivePageHandler}
                          />
                        </PaginationBox>
                      )}
                    </div>
                  )}
                </ReviewFormWrapper>
              </ReviewDiv>
            )}

            {/* 상품문의 */}
            {pageMod === '상품문의' && (
              <InquiryWrapper media={media}>
                <ProductInquiryForm
                  productData={productData}
                  userData={userData}
                  colorTheme={colorTheme}
                  media={media}
                />
              </InquiryWrapper>
            )}

            {pageMod === '교환/반품' && <ExchangeReturn media={media} />}
          </ProductDetaliMain>
        </div>
      )}
    </>
  );
};
export default ProductDetliMain;
