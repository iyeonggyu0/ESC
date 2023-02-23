import { useInput } from '@hooks/useInput';
import TextareaAutosize from 'react-textarea-autosize';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { productReviewPost } from '@reducer/productReducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { InputForm, ButtonForm } from './style';
import { useMedia } from '../../../../hooks/useMedia';

const ReviewInputForm = ({ colorTheme, productData, userData }) => {
  const [text, onChangeText] = useInput('');
  const [textBr, setTextBr] = useState('');
  const [grade, setGrade] = useState(5);

  const media = useMedia();
  const dispatch = useDispatch();

  useEffect(() => {
    // setTextBr(text.replace(/(\n|\r\n)/g, '<br/>'));
    setTextBr(text);
    // eslint-disable-next-line
  }, [text]);

  const onPostReview = useCallback(
    (e) => {
      e.preventDefault();
      const data = {
        productId: productData.id,
        reviewerEmail: userData.email,
        reviewerGrade: grade,
        content: textBr,
      };

      if (textBr.length === 0) {
        if (window.confirm('내용을 입력해주세요')) {
          return;
        }
        return;
      }

      dispatch(productReviewPost({ data: data }));
    },
    [textBr, grade, userData, productData, dispatch],
  );

  return (
    <>
      {/* FIXME: 최근 한달 사이 구매이력 확인하기, 동일상품 리뷰 불가(주문내역과 관계설정) */}
      {userData !== null && (
        <>
          <InputForm media={media} colorTheme={colorTheme}>
            <div>{productData.name} - 리뷰 작성</div>
            <div>
              <div>
                <p>별점: </p>
                <div className="star">
                  <FontAwesomeIcon
                    icon={solid('star')}
                    onClick={() => setGrade(1)}
                    style={{ color: grade >= 1 ? 'black' : 'gray' }}
                  />
                  <FontAwesomeIcon
                    icon={solid('star')}
                    onClick={() => setGrade(2)}
                    style={{ color: grade >= 2 ? 'black' : 'gray' }}
                  />
                  <FontAwesomeIcon
                    icon={solid('star')}
                    onClick={() => setGrade(3)}
                    style={{ color: grade >= 3 ? 'black' : 'gray' }}
                  />
                  <FontAwesomeIcon
                    icon={solid('star')}
                    onClick={() => setGrade(4)}
                    style={{ color: grade >= 4 ? 'black' : 'gray' }}
                  />
                  <FontAwesomeIcon
                    icon={solid('star')}
                    onClick={() => setGrade(5)}
                    style={{ color: grade >= 5 ? 'black' : 'gray' }}
                  />
                </div>
              </div>
              <div>
                <TextareaAutosize
                  value={text}
                  onChange={onChangeText}
                  minRows={5}
                  spellCheck="false"
                  placeholder="욕설이 섞이거나 부적절한 리뷰는 삭제될 수 있습니다."
                />
                {media.isPc && (
                  <ButtonForm media={media} colorTheme={colorTheme} onClick={onPostReview}>
                    등록
                  </ButtonForm>
                )}
              </div>
            </div>
          </InputForm>
          {!media.isPc && (
            <ButtonForm media={media} colorTheme={colorTheme} onClick={onPostReview}>
              등록
            </ButtonForm>
          )}
        </>
      )}
    </>
  );
};
export default ReviewInputForm;
