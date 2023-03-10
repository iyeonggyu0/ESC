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

const ProductDetliMain = () => {
  const media = useMedia();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  const productId = useParams().productId;
  const [productData, setProductData] = useState(null);

  const [img, setImg] = useState(null);
  const [detailedImg, setDetailedImg] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const pageModLoc = localStorage.getItem('pageModLoc');
  const [pageMod, setPageMod] = useState(`${pageModLoc}`);

  const [detaliImgSection, setDetaliImgSection] = useState(false);

  const [discountData, setDiscountData] = useState(0);
  const [discountDataCheck, setDiscountDataCheck] = useDiscountDate();

  const [sort, setSort] = useState('?????????');
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
      if (productData.img === '/null' || productData.img === null) {
        setImg('/img/product/notImg.png');
      } else {
        setImg(`"${productData.img}"`);
      }

      if (productData.detailedImg === '/null' || productData.detailedImg === null) {
        setDetailedImg('/img/product/notImg.png');
      } else {
        setDetailedImg(`${productData.detailedImg}`);
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
          {/* HOME > ?????? > ?????? */}
          <ProductDetaliHeader media={media} colorTheme={colorTheme}>
            <div>
              <p>HOME</p>
              <FontAwesomeIcon icon={solid('angle-right')} />
              <p>{productData.type}</p>
              <FontAwesomeIcon icon={solid('angle-right')} />
              <p>{productData.name}</p>
            </div>
          </ProductDetaliHeader>
          <ProductDetaliMain media={media} colorTheme={colorTheme} img={img}>
            {/* mainImg, ??????, ???????????? ??? */}
            <section>
              <div></div>
              <div>
                <p>{productData.name}</p>
                <div>
                  <div>
                    {productData.grade === 0 && <p>?????? ??????</p>}
                    {0 < productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {2 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {3 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {4 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {5 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {/* ?????? ?????? ???????????? */}
                    <span> ({productData.ProductReviews.length})&nbsp;</span>
                  </div>
                  <span>?????? {productData.sale}</span>
                </div>
                <p>
                  {discountDataCheck && <FontAwesomeIcon icon={solid('tags')} className={'icon'} />}
                  {discountDataCheck &&
                    (productData.price - discountData.discountAmount)
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  {!discountDataCheck &&
                    productData.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  ???
                  {discountDataCheck && (
                    <span>
                      <span>
                        {discountData.periodYear}??? {discountData.periodMonth}???{' '}
                        {discountData.periodDate}??? ??????
                      </span>
                      <span>
                        {productData.price
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                        ???
                      </span>
                    </span>
                  )}
                </p>
                <div>
                  <PlusMinusButtonFrom val={quantity} setVal={setQuantity} />
                </div>
                <div>
                  <div>????????????</div>
                  <div onClick={() => navigate('')}>??????</div>
                </div>
              </div>
            </section>

            {/* ????????? ?????? ?????? ?????? */}
            <section>
              <div>
                <p
                  onClick={() => setPageMod('????????????')}
                  style={{ fontWeight: pageMod === '????????????' ? '500' : '300' }}
                >
                  ????????????
                </p>
                <p
                  onClick={() => setPageMod('????????????')}
                  style={{ fontWeight: pageMod === '????????????' ? '500' : '300' }}
                >
                  ????????????
                </p>
                <p
                  onClick={() => setPageMod('????????????')}
                  style={{ fontWeight: pageMod === '????????????' ? '500' : '300' }}
                >
                  ????????????
                </p>
                <p
                  onClick={() => setPageMod('??????/??????')}
                  style={{ fontWeight: pageMod === '??????/??????' ? '500' : '300' }}
                >
                  ??????/??????
                </p>
                {userData !== null && userData.authority === 'admin' && (
                  <p onClick={() => window.open(`/product/modify/${productId}`)}>?????? ??????</p>
                )}
              </div>
            </section>

            {/* ????????? */}
            {pageMod === '????????????' && (
              <DetaliImgSection media={media} colorTheme={colorTheme} detail={detaliImgSection}>
                <div>
                  {!detaliImgSection && (
                    <div onClick={() => setDetaliImgSection(true)}>????????? ??????</div>
                  )}
                  {detaliImgSection && <div onClick={() => setDetaliImgSection(false)}>?????????</div>}
                  <img src={detailedImg}></img>
                </div>
                <div></div>
              </DetaliImgSection>
            )}

            {/* ???????????? */}
            {pageMod === '????????????' && (
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
                      onClick={() => setSort('?????????')}
                      style={{ fontWeight: sort === '?????????' ? '600' : '400' }}
                    >
                      ?????????
                    </div>
                    <div
                      onClick={() => setSort('?????????')}
                      style={{ fontWeight: sort === '?????????' ? '600' : '400' }}
                    >
                      ?????????
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
                          ????????? ????????? ????????????.
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
                            prevPageText={'???'}
                            nextPageText={'???'}
                            onChange={onActivePageHandler}
                          />
                        </PaginationBox>
                      )}
                    </div>
                  )}
                </ReviewFormWrapper>
              </ReviewDiv>
            )}

            {/* ???????????? */}
            {pageMod === '????????????' && (
              <InquiryWrapper media={media}>
                <ProductInquiryForm
                  productData={productData}
                  userData={userData}
                  colorTheme={colorTheme}
                  media={media}
                />
              </InquiryWrapper>
            )}

            {pageMod === '??????/??????' && <ExchangeReturn media={media} />}
          </ProductDetaliMain>
        </div>
      )}
    </>
  );
};
export default ProductDetliMain;
