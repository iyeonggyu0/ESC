import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { GradeFormDiv } from './style';

const GradeForm = ({ productData, colorTheme }) => {
  // eslint-disable-next-line

  return (
    <>
      {productData.ProductReviews.length !== 0 && (
        <GradeFormDiv colorTheme={colorTheme}>
          <div>
            <p>{productData.grade}</p>
            <p>({productData.ProductReviews.length})</p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={solid('star')}
              style={{ color: productData.grade >= 1 ? 'black' : 'gray' }}
            />
            <FontAwesomeIcon
              icon={solid('star')}
              style={{ color: productData.grade >= 2 ? 'black' : 'gray' }}
            />
            <FontAwesomeIcon
              icon={solid('star')}
              style={{ color: productData.grade >= 3 ? 'black' : 'gray' }}
            />
            <FontAwesomeIcon
              icon={solid('star')}
              style={{ color: productData.grade >= 4 ? 'black' : 'gray' }}
            />
            <FontAwesomeIcon
              icon={solid('star')}
              style={{ color: productData.grade >= 5 ? 'black' : 'gray' }}
            />
          </div>
        </GradeFormDiv>
      )}
    </>
  );
};

export default GradeForm;
