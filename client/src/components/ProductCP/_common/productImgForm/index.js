import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import axios from 'axios';
import { axiosInstance } from '../../../../util/axios';
import { useEffect, useState } from 'react';

const ProductImgForm = ({ img, setMainImg, name, productMainImg, removeImage }) => {
  const deleteFile = () => {
    axios
      .post(`${axiosInstance}api/multer/delete/fill`, {
        route: `/img/product/${name}/${img.replace(/ $/, '')}`,
      })
      .then(() => {
        removeImage(img);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangeMainImg = () => {
    setMainImg(img);
  };

  const [route, setRoute] = useState('/img/product/');
  useEffect(
    () => {
      if (!img.startsWith('/img')) {
        setRoute(`/img/product/${name}/${img}`);
      } else if (route === '/img/product/') {
        setRoute(`${img}`);
      }
    },
    // eslint-disable-next-line
    [img, name],
  );

  return (
    <Div img={img}>
      <div className="flexCenter">
        <FontAwesomeIcon icon={solid('check')} onClick={onChangeMainImg} />
        <FontAwesomeIcon icon={regular('square-minus')} onClick={deleteFile} />
      </div>
      <div>{productMainImg === img && <FontAwesomeIcon icon={solid('bookmark')} />}</div>
      <img src={`${route}`} alt="img" />
    </Div>
  );
};
export default ProductImgForm;

export const Div = styled.div`
  width: 130px;
  height: 130px;
  margin-right: 25px;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  position: relative;

  & > div:nth-child(1) {
    position: absolute;
    top: 50%;
    left: 50%;
    gap: 0 10px;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: 0.3s all;
  }

  &:hover > div:nth-child(1) {
    opacity: 1;
  }

  & > div:nth-child(1) * {
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
  }

  & > div:nth-child(2) {
    position: absolute;
    top: -4px;
    left: 10px;
    font-size: 26px;
  }

  & > img {
    width: 130px;
    height: 130px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
`;
