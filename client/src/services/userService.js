import { userDATA, userUpdateInfo } from '@util/data';
import axios from 'axios';
import { axiosInstance } from '../util/axios';

export default class UserService {
  login(req) {
    console.log(req);
    const response = userDATA();
    return response;
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
      });
  }

  update(req) {
    console.log(req);
    const response = userUpdateInfo;
    return response;
  }
}
