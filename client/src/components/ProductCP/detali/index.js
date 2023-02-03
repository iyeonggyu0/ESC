import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';

import { productGetOneData } from '@reducer/productReducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ProductDetaliMain, ProductDetaliHeader } from './style';
import CommonLoadingPage from '../../_common/loadingPage';

const ProductDetliMain = () => {
  const media = useMedia();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  // const userData = useContext(ThemeContext).userInfo.userData;

  const productId = useParams().productId;
  const [productData, setProductData] = useState(null);

  const [img, setImg] = useState(null);
  const [detailedImg, setDetailedImg] = useState(null);
  const [price, setPrice] = useState('');

  const [pageMod, setPageMod] = useState('상세설명');

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
        setDetailedImg(`"${productData.detailedImg}"`);
      }
    }
    console.log(productData);
  }, [productData]);

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
          <ProductDetaliMain
            media={media}
            colorTheme={colorTheme}
            img={img}
            detailedImg={detailedImg}
          >
            {/* mainImg, 가격, 구매버튼 등 */}
            <section>
              <div></div>
              <div>
                <p>{productData.name}</p>
                <p>
                  {productData.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <div onClick={() => navigate('/')}>{/* 구매버튼 */}</div>
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
              </div>
            </section>
          </ProductDetaliMain>
        </div>
      )}
    </>
  );
};
export default ProductDetliMain;
