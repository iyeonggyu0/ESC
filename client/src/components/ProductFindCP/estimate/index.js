import { useCallback, useContext, useEffect, useState } from 'react';
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

const EstimateMain = ({ productData }) => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const pageNum = useParams('').pageNum;

  const [selectId, setSelectId] = useState(0);
  console.log(selectId);

  useEffect(() => {
    setSelectId(0);
    if (pageNum === 1) {
      localStorage.setItem('totalPrice', 0);
      localStorage.setItem('selection', [0, 0, 0, 0, 0]);
    }
  }, [pageNum]);

  const nextStap = () => {
    let totalPrice = parseInt(localStorage.getItem('totalPrice'));
    let selection = localStorage.getItem('selection');
    if (selection === null) {
      selection = [0, 0, 0, 0, 0];
    } else {
      selection = selection.split(',').map(Number);
    }

    totalPrice += productData[pageNum - 1][selectId].price;
    selection[pageNum - 1] = productData[pageNum - 1][selectId].id;

    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('selection', selection);
  };

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
            className="mySwiper"
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
            {productData[pageNum - 1] && (
              <ul>
                {productData[pageNum - 1][selectId].ProductTags.map((tag) => (
                  <li key={tag.id}>{tag.tag}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <p>현재 가격</p>
            <p>
              {parseInt(localStorage.getItem('totalPrice')).toLocaleString()}
              <span>원</span>
            </p>
            <div>
              <div>이전</div>
              <div onClick={nextStap}>다음</div>
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
