import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productGetData } from '@reducer/productReducer';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { MainStyle, ProductFormDiv, PaginationBox } from './style';
import { ThemeContext } from '../../../../App.js';
import CommonLoading from '../../../_common/loading';
import { useMedia } from '../../../../hooks/useMedia';
import ProductAdminForm from './productAdminForm';
import Pagination from 'react-js-pagination';
import theme from '@style/theme.js';

const InventoryQuantity = () => {
  const media = useMedia();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;

  const [filterFocus, setFilterFocus] = useState(false);
  const [sortFocus, setSortFocus] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [sort, setSort] = useState('재고 적은 순');
  const [activePage, setActivePage] = useState(1);
  // eslint-disable-next-line
  const [items, setItems] = useState(theme.paginationItem.adminInventoryQuantity);

  const { productData } = useSelector((state) => state.product);

  const onActivePageHandler = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    if (productData) {
      setFilter(localStorage.getItem('filter'));
      setSort(localStorage.getItem('sort'));
    } else if (!productData) {
      dispatch(productGetData({ type: `${filter}/${sort}` }));
    }
    // eslint-disable-next-line
  }, []);

  const reLodeProduct = useCallback(() => {
    dispatch(productGetData({ type: `${filter}/${sort}` }));
    setActivePage(1);
  }, [filter, sort, dispatch]);

  return (
    <MainStyle colorTheme={colorTheme} media={media}>
      <p>상품 목록</p>
      <div>
        {/* 제품 type */}
        <div onClick={() => setFilterFocus(filterFocus ? false : true)}>
          <div className="flexCenter">
            {filter}
            {filterFocus && media.isPc && (
              <FontAwesomeIcon icon={solid('chevron-up')} className={'icon'} />
            )}
            {!filterFocus && media.isPc && (
              <FontAwesomeIcon icon={solid('chevron-down')} className={'icon'} />
            )}
          </div>
          {filterFocus && (
            <>
              <div onClick={() => setFilter('ALL')}>ALL</div>
              <div onClick={() => setFilter('CASE')}>CASE</div>
              <div onClick={() => setFilter('PCB')}>PCB</div>
              <div onClick={() => setFilter('PLATE')}>PLATE</div>
              <div onClick={() => setFilter('SWITCHES')}>SWITCHES</div>
              <div onClick={() => setFilter('KEYCAPS')}>KEYCAPS</div>
              <div onClick={() => setFilter('KEYBOARD')}>KEYBOARD</div>
            </>
          )}
        </div>

        {/* 정렬 */}
        <div onClick={() => setSortFocus(sortFocus ? false : true)}>
          <div className="flexCenter">
            {sort}
            {sortFocus && media.isPc && (
              <FontAwesomeIcon icon={solid('chevron-up')} className={'icon'} />
            )}
            {!sortFocus && media.isPc && (
              <FontAwesomeIcon icon={solid('chevron-down')} className={'icon'} />
            )}
          </div>
          {sortFocus && (
            <>
              <div onClick={() => setSort('인기')}>인기</div>
              <div onClick={() => setSort('가격 높은 순')}>가격 높은 순</div>
              <div onClick={() => setSort('가격 낮은 순')}>가격 낮은 순</div>
              <div onClick={() => setSort('추천')}>추천</div>
              <div onClick={() => setSort('별점')}>별점</div>
              <div onClick={() => setSort('재고 순')}>재고 순</div>
              <div onClick={() => setSort('재고 적은 순')}>재고 적은 순</div>
            </>
          )}
        </div>
        <div onClick={reLodeProduct} className="flexCenter">
          상품 로드
        </div>
      </div>

      {/* 상품 */}
      <ProductFormDiv>
        {productData === null && <CommonLoading />}
        {productData !== null && (
          <>
            <div className="ProductFormDivMenu flexHeightCenter">
              <p>ID</p>
              <p>타입</p>
              <p>상품명</p>
              <p>가격</p>
              <p>재고</p>
              <p>상품수정</p>
            </div>
            {productData && (
              <>
                {productData
                  .slice(items * (activePage - 1), items * (activePage - 1) + items)
                  .map((state, key) => (
                    <ProductAdminForm key={key} productData={state} />
                  ))}
                <PaginationBox colorTheme={colorTheme}>
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={items}
                    totalItemsCount={parseInt(productData.length / 1) + 1}
                    prevPageText={'‹'}
                    nextPageText={'›'}
                    onChange={onActivePageHandler}
                  />
                </PaginationBox>
              </>
            )}
          </>
        )}
      </ProductFormDiv>
    </MainStyle>
  );
};
export default InventoryQuantity;
