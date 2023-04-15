import { useContext, useState } from 'react';
import { MainDiv } from './style';
import { useMedia } from '../../../../hooks/useMedia';
import { ThemeContext } from '../../../../App';

const ProductOptionView = ({ textFun, setProductOption, productOption }) => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  console.log(productOption);

  const option = [
    {
      id: 1,
      productId: 1,
      optionName: 'Color',
      ProductOptionProperty: [
        {
          id: 1,
          ProductOptionoId: 1,
          property: 'red',
        },
        {
          id: 2,
          ProductOptionoId: 1,
          property: 'orange',
        },
        {
          id: 3,
          ProductOptionoId: 1,
          property: 'blue',
        },
        {
          id: 4,
          ProductOptionoId: 1,
          property: 'green',
        },
      ],
    },
    {
      id: 2,
      productId: 1,
      optionName: 'Size',
      ProductOptionProperty: [
        {
          id: 5,
          ProductOptionoId: 2,
          property: '68key',
        },
        {
          id: 6,
          ProductOptionoId: 2,
          property: '108key',
        },
      ],
    },
  ];

  // li > div
  return (
    <MainDiv media={media} colorTheme={colorTheme}>
      {option.map((opt) => (
        <div key={opt.id}>
          <p>{opt.optionName}</p>
          <div>
            {opt.ProductOptionProperty.map((prop) => (
              <li key={prop.id}>{prop.property}</li>
            ))}
          </div>
        </div>
      ))}
    </MainDiv>
  );
};
export default ProductOptionView;
