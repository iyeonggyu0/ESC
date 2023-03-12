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
        inventoryQuantity: req.data.inventoryQuantity,
        tag: req.data.tag,
      })
      .then(() => {
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
    const promise = axios.get(`${axiosInstance}api/product/get/one/${req.productId}/${req.sort}`);
    const productData = promise
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return null;
      });
    return productData;
  }

  getBestProducts() {
    const promise = axios.get(`${axiosInstance}api/product/get/best`);
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
        newProductDiscount: req.newProductDiscount,
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

  reviewPost(req) {
    axios
      .post(`${axiosInstance}api/product/review/post`, {
        productId: req.data.productId,
        reviewerEmail: req.data.reviewerEmail,
        reviewerGrade: req.data.reviewerGrade,
        content: req.data.content,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 403) {
          if (!alert('로그인 세션이 만료되었습니다.')) {
            window.location.href = '/login';
          }
        }
      });
  }

  reviewDelete(req) {
    axios
      .delete(`${axiosInstance}api/product/review/delete/${req.data.reviewId}`)
      .then(() => {
        console.log('삭제완료');
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  reviewPut(req) {
    axios
      .put(`${axiosInstance}api/product/review/put`, {
        reviewId: req.data.reviewId,
        reviewerGrade: req.data.reviewerGrade,
        content: req.data.content,
      })
      .then(() => {
        console.log('수정완료');
        // location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  inquiryPost(req) {
    axios
      .post(`${axiosInstance}api/product/inquiry/post`, {
        productId: req.data.productId,
        email: req.data.email,
        inquiryType: req.data.inquiryType,
        secret: req.data.secret,
        title: req.data.title,
        content: req.data.content,
      })
      .then((res) => {
        console.log('수정완료');
        if (res.status === 200) {
          {
            if (!alert('작성되었습니다.')) return location.reload();
          }
        }
        if (res.status === 403) {
          if (!alert('로그인이 필요합니다')) return;
        }
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  inquiryGet(req) {
    const promise = axios.get(
      `${axiosInstance}api/product/inquiry/get/${req.productId}/${req.inquiryType}`,
    );

    const inquiryData = promise
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return null;
      });
    return inquiryData;
  }

  inquiryDelete(req) {
    axios
      .delete(`${axiosInstance}api/product/inquiry/delete/${req.id}`)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          if (!alert('삭제되었습니다.')) return location.reload();
        }
        if (res.status === 403) {
          if (!alert('로그인이 필요합니다.')) return;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  inquiryPut(req) {
    axios
      .put(`${axiosInstance}api/product/inquiry/put`, req.data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          if (!alert('수정되었습니다.')) return;
        }
        if (res.status === 403) {
          if (!alert('로그인이 필요합니다.')) return;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  answerPost(req) {
    axios
      .post(`${axiosInstance}api/product/answer/post`, req.data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          if (!alert('작성되었습니다.')) return;
        }
        if (res.status === 403) {
          if (!alert('로그인이 필요합니다.')) return;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  answerDelete(req) {
    axios
      .delete(`${axiosInstance}api/product/answer/delete/${req.id}`)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          if (!alert('삭제되었습니다.')) return location.reload();
        }
        if (res.status === 403) {
          if (!alert('로그인이 필요합니다.')) return;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  answerPut(req) {
    axios
      .put(`${axiosInstance}api/product/answer/put`, req.data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          if (!alert('수정되었습니다.')) return;
        }
        if (res.status === 403) {
          if (!alert('로그인이 필요합니다.')) return;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
