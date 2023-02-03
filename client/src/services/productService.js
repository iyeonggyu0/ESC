import axios from 'axios';
import { axiosInstance } from '../util/axios';
// import { decrypt } from '@util/crypto';
axios.defaults.withCredentials = true;

export default class ProductService {
  create(req) {
    axios
      .post(`${axiosInstance}api/product/create`, {
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
          window.close();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get(req) {
    const promise = axios.get(`${axiosInstance}api/product/get/all/${req.type}`);
    const productData = promise
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return null;
      });
    return productData;
  }

  getOne(req) {
    const promise = axios.get(`${axiosInstance}api/product/get/one/${req.productId}`);
    const productData = promise
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return null;
      });
    return productData;
  }

  put(req) {
    axios
      .put(`${axiosInstance}api/product/put`, {
        productId: req.productId,
        productNewData: req.productNewData,
      })
      .then(() => {
        if (!alert('저장 완료')) {
          window.close();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  delete(req) {
    console.log(req.productId);
    axios
      .delete(`${axiosInstance}api/product/delete/${req.productId}`)
      .then(() => {
        if (!alert('상품 삭제 완료')) {
          window.close();
        }
      })
      .catch(() => {
        if (!alert('상품 삭제 완료')) {
          window.close();
        }
      });
  }
}
