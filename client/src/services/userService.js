import { userDATA, userUpdateInfo } from '@util/data';
import axios from 'axios';
import { axiosInstance } from '../util/axios';
import { useInput } from '@hooks/useInput';

export default class UserService {
  login(data) {
    const userData = {
      email: data.email,
      password: data.password,
    };
    axios
      .post(`${axiosInstance}user/login`, userData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('로그인 성공');
        return res.response;
      })
      .catch((err) => {
        console.log(err);
        err.response.status === 403 ? alert('이미 로그인되어있습니다.') : '';
        err.response.status === 402 ? alert('이미 사용 중인 이메일 입니다.') : '';
      });
  }

  relogin(req) {
    const response = req;
    return response;
  }

  logout(token) {
    console.log(token);
    console.log('로그아웃 성공');
  }

  sign(data) {
    axios
      .post(`${axiosInstance}user/`, {
        email: data.email,
        name: data.name,
        password: data.password,
        nickName: data.nickname,
        hpNumber: data.hpNumber,
        snsFlag: data.snsFlag,
      })
      .then(() => {
        console.log('회원가입 성공');
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
      .put(`${axiosInstance}user/put`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendEmail(data) {
    axios
      .post(`${axiosInstance}user/sendEmail`, {
        email: data.email,
        auth: data.auth,
      })
      .then(() => {
        console.log('인증코드 발송');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
