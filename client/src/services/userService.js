import { userDATA, userUpdateInfo } from '@util/data';
import axios from 'axios';
import { axiosInstance } from '../util/axios';
import { useInput } from '@hooks/useInput';

export default class UserService {
  login(data) {
    console.log(data.password);
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
      .then((res) => {
        console.log('회원가입 성공');
        console.log(res.bo);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update(req) {
    console.log(req);
    const response = userUpdateInfo;
    return response;
  }
}
