import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productInquiryGet } from '@reducer/productReducer';

import { MainStyle } from './style';

const ProductInquiryForm = ({ productData, userData, colorTheme, media }) => {
  console.log(productData);
  console.log(userData);
  const dispatch = useDispatch();
  const [inquiryType, setInquiryType] = useState('all');
  const [inquiryData, setInquiryData] = useState([]);

  useEffect(() => {
    console.log(inquiryType);
    dispatch(productInquiryGet({ inquiryType: inquiryType, setInquiryData: setInquiryData }));
  }, [inquiryType, dispatch]);

  return (
    <MainStyle>
      <section>{productData.name}</section>
      <section>
        <div>
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
          <div>문의하기</div>
        </div>
      </section>
      <section>
        {Array.isArray(inquiryData) && inquiryData.length === 0 && (
          <div
            style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f7f7f9',
              margin: '1vh auto',
            }}
          >
            남겨진 문의가 없습니다.
          </div>
        )}
        {inquiryData.length >= 1 && (
          <div>
            {inquiryData.map((state, key) => (
              <div key={state.id} inquiryData={inquiryData[key]}></div>
            ))}
          </div>
        )}
      </section>
    </MainStyle>
  );
};
export default ProductInquiryForm;
