import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMedia } from '../../../../hooks/useMedia.js';
import ReviewInputForm from '../reviewInputForm.js';
import { axiosInstance } from '@util/axios';
import { useInput } from '@hooks/useInput';

import { ReviewFormWrapper } from './style';
import ReviewTextForm from './reviewTextForm/index.js';

const ReviewForm = ({ productData, userData, colorTheme }) => {
  const media = useMedia();
  const [sort, setSort] = useState('인기순');
  const [list, setList] = useState(null);
  const [content, onChangeContent, setContent] = useInput(null);

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/product/review/get/${productData.id}/${sort}`)
      .then((res) => {
        setList(res.data);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, [sort, productData]);

  return (
    <div>
      <ReviewInputForm productData={productData} userData={userData} colorTheme={colorTheme} />
      <ReviewFormWrapper colorTheme={colorTheme}>
        {/* sort div */}
        <div>
          <div
            onClick={() => setSort('인기순')}
            style={{ fontWeight: sort === '인기순' ? '600' : '400' }}
          >
            인기순
          </div>
          <div
            onClick={() => setSort('최신순')}
            style={{ fontWeight: sort === '최신순' ? '600' : '400' }}
          >
            최신순
          </div>
        </div>

        {/* list div */}
        {list && (
          <>
            {list.map((state, key) => (
              <ReviewTextForm
                key={state.id}
                reviewData={list[key]}
                userData={userData}
                colorTheme={colorTheme}
                media={media}
              />
            ))}
          </>
        )}
      </ReviewFormWrapper>
    </div>
  );
};
export default ReviewForm;
