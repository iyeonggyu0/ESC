import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { productGetData } from '@reducer/productReducer';
import theme from '@style/theme.js';

import ProductForm from '../_common/productForm/index.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ProductMainDivStyle, ProductFormDiv, PaginationBox } from './style';
import CommonLoading from '../../_common/loading';
import ProductBigSizeForm from '../_common/productForm2';
import Pagination from 'react-js-pagination';

const ProductMain = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const params = useParams().filter;

  const [filterFocus, setFilterFocus] = useState(false);
  const [sortFocus, setSortFocus] = useState(false);
  const [filter, setFilter] = useState(localStorage.getItem('filter'));
  const [sort, setSort] = useState(localStorage.getItem('sort'));
  const [boxSize, setBoxSize] = useState(localStorage.getItem('boxSize'));

  const [admin, setAdmin] = useState('ADMIN');
  const [adminFocus, setAdminFocus] = useState(false);
  const [productModifyMod, setProductModifyMod] = useState(false);

  const [activePage, setActivePage] = useState(1);
  const [items, setItems] = useState(theme.paginationItem.productMainBig);

  const onActivePageHandler = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    if (localStorage.getItem('locSet') === null) {
      localStorage.setItem('locSet', 'set');
      localStorage.setItem('boxSize', 'big');
      localStorage.setItem('filter', `${params}`);
      localStorage.setItem('sort', `??????`);
      localStorage.setItem('pageModLoc', '????????????');
      setFilter(`${params}`);
      setSort('??????');
    }

    if (localStorage.getItem('boxSize') === 'big') {
      setItems(theme.paginationItem.productMainBig);
    } else {
      setItems(theme.paginationItem.productMainSmall);
    }

    if (localStorage.getItem('filter') !== `${params}`) {
      localStorage.setItem('filter', `${params}`);
      setFilter(`${params}`);
    }
    // eslint-disable-next-line
  }, []);

  const filterHandler = useCallback((text) => {
    localStorage.setItem('filter', `${text}`);
    setFilter(`${text}`);

    if (text === 'big') {
      setItems(8);
    } else {
      setItems(18);
    }
    // eslint-disable-next-line
  }, []);

  const sortHandler = useCallback((text) => {
    localStorage.setItem('sort', `${text}`);
    setSort(`${text}`);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('boxSize', `${boxSize}`);
    // eslint-disable-next-line
  }, [boxSize]);

  const productModify = useCallback((text) => {
    if (text === true) {
      setAdmin('?????? ??????');
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
    <ProductMainDivStyle colorTheme={colorTheme} media={media} boxSize={boxSize}>
      <p>?????? ??????</p>
      <div>
        {/* ?????? type */}
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
              <div onClick={() => filterHandler('KEYBOARD')}>KEYBOARD</div>
            </>
          )}
        </div>

        {/* ?????? */}
        <div onClick={() => setSortFocus(sortFocus ? false : true)}>
          <div>
            {sort}
            {sortFocus && (media.isPc || (sort !== '?????? ?????? ???' && sort !== '?????? ?????? ???')) && (
              <FontAwesomeIcon icon={solid('chevron-up')} className={'icon'} />
            )}
            {!sortFocus && (media.isPc || (sort !== '?????? ?????? ???' && sort !== '?????? ?????? ???')) && (
              <FontAwesomeIcon icon={solid('chevron-down')} className={'icon'} />
            )}
          </div>
          {sortFocus && (
            <>
              <div onClick={() => sortHandler('??????')}>??????</div>
              <div onClick={() => sortHandler('?????? ?????? ???')}>?????? ?????? ???</div>
              <div onClick={() => sortHandler('?????? ?????? ???')}>?????? ?????? ???</div>
              <div onClick={() => sortHandler('??????')}>??????</div>
              <div onClick={() => sortHandler('??????')}>??????</div>
            </>
          )}
        </div>

        {/* ADMIN */}
        {userData !== null && userData.authority === 'admin' && (
          <div className="div3" onClick={() => setAdminFocus(adminFocus ? false : true)}>
            <div>
              {admin}
              {adminFocus && <FontAwesomeIcon icon={solid('chevron-up')} className={'icon'} />}
              {!adminFocus && <FontAwesomeIcon icon={solid('chevron-down')} className={'icon'} />}
            </div>
            {adminFocus && (
              <>
                <div onClick={() => window.open(`/product/enrollment`)}>????????????</div>
                <div onClick={() => productModify(true)}>????????????</div>
                <div onClick={() => productModify(false)}>?????? ?????????</div>
              </>
            )}
          </div>
        )}
        <div
          className="boxsize"
          style={{
            right:
              userData !== null && userData.authority === 'admin'
                ? media.isPc
                  ? '150px'
                  : 'calc(25% + 10px)'
                : '0px',
          }}
        >
          <FontAwesomeIcon
            icon={regular('square')}
            className={'big icon'}
            onClick={() => setBoxSize('big')}
          />
          <FontAwesomeIcon
            icon={solid('table-cells-large')}
            className={'small icon'}
            onClick={() => setBoxSize('small')}
          />
        </div>
      </div>

      {/* ?????? */}
      <ProductFormDiv>
        {productData === null && <CommonLoading />}
        {productData !== null && boxSize === 'big' && (
          <>
            {media.isPc &&
              productData
                .slice(items * (activePage - 1), items * (activePage - 1) + items)
                .map((state, key) => (
                  <ProductBigSizeForm
                    key={key}
                    productData={state}
                    productModifyMod={productModifyMod}
                  />
                ))}
            {!media.isPc &&
              productData.map((state, key) => (
                <ProductBigSizeForm
                  key={state.id}
                  productData={productData[key]}
                  productModifyMod={productModifyMod}
                />
              ))}
          </>
        )}

        {productData !== null && boxSize === 'small' && (
          <>
            {media.isPc &&
              productData
                .slice(items * (activePage - 1), items * (activePage - 1) + items)
                .map((state, key) => (
                  <ProductForm key={key} productData={state} productModifyMod={productModifyMod} />
                ))}
            {!media.isPc &&
              productData.map((state, key) => (
                <ProductForm key={key} productData={state} productModifyMod={productModifyMod} />
              ))}
          </>
        )}
        {productData !== null && media.isPc && (
          <PaginationBox colorTheme={colorTheme}>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={items}
              totalItemsCount={parseInt(productData.length / 1) + 1}
              prevPageText={'???'}
              nextPageText={'???'}
              onChange={onActivePageHandler}
            />
          </PaginationBox>
        )}
      </ProductFormDiv>
    </ProductMainDivStyle>
  );
};
export default ProductMain;
