import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productInquiryGet } from '@reducer/productReducer';
import theme from '@style/theme.js';

import { MainStyle, PaginationBox } from './style';
import InquiryInputForm from './inquiryInputForm';
import InquiryViewForm from './productInquiryViewForm';
import Pagination from 'react-js-pagination';

const ProductInquiryForm = ({ productData, userData, colorTheme, media }) => {
  const dispatch = useDispatch();
  const [inquiryType, setInquiryType] = useState('all');
  const [inquiryData, setInquiryData] = useState([]);
  const [questionMod, setQuestionMod] = useState(false);

  const [activePage, setActivePage] = useState(1);
  // eslint-disable-next-line
  const [items, setItems] = useState(theme.paginationItem.productInquiry);

  const onActivePageHandler = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    console.log(inquiryType);
    dispatch(
      productInquiryGet({
        productId: productData.id,
        inquiryType: inquiryType,
        setInquiryData: setInquiryData,
      }),
    );
  }, [productData, inquiryType, dispatch]);

  const changeQuestionModHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!userData) {
        alert('로그인이 필요합니다');
        return;
      }
      setQuestionMod(true);
    },
    [userData],
  );

  console.log(inquiryData.length);

  return (
    <MainStyle colorTheme={colorTheme} media={media}>
      <section className="flexCenter">{productData.name} : Q & A</section>
      <section>
        <div>
          {!questionMod && (
            <div className="flexCenter" onClick={changeQuestionModHandler}>
              문의하기
            </div>
          )}
          {questionMod && (
            <div className="flexCenter" onClick={() => setQuestionMod(false)}>
              작성취소
            </div>
          )}
          <select
            name="type"
            onChange={(e) => {
              setInquiryType(e.target.value);
            }}
          >
            <option value="all">문의유형(전체)</option>
            <option value="product">상품</option>
            <option value="shipping">배송</option>
            <option value="exchange">교환</option>
            <option value="refund">반품/취소/환불</option>
            <option value="etc">기타</option>
          </select>
        </div>
      </section>
      <section>
        {/* 리뷰 작성 */}
        {questionMod && userData && (
          <InquiryInputForm
            productId={productData.id}
            userData={userData}
            colorTheme={colorTheme}
            media={media}
          />
        )}
        {/* 리뷰O */}
        {inquiryData.length >= 1 && (
          <div className="inquiryData">
            <div className="flexHeightCenter">
              <p>번호</p>
              <p>답변상태</p>
              <p>문의유형</p>
              <p>문의제목</p>
              {media.isPc && <p>작성자(메일)</p>}
              {!media.isPc && <p>나의질문</p>}
            </div>
            {media.isPc &&
              inquiryData
                .slice(items * (activePage - 1), items * (activePage - 1) + items)
                .map((state, key) => (
                  <InquiryViewForm
                    key={key}
                    inquiryData={state}
                    userData={userData}
                    colorTheme={colorTheme}
                    media={media}
                    productId={productData.id}
                  />
                ))}
            {!media.isPc &&
              inquiryData.map((state, key) => (
                <InquiryViewForm
                  key={key}
                  inquiryData={state}
                  userData={userData}
                  colorTheme={colorTheme}
                  media={media}
                  productId={productData.id}
                />
              ))}
            {/* 리뷰X */}
          </div>
        )}
        {inquiryData.length === 0 && (
          <div
            style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f7f7f9',
              margin: '2vh auto 30vh auto',
            }}
          >
            남겨진 문의가 없습니다.
          </div>
        )}
        {inquiryData.length >= 1 && media.isPc && (
          <PaginationBox colorTheme={colorTheme}>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={items}
              totalItemsCount={parseInt(inquiryData.length / 1) + 1}
              prevPageText={'‹'}
              nextPageText={'›'}
              onChange={onActivePageHandler}
            />
          </PaginationBox>
        )}
      </section>
    </MainStyle>
  );
};
export default ProductInquiryForm;
