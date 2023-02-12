import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMedia } from '../../../../hooks/useMedia.js';
import ReviewInputForm from '../reviewInputForm.js';
import { axiosInstance } from '@util/axios';
// import { useInput } from '@hooks/useInput';

import { ReviewFormWrapper } from './style';
import ReviewTextForm from './reviewTextForm/index.js';

const ReviewForm = ({ productData, userData, colorTheme }) => {
  const media = useMedia();
  const [sort, setSort] = useState('인기순');
  const [list, setList] = useState(null);

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/product/review/get/${productData.id}/${sort}`)
      .then((res) => {
        setList(res.data);
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
          <div>
            {list.length === 0 && (
              <div
                style={{
                  width: '100%',
                  height: '100px',
                  backgroundColor: '#f7f7f9',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                남겨진 리뷰가 없습니다.
              </div>
            )}
            {list.map((state, key) => (
              <ReviewTextForm
                key={state.id}
                reviewData={list[key]}
                userData={userData}
                colorTheme={colorTheme}
                media={media}
              />
            ))}
          </div>
        )}
      </ReviewFormWrapper>
    </div>
  );
};
export default ReviewForm;
