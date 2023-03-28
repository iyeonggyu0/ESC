import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import axios from 'axios';
import { axiosInstance } from '../../../../util/axios';

const ProductImgForm = ({
  productImgs,
  setProductImgs,
  productMainImg,
  setProductMainImg,
  textFun,
}) => {
  const deleteFile = (route) => {
    console.log(route);
    console.log(productImgs);
    axios
      .post(`${axiosInstance}api/multer/delete/fill`, {
        route: route,
      })
      .then(() => {
        if (route === productMainImg) {
          textFun(null, setProductMainImg);
        }
        const regex = new RegExp(`,${route}`, 'g');
        const regex2 = new RegExp(`${route}`, 'g');
        if (regex.test(productImgs)) {
          textFun(productImgs.replace(regex, ''), setProductImgs);
        } else {
          textFun(productImgs.replace(regex2, ''), setProductImgs);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangeMainImg = (route) => {
    textFun(route, setProductMainImg);
  };

  return (
    <div className="flexHeightCenter">
      {productImgs?.length > 0 &&
        productImgs?.split(/,/g).map((state, key) => (
          <Div key={key}>
            <div className="flexCenter">
              <FontAwesomeIcon icon={solid('check')} onClick={() => onChangeMainImg(state)} />
              <FontAwesomeIcon icon={regular('square-minus')} onClick={() => deleteFile(state)} />
            </div>
            <div>{productMainImg === state && <FontAwesomeIcon icon={solid('bookmark')} />}</div>
            <img src={`${state}`} alt="img" />
          </Div>
        ))}
    </div>
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
