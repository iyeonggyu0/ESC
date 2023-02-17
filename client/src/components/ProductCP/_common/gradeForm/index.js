import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { GradeFormDiv } from './style';
import { useState } from 'react';

const GradeForm = ({ productData }) => {
  // eslint-disable-next-line

  return (
    <>
      {productData.ProductReviews.length !== 0 && (
        <GradeFormDiv>
          <div>
            <p>{productData.grade}</p>
          </div>
          <div>
            {0 < productData.grade && <FontAwesomeIcon icon={solid('star')} />}
            {2 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
            {3 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
            {4 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
            {5 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
            <p>{productData.ProductReviews.length}</p>
          </div>
        </GradeFormDiv>
      )}
    </>
  );
};

export default GradeForm;
