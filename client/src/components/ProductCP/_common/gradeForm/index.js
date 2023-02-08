import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { GradeFormDiv } from './style';

const GradeForm = (props) => {
  // eslint-disable-next-line
  const [productData, setProductData] = useState(props.productData);

  return (
    <GradeFormDiv>
      <div>
        {productData.grade === 0 && <p>리뷰 없음</p>}
        {0 < productData.grade && <FontAwesomeIcon icon={solid('star')} />}
        {2 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
        {3 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
        {4 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
        {5 <= productData.grade && <FontAwesomeIcon icon={solid('star')} />}
        {/* <span> 연결된 별점 리뷰의 수 </span> */}
      </div>
    </GradeFormDiv>
  );
};

export default GradeForm;
