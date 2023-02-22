import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInput } from '@hooks/useInput';
import TextareaAutosize from 'react-textarea-autosize';
import { productInquiry } from '@reducer/productReducer';

import { MainStyle } from './style';
import { useCallback } from 'react';
import { useEffect } from 'react';

const InquiryInputForm = ({ productId, userData, colorTheme, media }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(null);
  const [secret, setSecret] = useState(false);
  const [content, setContent] = useState(null);
  const [inquiryType, setInquiryType] = useState(null);

  const onPostHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (title === null) {
        if (!alert('TITLE을 입력해주세요')) {
          return;
        }
      }
      if (content === null) {
        if (!alert('CONTENT을 입력해주세요')) {
          return;
        }
      }
      if (inquiryType === null) {
        if (!alert('문의유형을 선택하세요')) {
          return;
        }
      }

      if (!userData) {
        if (!alert('로그인이 필요합니다')) return;
      }

      const data = {
        productId: productId,
        email: userData.email,
        title: title,
        secret: secret,
        content: content,
        inquiryType: inquiryType,
      };
      dispatch(productInquiry({ data: data }));
    },
    [title, content, inquiryType, secret, productId, userData, dispatch],
  );

  return (
    <MainStyle colorTheme={colorTheme} media={media}>
      <div>
        <p>
          TITLE<span>*</span>
        </p>
        <input
          type="text"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
          autoFocus
        />
      </div>
      <div>
        <div className="flexCenter">
          <p>
            문의유형<span>*</span>
          </p>
          <select
            name="inquiryType"
            onChange={(e) => {
              setInquiryType(e.target.value);
            }}
          >
            <option value="none">-선택-</option>
            <option value="product">상품</option>
            <option value="shipping">배송</option>
            <option value="exchange">교환</option>
            <option value="refund">반품/취소/환불</option>
            <option value="etc">기타</option>
          </select>
        </div>
        <div>
          <label for="secret">비밀글</label>
          <input
            type="checkbox"
            id="secret"
            name="secret"
            onClick={() => (secret === false ? setSecret(true) : setSecret(false))}
          />
        </div>
      </div>
      <div>
        <p>
          CONTENT<span>*</span>
        </p>
        <TextareaAutosize
          value={content || ''}
          onChange={(e) => setContent(e.target.value)}
          minRows={10}
          spellcheck="false"
        />
      </div>
      <div className="flexCenter" onClick={onPostHandler}>
        저장
      </div>
    </MainStyle>
  );
};
export default InquiryInputForm;
