import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { productGetData } from '@reducer/productReducer';

import ProductForm from '../_common/productForm/index.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ProductMainDivStyle, ProductFormDiv } from './style';

const ProductMain = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  // const userData = useContext(ThemeContext).userInfo.userData;

  const [filterFocus, setFilterFocus] = useState(false);
  const [sortFocus, setSortFocus] = useState(false);
  let filterRef = useRef(useParams().filter);
  let sortRef = useRef('인기');

  const filterHandler = useCallback((text) => {
    filterRef.current = text;
  }, []);

  const sortHandler = useCallback((text) => {
    sortRef.current = text;
  }, []);

  useEffect(() => {
    console.log(filterRef.current, sortRef.current);
  }, [sortRef, filterRef]);

  useEffect(() => {
    dispatch(productGetData({ type: 'all' }));
  }, [dispatch]);
  const { productData } = useSelector((state) => state.product);
  console.log(productData);

  return (
    <ProductMainDivStyle colorTheme={colorTheme} media={media}>
      <p>전체 상품</p>
      <div>
        {/* 제품 type */}
        <div onClick={() => setFilterFocus(filterFocus ? false : true)}>
          <div>
            {filterRef.current}
            {filterFocus && <FontAwesomeIcon icon={solid('chevron-up')} className={'icon'} />}
            {!filterFocus && <FontAwesomeIcon icon={solid('chevron-down')} className={'icon'} />}
          </div>
          {filterFocus && (
            <>
              <div onClick={() => filterHandler('전체')}>전체</div>
              <div onClick={() => filterHandler('CASE')}>CASE</div>
              <div onClick={() => filterHandler('PCB')}>PCB</div>
              <div onClick={() => filterHandler('PLATE')}>PLATE</div>
              <div onClick={() => filterHandler('SWITCHES')}>SWITCHES</div>
              <div onClick={() => filterHandler('KEYCAPS')}>KEYCAPS</div>
            </>
          )}
        </div>

        {/* 정렬 */}
        <div onClick={() => setSortFocus(sortFocus ? false : true)}>
          <div>
            {sortRef.current}
            {sortFocus && <FontAwesomeIcon icon={solid('chevron-up')} className={'icon'} />}
            {!sortFocus && <FontAwesomeIcon icon={solid('chevron-down')} className={'icon'} />}
          </div>
          {sortFocus && (
            <>
              <div onClick={() => sortHandler('별점')}>인기</div>
              <div onClick={() => sortHandler('가격 높은 순')}>가격 높은 순</div>
              <div onClick={() => sortHandler('가격 낮은 순')}>가격 낮은 순</div>
              <div onClick={() => sortHandler('추천')}>추천</div>
              <div onClick={() => sortHandler('별점')}>별점</div>
            </>
          )}
        </div>
      </div>
      {/* 상품 */}
      <ProductFormDiv>
        {/* {productData !== null && (
          <>
            {productData.map((state, key) => (
              <ProductForm key={state.id} productData={productData[key]} />
            ))}
          </>
        )} */}
        {productData !== null && (
          <>
            <ProductForm productData={productData[0]} />
            <ProductForm productData={productData[0]} />
            <ProductForm productData={productData[0]} />
            <ProductForm productData={productData[0]} />
            <ProductForm productData={productData[0]} />
            <ProductForm productData={productData[0]} />
          </>
        )}
      </ProductFormDiv>

      <div></div>
    </ProductMainDivStyle>
  );
};
export default ProductMain;
