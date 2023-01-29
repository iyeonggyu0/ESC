import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const userData = useContext(ThemeContext).userInfo.userData;
  console.log(userData);

  const [filterFocus, setFilterFocus] = useState(false);
  const [sortFocus, setSortFocus] = useState(false);
  const [filter, setFilter] = useState(localStorage.getItem('filter'));
  const [sort, setSort] = useState(localStorage.getItem('sort'));

  const [admin, setAdmin] = useState('ADMIN');
  const [adminFocus, setAdminFocus] = useState(false);
  const [productModifyMod, setProductModifyMod] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('locSet') === null) {
      localStorage.setItem('locSet', 'set');
      localStorage.setItem('filter', `ALL`);
      localStorage.setItem('sort', `인기`);
      setFilter('ALL');
      setSort('인기');
    }
    // eslint-disable-next-line
  }, []);

  const filterHandler = useCallback((text) => {
    localStorage.setItem('filter', `${text}`);
    setFilter(`${text}`);
    // eslint-disable-next-line
  }, []);

  const sortHandler = useCallback((text) => {
    localStorage.setItem('sort', `${text}`);
    setSort(`${text}`);
    // eslint-disable-next-line
  }, []);

  const productModify = useCallback((text) => {
    if (text === true) {
      setAdmin('수정 모드');
      setProductModifyMod(true);
    } else if (text === false) {
      setAdmin('ADMIN');
      setProductModifyMod(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(productGetData({ type: `${filter}/${sort}` }));
  }, [filter, sort, dispatch]);
  const { productData } = useSelector((state) => state.product);

  return (
    <ProductMainDivStyle colorTheme={colorTheme} media={media}>
      <p>전체 상품</p>
      <div>
        {/* 제품 type */}
        <div onClick={() => setFilterFocus(filterFocus ? false : true)}>
          <div>
            {filter}
            {filterFocus && <FontAwesomeIcon icon={solid('chevron-up')} className={'icon'} />}
            {!filterFocus && <FontAwesomeIcon icon={solid('chevron-down')} className={'icon'} />}
          </div>
          {filterFocus && (
            <>
              <div onClick={() => filterHandler('ALL')}>ALL</div>
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
            {sort}
            {sortFocus && <FontAwesomeIcon icon={solid('chevron-up')} className={'icon'} />}
            {!sortFocus && <FontAwesomeIcon icon={solid('chevron-down')} className={'icon'} />}
          </div>
          {sortFocus && (
            <>
              <div onClick={() => sortHandler('인기')}>인기</div>
              <div onClick={() => sortHandler('가격 높은 순')}>가격 높은 순</div>
              <div onClick={() => sortHandler('가격 낮은 순')}>가격 낮은 순</div>
              <div onClick={() => sortHandler('추천')}>추천</div>
              <div onClick={() => sortHandler('별점')}>별점</div>
            </>
          )}
        </div>

        {/* ADMIN */}
        {userData !== null && userData.authority === 'admin' && (
          <div onClick={() => setAdminFocus(adminFocus ? false : true)}>
            <div>
              {admin}
              {adminFocus && <FontAwesomeIcon icon={solid('chevron-up')} className={'icon'} />}
              {!adminFocus && <FontAwesomeIcon icon={solid('chevron-down')} className={'icon'} />}
            </div>
            {adminFocus && (
              <>
                <div onClick={() => productModify(true)}>수정모드</div>
                <div onClick={() => productModify(false)}>모드 초기화</div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 상품 */}
      <ProductFormDiv>
        {productData !== null && (
          <>
            {productData.map((state, key) => (
              <ProductForm
                key={state.id}
                productData={productData[key]}
                productModifyMod={productModifyMod}
              />
            ))}
          </>
        )}
      </ProductFormDiv>
    </ProductMainDivStyle>
  );
};
export default ProductMain;
