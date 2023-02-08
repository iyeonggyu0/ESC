import { useInput } from '@hooks/useInput';
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState } from 'react';

import { InputForm } from './style';

const ReviewInputForm = ({ productData, userData }) => {
  const [text, onChangeText] = useInput('');
  const [textBr, setTextBr] = useState('');

  useEffect(() => {
    setTextBr(text.replace(/(\n|\r\n)/g, '<br/>'));
    console.log(textBr);
    // eslint-disable-next-line
  }, [text]);

  return (
    <>
      {userData !== null && (
        <InputForm>
          <div>{productData.name} - 리뷰 작성</div>
          <div>
            <div>{userData.nickName}</div>
            <div>
              <TextareaAutosize
                value={text}
                onChange={onChangeText}
                minRows={6}
                placeholder="욕설이 섞이거나 부적절한 리뷰는 삭제될 수 있습니다."
              />
            </div>
          </div>
        </InputForm>
      )}
    </>
  );
};
export default ReviewInputForm;
