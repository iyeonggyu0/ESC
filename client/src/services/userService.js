import { userUpdateInfo } from '@util/data';
import axios from 'axios';
import { axiosInstance } from '../util/axios';
import { decrypt } from '@util/crypto';
axios.defaults.withCredentials = true;

export default class UserService {
  login(req) {
    const userData = {
      email: req.data.email,
      password: req.data.password,
    };

    const promise = axios
      .post(`${axiosInstance}api/user/login`, userData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('로그인 성공');
        history.back();
        const decryptData = decrypt(res.data, process.env.REACT_APP_USER_KEY);
        return { userData: decryptData, login: true };
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          if (!alert('이미 로그인되어있습니다.')) {
            history.back();
            return { login: true };
          }
        } else if (err.response.status === 401) {
          alert('이메일 또는 비밀번호가 틀렸습니다.');
          req.setPassword('');
          return { userData: null, login: false };
        }
        err.response.status === 401 ? alert('잘못된 비밀번호') : '';
      });

    return promise;
  }

  putData(req) {
    axios
      .put(`${axiosInstance}api/user/put/profile`, {
        email: req.data.email,
        newEmail: req.data.newEmail,
        nickName: req.data.nickName,
        newNickname: req.data.newNickname,
        password: req.data.password,
        newPassword: req.data.newPassword,
        snsFlag: req.data.snsFlag,
        newSnsFlag: req.data.newSnsFlag,
        newAddress: req.data.newAddress,
        address: req.data.address,
        newDetailedAddress: req.data.newDetailedAddress,
        detailedAddress: req.data.detailedAddress,
      })
      .then((res) => {
        console.log(res);
        if (!alert('회원 정보가 수정 되었습니다')) {
          window.location.replace('/mypage/main');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    axios
      .post(`${axiosInstance}api/user/logout`)
      .then(() => {
        console.log('로그아웃');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
    window.location.reload();
  }

  getUser() {
    const promise = axios.get(`${axiosInstance}api/user/loginCheck`);
    const userData = promise
      .then((res) => {
        const decryptData = decrypt(res.data, process.env.REACT_APP_USER_KEY);
        return { userData: decryptData, login: true };
      })
      .catch((err) => {
        console.log(err);
        return { userData: null, login: false };
      });
    return userData;
  }

  sign(data) {
    axios
      .post(`${axiosInstance}api/user/`, {
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

  quitup(req) {
    axios
      .delete(`${axiosInstance}api/user/delete/${req.data.email}`)
      .then(() => {
        if (!alert('회원탈퇴 완료')) {
          window.location.replace('/');
        }
      })
      .catch(() => {
        if (!alert('회원탈퇴 완료')) {
          window.location.replace('/');
        }
      });
  }

  update(req) {
    console.log(req);
    const response = userUpdateInfo;
    return response;
  }

  pwUpdate(data) {
    axios
      .put(`${axiosInstance}api/user/put/pw`, {
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
      .post(`${axiosInstance}api/user/sendEmail`, {
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
