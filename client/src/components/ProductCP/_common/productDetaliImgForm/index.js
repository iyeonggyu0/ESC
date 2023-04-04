import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styled from 'styled-components';

const ProductDetaliImgForm = ({ imgs, media, colorTheme, imgRoute }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Div media={media} colorTheme={colorTheme}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={3}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {/* imgRoute={imgRoute} img={img.img} */}
        {imgs?.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={`/img/product/${imgRoute}/${img.img}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={1}
        slidesPerView={imgs?.length > 5 ? 5 : imgs?.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imgs?.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={`/img/product/${imgRoute}/${img.img}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Div>
  );
};
export default ProductDetaliImgForm;

export const Div = styled.div`
  width: ${(props) => (props.media.isPc ? '50vw' : '95vw')};
  height: ${(props) => (props.media.isPc ? 'calc(100vh - 2.3rem - 221px)' : '95vw')};
  margin: ${(props) => (props.media.isPc ? '0' : '10px auto')};
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;

  & .swiper {
    width: 100%;
    height: 300px;
  }

  & .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  & .mySwiper2 {
    height: 80%;
    width: 100%;
  }

  & .mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 1px 0 0 0;
  }

  & .mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.6;
  }

  & .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
  }

  & .swiper-button-prev,
  & .swiper-button-next {
    display: none;
  }

  & .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;
