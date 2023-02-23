import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productInquiryGet } from '@reducer/productReducer';

import { MainStyle } from './style';
import InquiryInputForm from './inquiryInputForm';
import InquiryViewForm from './productInquiryViewForm';

const ProductInquiryForm = ({ productData, userData, colorTheme, media }) => {
  const dispatch = useDispatch();
  const [inquiryType, setInquiryType] = useState('all');
  const [inquiryData, setInquiryData] = useState([]);

  const [questionMod, setQuestionMod] = useState(false);

  useEffect(() => {
    console.log(inquiryType);
    dispatch(productInquiryGet({ inquiryType: inquiryType, setInquiryData: setInquiryData }));
  }, [inquiryType, dispatch]);

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
        {/* 리뷰 작성  FIXME: 조건에 userData 추가하기 */}
        {questionMod && userData && (
          <InquiryInputForm
            productId={productData.id}
            userData={userData}
            colorTheme={colorTheme}
            media={media}
          />
        )}
        {/* 리뷰X */}
        {Array.isArray(inquiryData) && inquiryData.length === 0 && (
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
        {/* 리뷰O */}
        {inquiryData.length >= 1 && (
          <div className="inquiryData">
            <div className="flexHeightCenter">
              <p>고유번호</p>
              <p>답변상태</p>
              <p>문의유형</p>
              <p>문의제목</p>
              <p>작성자(메일)</p>
            </div>
            {inquiryData.map((state, key) => (
              <InquiryViewForm
                key={state.id}
                inquiryData={inquiryData[key]}
                userData={userData}
                colorTheme={colorTheme}
                media={media}
              />
            ))}
          </div>
        )}
      </section>
    </MainStyle>
  );
};
export default ProductInquiryForm;
