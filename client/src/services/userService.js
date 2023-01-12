import { userUpdateInfo } from '@util/data';
import axios from 'axios';
import { axiosInstance } from '../util/axios';
axios.defaults.withCredentials = true;

export default class UserService {
  login(req) {
    const userData = {
      email: req.data.email,
      password: req.data.password,
    };

    const promise = axios
      .post(`${axiosInstance}user/login`, userData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('로그인 성공');
        req.navigate('/');
        return { userInfo: res.data, login: true };
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          if (!alert('이미 로그인되어있습니다.')) {
            req.navigate('/');
            return { login: true };
          }
        } else if (err.response.status === 401) {
          alert('잘못된 비밀번호');
          return { userInfo: null, login: false };
        }
        err.response.status === 401 ? alert('잘못된 비밀번호') : '';
      });

    return promise;
  }

  logout() {
    axios
      .post(`${axiosInstance}user/logout`)
      .then(() => {
        console.log('로그아웃');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUser() {
    const promise = axios.get(`${axiosInstance}user/loginCheck`);
    const userData = promise
      .then((res) => {
        return { userInfo: res.data, login: true };
      })
      .catch((err) => {
        console.log(err);
        return { userInfo: null, login: false };
      });
    return userData;
  }

  sign(data) {
    axios
      .post(`${axiosInstance}user/`, {
        email: data.data.email,
        name: data.data.name,
        password: data.data.password,
        nickName: data.data.nickname,
        hpNumber: data.data.hpNumber,
        snsFlag: data.data.snsFlag,
      })
      .then(() => {
        if (!alert('회원가입이 완료 되었습니다')) {
          data.navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  }

  update(req) {
    console.log(req);
    const response = userUpdateInfo;
    return response;
  }

  pwUpdate(data) {
    axios
      .put(`${axiosInstance}user/put/pw`, {
        email: data.data.email,
        password: data.data.password,
      })
      .then((res) => {
        if (res.status === 201) {
          if (!alert('비밀번호가 변경되었습니다.')) {
            data.navigate('/login');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendEmail(data) {
    console.log(data);
    axios
      .post(`${axiosInstance}user/sendEmail`, {
        email: data.data.email,
        auth: data.data.auth,
        check: data.data.check,
      })
      .then((res) => {
        if (res.status === 200) {
          alert('인증코드가 발송되었습니다.');
          data.setMailSend(1);
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }
}
