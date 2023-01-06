import MainLayOut from '../../layout/mainLayOut';
import { useMedia } from '../../hooks/useMedia';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

// library
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

// Style
import { BannerDiv, BannerTextDiv, MainPageDiv, Advice, IconDiv, Fixed } from './style';

// Components
import BannerText from '../../components/mainCP/bannerText';
import MainPageProduct from '../../components/mainCP/product';

const MainPage = () => {
    // eslint-disable-next-line
    const media = useMedia();
    const colorTheme = useContext(ThemeContext).colorTheme;
    const navigate = useNavigate();

    return (
        <MainLayOut>
            <MainPageDiv colorTheme={colorTheme}>
                <BannerTextDiv>
                    <BannerText />
                </BannerTextDiv>
                <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    effect={'fade'}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    spaceBetween={0}
                    slidesPerView={1}
                >
                    {/* Slide */}
                    <SwiperSlide>
                        {colorTheme === 'game' && <BannerDiv className="gameSlide1"></BannerDiv>}
                        {colorTheme === 'basic' && <BannerDiv className="basicSlide1"></BannerDiv>}
                    </SwiperSlide>

                    <SwiperSlide>
                        {colorTheme === 'game' && <BannerDiv className="gameSlide2"></BannerDiv>}
                        {colorTheme === 'basic' && <BannerDiv className="basicSlide2"></BannerDiv>}
                    </SwiperSlide>

                    <SwiperSlide>
                        {colorTheme === 'game' && <BannerDiv className="gameSlide3"></BannerDiv>}
                        {colorTheme === 'basic' && <BannerDiv className="basicSlide3"></BannerDiv>}
                    </SwiperSlide>

                    <SwiperSlide>
                        {colorTheme === 'game' && <BannerDiv className="gameSlide4"></BannerDiv>}
                        {colorTheme === 'basic' && <BannerDiv className="basicSlide4"></BannerDiv>}
                    </SwiperSlide>

                    <SwiperSlide>
                        {colorTheme === 'game' && <BannerDiv className="gameSlide5"></BannerDiv>}
                        {colorTheme === 'basic' && <BannerDiv className="basicSlide5"></BannerDiv>}
                    </SwiperSlide>
                </Swiper>
                <Advice colorTheme={colorTheme} media={media}>
                    {/* POPULAR CUSTOM */}
                    <div>
                        <p>POPULAR CUSTOM</p>
                        {colorTheme === 'game' && (
                            <span>게이머들이 추천하는 커스텀 조합입니다.</span>
                        )}
                        {colorTheme === 'basic' && (
                            <span>회사원들이 추천하는 커스텀 조합입니다.</span>
                        )}
                    </div>
                    <div>
                        <MainPageProduct />
                        <MainPageProduct />
                        <MainPageProduct />
                        {/* Swiper map 돌리기 */}
                    </div>
                </Advice>
                {(media.isPc === true || media.isTablet === true) && (
                    <div>
                        <IconDiv colorTheme={colorTheme} media={media}>
                            <div onClick={() => navigate('/')}>
                                <FontAwesomeIcon icon={regular('clipboard')} className={'icon'} />
                                <p>견적내기</p>
                            </div>
                            <div onClick={() => navigate('/')}>
                                <FontAwesomeIcon icon={regular('comment')} className={'icon'} />
                                <p>커뮤니티</p>
                            </div>
                            <div onClick={() => navigate('/')}>
                                <FontAwesomeIcon icon={solid('bag-shopping')} className={'icon'} />
                                <p>전체상품</p>
                            </div>
                            <div onClick={() => navigate('/')}>
                                <FontAwesomeIcon icon={regular('paper-plane')} className={'icon'} />
                                <p>고객센터</p>
                            </div>
                        </IconDiv>
                    </div>
                )}
                {colorTheme === 'game' && <Fixed className="FixedImgGame" media={media}></Fixed>}
                {colorTheme === 'basic' && <Fixed className="FixedImgBasic" media={media}></Fixed>}
                <Advice colorTheme={colorTheme} media={media}>
                    {/* POPULAR PRODUCTS */}
                    <div>
                        <p>POPULAR PRODUCTS</p>
                        {colorTheme === 'game' && <span>인기 게이밍 키보드</span>}
                        {colorTheme === 'basic' && <span>인기 사무용 키보드</span>}
                    </div>
                    <div>
                        <MainPageProduct />
                        <MainPageProduct />
                        <MainPageProduct />
                        {/* Swiper map 돌리기 */}
                    </div>
                </Advice>
                <div style={{ marginTop: '30vh', height: '1px' }}></div>
            </MainPageDiv>
        </MainLayOut>
    );
};
export default MainPage;
