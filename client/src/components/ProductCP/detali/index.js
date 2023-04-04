import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { productGetOneData } from '@reducer/productReducer';

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
import PlusMinusButtonFrom from '../../_common/plusMinusButtonFrom';
import GradeForm from '../_common/gradeForm';
import { useDiscountDate } from '../../../hooks/useDiscountDate';
import ReviewInputForm from '../_common/reviewInputForm.js';
import ReviewTextForm from '../_common/reviewTextForm';
import ProductInquiryForm from '../_common/productInquiryForm';
import ExchangeReturn from '../_common/exchangeReturn';
import Pagination from 'react-js-pagination';
import theme from '@style/theme.js';
import ProductDetaliImgForm from '../_common/productDetaliImgForm';

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
  const [quantity, setQuantity] = useState(1);

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

  const onActivePageHandler = (page) => {
    setActivePage(page);
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
      // const [img, setImg] = useState(null);

      if (productData.ProductImgs?.length > 0) {
        const sortedProductImgs = productData.ProductImgs.filter(
          (item) => item.type === 'main',
        ).concat(productData.ProductImgs.filter((item) => item.type !== 'main'));

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
    }
    // eslint-disable-next-line
  }, [productData]);

  useEffect(() => {
    localStorage.setItem('pageModLoc', pageMod);
  }, [pageMod]);

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
            <section>
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
                  <PlusMinusButtonFrom val={quantity} setVal={setQuantity} />
                </div>
                <div>
                  <div>장바구니</div>
                  <div onClick={() => navigate('')}>구매</div>
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
                  <p onClick={() => window.open(`/product/modify/${productId}`)}>상품 수정</p>
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
