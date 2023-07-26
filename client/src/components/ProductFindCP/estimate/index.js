import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import ProductFindHeader from '../_common/header';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

import { MainStyle } from './style';
import { useEffect } from 'react';

const EstimateMain = ({ productData, saveSelectionList }) => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const pageNum = useParams('').pageNum;

  const [selectId, setSelectId] = useState(0);

  const [totalPrice, setTotalPrice] = useState([0, 0, 0, 0, 0]);
  const [selection, setSelection] = useState([0, 0, 0, 0, 0]);

  const nextStap = () => {
    let updatedTotalPrice = [...totalPrice];
    updatedTotalPrice[pageNum - 1] = productData[pageNum - 1][selectId].price;

    let updatedSelection = [...selection];
    updatedSelection[pageNum - 1] = productData[pageNum - 1][selectId].id;

    try {
      if (pageNum == 5) {
        saveSelectionList(updatedSelection);
      }

      setTotalPrice(updatedTotalPrice);
      setSelection(updatedSelection);

      navigate(`/estimate/${parseInt(pageNum) + 1}`);
    } catch (error) {
      alert('다시 시도해 주세요');
    }
  };

  const prevStap = () => {
    if (pageNum <= 1) {
      return alert('이전 단계가 없습니다.');
    }

    // 숫자 타입의 pageNum에서 1을 뺀 인덱스부터 이후의 값을 0으로 초기화
    let updatedTotalPrice = [...totalPrice];
    let updatedSelection = [...selection];

    for (let i = pageNum - 2; i < updatedTotalPrice.length; i++) {
      updatedTotalPrice[i] = 0;
      updatedSelection[i] = 0;
    }

    // 상태 업데이트
    setTotalPrice(updatedTotalPrice);
    setSelection(updatedSelection);

    // 이전 페이지로 이동
    navigate(`/estimate/${parseInt(pageNum) - 1}`);
  };

  useEffect(() => {
    let updatedTotalPrice = [...totalPrice];
    let updatedSelection = [...selection];

    for (let i = pageNum - 1; i < updatedTotalPrice.length; i++) {
      updatedTotalPrice[i] = 0;
      updatedSelection[i] = 0;
    }

    // 상태 업데이트
    setTotalPrice(updatedTotalPrice);
    setSelection(updatedSelection);
    // eslint-disable-next-line
  }, [pageNum]);

  console.log(selection);

  return (
    <MainStyle colorTheme={colorTheme} media={media}>
      {/* 헤더 */}
      <ProductFindHeader Page={'estimate'} />
      {/* 중앙 */}
      <div className="flexCenter">
        {/* 왼 | 오 */}
        <div>
          <Swiper
            modules={[Pagination]}
            loop={true}
            pagination={{ clickable: true }}
            className="mainImgSwiper"
          >
            {productData[pageNum - 1] &&
              productData[pageNum - 1][selectId].ProductImgs.reverse().map((state, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={`/img/product/${productData[pageNum - 1][selectId].imgRoute}/${state.img}`}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* 정보 */}
        <div>
          <div>
            <p>상품 이름</p>
            <p>{productData[pageNum - 1] && productData[pageNum - 1][selectId].name}</p>
          </div>
          <div>
            <p>가격</p>
            <p>
              {productData[pageNum - 1] &&
                productData[pageNum - 1][selectId].price.toLocaleString()}
              원
            </p>
          </div>

          <div>
            <p>상품 태그</p>
            <div>
              {productData[pageNum - 1] &&
                productData[pageNum - 1][selectId].ProductTags.map((tag) => (
                  <p key={tag.id}>{tag.tag}</p>
                ))}
            </div>
          </div>
          <div>
            <p>현재 가격</p>
            <p>
              <span>
                ({' '}
                {totalPrice
                  .reduce((total, currentValue) => total + currentValue, 0)
                  .toLocaleString()}{' '}
                )
              </span>
              {productData && productData[pageNum - 1]?.[selectId]?.price !== undefined
                ? (
                    totalPrice.reduce((total, currentValue) => total + currentValue, 0) +
                    productData[pageNum - 1][selectId].price
                  ).toLocaleString()
                : ''}
              <span>원</span>
            </p>
            <div className="flexHeightCenter">
              <div className="flexCenter" onClick={prevStap}>
                이전
              </div>
              <div className="flexCenter" onClick={nextStap}>
                다음
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 하단 */}
      <div>
        {productData[pageNum - 1] && (
          <Swiper
            slidesPerView={1}
            spaceBetween={5}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
          >
            {productData[pageNum - 1].map((state, idx) => (
              <SwiperSlide onClick={() => setSelectId(idx)} key={idx}>
                <img
                  src={`/img/product/${state.imgRoute}/${
                    state.ProductImgs.find((item) => item.type === 'main')?.img
                  }`}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </MainStyle>
  );
};
export default EstimateMain;
