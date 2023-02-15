import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { productGetOneData } from '@reducer/productReducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ProductDetaliMain, ProductDetaliHeader, DetaliImgSection, ReviewDiv } from './style';
import CommonLoadingPage from '../../_common/loadingPage';
import PlusMinusButtonFrom from '../../_common/plusMinusButtonFrom';
import GradeForm from '../_common/gradeForm';
import ReviewForm from '../_common/reviewForm.js';
import { useDiscountDate } from '../../../hooks/useDiscountDate';

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

  // dataGet
  useEffect(() => {
    dispatch(productGetOneData({ productId: productId, setProductData: setProductData }));
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
          <ProductDetaliMain media={media} colorTheme={colorTheme} img={img}>
            {/* mainImg, 가격, 구매버튼 등 */}
            <section>
              <div></div>
              <div>
                <p>{productData.name}</p>
                <div>
                  <div>
                    {productData.grade === 0 && <p>리뷰 없음</p>}
                    {0 < productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {2 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {3 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {4 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {5 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
                    {/* 리뷰 수량 표시하기 */}
                    {/* <span> (10,000)&nbsp;</span> */}
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
                    <div>
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
                    </div>
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

            {/* TODO: 리뷰 CRUD ( 이미지 포함 제작하기 ) */}
            {pageMod === '구매후기' && (
              <ReviewDiv media={media} colorTheme={colorTheme}>
                <GradeForm productData={productData} />
                <ReviewForm productData={productData} userData={userData} colorTheme={colorTheme} />
              </ReviewDiv>
            )}
          </ProductDetaliMain>
        </div>
      )}
    </>
  );
};
export default ProductDetliMain;
