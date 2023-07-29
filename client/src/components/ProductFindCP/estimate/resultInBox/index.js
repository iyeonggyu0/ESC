import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../hooks/useMedia';
import { MainStyle } from './style';
import { useContext } from 'react';
import { ThemeContext } from '../../../../App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import ProductOptionView from '../../../ProductCP/_common/productOption/optionView';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDiscountDate } from '../../../../hooks/useDiscountDate';

const EstimateResultInBox = ({ productData, saveOrder, idx }) => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;

  const [productOption, setProductOption] = useState([]);
  const [productOptionCheck, setProductOptionCheck] = useState([]);

  const [discountData, setDiscountData] = useState();
  const [discountDataCheck, setDiscountDataCheck] = useDiscountDate(productData);

  // console.log(productOption, productOptionCheck, productOrderList, productQuantity);

  useEffect(() => {
    if (productData.ProductOptions) {
      setProductOption(productData.ProductOptions);
    }
  }, [productData]);

  const textFun = (text, f) => {
    f(text);
  };

  // 상품 링크 이동
  const productUrlMovement = () => {
    window.open(`/product/${productData.id}`, '_blank');
  };

  const onProductOptionCheck = (optionName, optionValue, amount) => {
    // 상태 배열을 직접 수정할 수 있도록 복사
    const updatedProductOptionCheck = [...productOptionCheck];

    if (optionValue === '선택') {
      const existingOptionIndex = updatedProductOptionCheck.findIndex(
        (option) => option.optionName === optionName,
      );

      if (existingOptionIndex !== -1) {
        // 배열에서 해당 optionName을 가진 요소를 삭제
        updatedProductOptionCheck.splice(existingOptionIndex, 1);
        setProductOptionCheck(updatedProductOptionCheck);
      }
      return;
    }

    const existingOptionIndex = updatedProductOptionCheck.findIndex(
      (option) => option.optionName === optionName,
    );

    if (existingOptionIndex !== -1) {
      // 기존 객체를 수정하여 업데이트
      updatedProductOptionCheck[existingOptionIndex].optionValue = optionValue;
      updatedProductOptionCheck[existingOptionIndex].amount = amount;
    } else {
      updatedProductOptionCheck.push({ optionName, optionValue, amount });
    }

    // 변경된 배열로 상태를 업데이트
    setProductOptionCheck(updatedProductOptionCheck);
  };

  // console.log(idx);

  const handleProductQuantity = () => {
    // productOption에서 essential이 true인 옵션들의 optionName들을 추출하여 배열에 저장
    const essentialOptionNames = productOption
      .filter((option) => option.essential)
      .map((option) => option.optionName);
    // productOptionCheck에 있는 optionName들을 추출하여 배열에 저장
    const checkedOptionNames = productOptionCheck.map((option) => option.optionName);

    // essentialOptionNames 배열에 있는 모든 optionName들이 checkedOptionNames 배열에 있는지 확인
    const isAllEssentialOptionsChecked = essentialOptionNames.every((optionName) =>
      checkedOptionNames.includes(optionName),
    );

    if (!isAllEssentialOptionsChecked) {
      return alert('필수 옵션을 선택하세요');
    } else {
      // 새로운 객체를 생성하여 productOptionCheck와 productQuantity를 포함하여 productOrderList 배열의 뒤에 추가
      const newOrder = { productOptionCheck, productQuantity: 1 };
      saveOrder(newOrder, idx);
    }
  };

  useEffect(() => {
    if (productData.ProductDiscount !== null) {
      setDiscountData(productData.ProductDiscount);
      setDiscountDataCheck(productData.ProductDiscount);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <img
        src={`/img/product/${productData.imgRoute}/${
          productData.ProductImgs.find((item) => item.type === 'main')?.img
        }`}
        loading="lazy"
      />
      <div>
        <div>
          <p onClick={productUrlMovement}>{productData.name}</p>
          <p>
            {productData.grade === 0 && <span>리뷰 없음</span>}
            {0 < productData.grade && <FontAwesomeIcon icon={solid('star')} />}
            {2 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
            {3 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
            {4 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
            {5 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
            {/* 리뷰 수량 표시하기 */}
            <span> ({productData.ProductReviews.length})&nbsp;</span>
          </p>
        </div>
        <div>
          {productOption.length > 0 &&
            productOption.map((opt, key) => (
              <ProductOptionView
                key={key}
                textFun={textFun}
                setProductOption={setProductOption}
                data={opt}
                onProductOptionCheck={onProductOptionCheck}
              />
            ))}
        </div>
        {productOption.length > 0 && (
          <div className="flexCenter" onClick={() => handleProductQuantity()}>
            옵션저장
          </div>
        )}
        <p>
          +{' '}
          {!discountDataCheck && (
            <span>
              {(
                productData.price +
                productOptionCheck?.reduce((accumulator, innerArray) => {
                  return accumulator + innerArray.amount;
                }, 0)
              ).toLocaleString()}
              원
            </span>
          )}
          {discountDataCheck && (
            <span
              className="text"
              style={{
                color: 'gray',
                fontSize: media.isPc ? '1rem' : '0.9rem',
                paddingRight: '1rem',
              }}
            >
              <FontAwesomeIcon icon={solid('tags')} className={'icon'} />
              {productOptionCheck?.length === 0
                ? productData.price.toLocaleString()
                : productData.price +
                  productOptionCheck?.reduce((accumulator, innerArray) => {
                    return accumulator + innerArray.amount;
                  }, 0)}
              원
            </span>
          )}
          {discountDataCheck && (
            <span>
              {(
                productData.price +
                productOptionCheck?.reduce((accumulator, innerArray) => {
                  return accumulator + innerArray.amount;
                }, 0) -
                discountData.discountAmount
              ).toLocaleString()}
              원
            </span>
          )}
        </p>
      </div>
    </MainStyle>
  );
};
export default EstimateResultInBox;
