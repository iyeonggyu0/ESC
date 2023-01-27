import axios from 'axios';
import { axiosInstance } from '../util/axios';
// import { decrypt } from '@util/crypto';
axios.defaults.withCredentials = true;

export default class ProductService {
  create(req) {
    axios
      .post(`${axiosInstance}product/create`, {
        name: req.data.name,
        type: req.data.type,
        price: req.data.price,
        img: req.data.img,
        detailedImg: req.data.detailedImg,
      })
      .then((res) => {
        console.log(res);
        if (!alert('상품이 등록되었습니다.')) {
          localStorage.removeItem('img');
          req.fun.setName('');
          req.fun.setType('');
          req.fun.setPrice('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get(req) {
    const promise = axios.get(`${axiosInstance}product/get/${req.type}`);
    const productData = promise
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return null;
      });
    return productData;
  }
}
