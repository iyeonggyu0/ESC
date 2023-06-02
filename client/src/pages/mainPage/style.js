import styled from 'styled-components';

export const BannerDiv = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  position: relative;
  z-index: 1;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(188, 188, 188, 1);
  background-blend-mode: multiply;
`;

export const BannerTextDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
`;

export const Advice = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '90vw')};
  height: 65vh;
  margin: 0 auto;
  margin-top: 20vh;
  position: relative;
  /* border: 1px solid #fff; */
  & > div:first-child > p {
    font-family: Ubuntu;
    font-size: ${(props) =>
      props.media.isPc === true
        ? '45px'
        : (props) =>
            props.media.isTablet === true
              ? '35px'
              : (props) => (props.media.isMobile === true ? '25px' : '25px')};
  }
  & > div:first-child > span {
    font-family: Gothic A1;
    line-height: 45px;
    font-size: ${(props) =>
      props.media.isPc === true
        ? ({ theme }) => theme.fontSize.xLarge
        : (props) =>
            props.media.isTablet === true
              ? ({ theme }) => theme.fontSize.large
              : (props) =>
                  props.media.isMobile === true
                    ? ({ theme }) => theme.fontSize.large
                    : ({ theme }) => theme.fontSize.large};
  }
  & > div:nth-child(2) {
    width: 100%;
    height: 50vh;
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
  }
`;

export const IconDiv = styled.div`
  width: 75vw;
  height: 35vh;
  margin: 0 auto;
  margin-top: 20vh;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid
    ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightStroke
        : ({ theme }) => theme.palette.basicLightStroke};
  border-bottom: 1px solid
    ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightStroke
        : ({ theme }) => theme.palette.basicLightStroke};
  & > div {
    text-align: center;
    cursor: pointer;
    font-family: Gothic A1;
    transition: all 0.3s;
  }
  & > div:hover {
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightFont
        : ({ theme }) => theme.palette.basicSubFont};
  }
  .icon {
    font-size: ${(props) =>
      props.media.isPc === true
        ? '62px'
        : (props) =>
            props.media.isTablet === true
              ? ({ theme }) => theme.fontSize.xxxxLarge
              : ({ theme }) => theme.fontSize.xxxxLarge};
    margin-bottom: 20px;
  }
`;

export const Fixed = styled.div`
  /* 픽스드 */
  width: 100%;
  height: 35vh;
  margin-top: 20vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
`;

export const MainPageDiv = styled.div`
  position: relative;
  background-color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.gameBg
      : ({ theme }) => theme.palette.basicBg};
  color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.white
      : ({ theme }) => theme.palette.basicFont};
  z-index: 1;
  /* Slide 이미지 */
  .gameSlide1 {
    background-image: url('/img/slider/game/sliderImg_1.webp');
  }
  .gameSlide2 {
    background-image: url('/img/slider/game/sliderImg_2.webp');
  }
  .gameSlide3 {
    background-image: url('/img/slider/game/sliderImg_3.webp');
  }
  .gameSlide4 {
    background-image: url('/img/slider/game/sliderImg_4.webp');
  }
  .gameSlide5 {
    background-image: url('/img/slider/game/sliderImg_5.webp');
  }
  .basicSlide1 {
    background-image: url('/img/slider/basic/sliderImg_1.webp');
  }
  .basicSlide2 {
    background-image: url('/img/slider/basic/sliderImg_2.webp');
  }
  .basicSlide3 {
    background-image: url('/img/slider/basic/sliderImg_3.webp');
  }
  .basicSlide4 {
    background-image: url('/img/slider/basic/sliderImg_4.webp');
  }
  .basicSlide5 {
    background-image: url('/img/slider/basic/sliderImg_5.webp');
  }
  .FixedImgGame {
    background-image: url('/img/fixed/game_fixedImg.webp');
    background-position-y: ${(props) => (props.media.isPc ? '-55vh' : '')};
  }
  .FixedImgBasic {
    background-image: url('/img/fixed/basic_fixedImg.webp');
    background-position-y: ${(props) => (props.media.isPc ? '-165vh' : '-10vh')};
  }
  /* Swiper css */
  .swiper-pagination-bullet-active {
    border: 1px solid #dedede;
  }
  .swiper-pagination-bullet {
    background-color: rgba(233, 233, 233, 1);
    z-index: 3;
  }
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal {
    bottom: 20vh;
    z-index: 3;
  }
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 12px);
  }
`;
