import { all, delay, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  loginUserSuccess,
  loginUserFailure,
  loginUser,
  logOutUser,
  logOutUserSuccess,
  signUser,
  signUserFailure,
  signUserSuccess,
  getUserData,
  getUserDataSuccess,
  getUserDataFailure,
  quitup,
  quitupSuccess,
  passwordUpdate,
  passwordUpdateSuccess,
  passwordUpdateFailure,
  sendEmail,
  sendEmailSuccess,
  sendEmailFailure,
  putData,
  putDataSuccess,
  putDataFailure,
} from '@reducer/userReducer';
import UserService from '@services/userService';

// functtion

function* sendEmailSaga(action) {
  try {
    yield call(UserService.prototype.sendEmail, action.payload);
    yield put(sendEmailSuccess());
  } catch (err) {
    yield put(sendEmailFailure(new Error('UNKNODW ERROR')));
  }
}

function* putDataSaga(action) {
  try {
    yield call(UserService.prototype.putData, action.payload);
    yield put(putDataSuccess());
  } catch (err) {
    yield put(putDataFailure(new Error('UNKNODW ERROR')));
  }
}

function* login(action) {
  try {
    const userInfo = yield call(UserService.prototype.login, action.payload);
    yield put(loginUserSuccess(userInfo));
  } catch (err) {
    yield put(loginUserFailure(new Error('UNKNODW ERROR')));
  }
}

function* userSign(action) {
  try {
    yield call(UserService.prototype.sign, action.payload);
    yield put(signUserSuccess());
    yield action.payload.navigate('/login');
  } catch (err) {
    yield put(signUserFailure(new Error('UNKNODW ERROR')));
  }
}

function* logOut(action) {
  try {
    yield call(UserService.prototype.logout, action.payload);
    window.location.replace();
    yield put(logOutUserSuccess());
  } catch (err) {
    console.log(err);
  }
}

function* quitupSaga(action) {
  try {
    yield call(UserService.prototype.quitup, action.payload);
    delay(500);
    yield put(quitupSuccess());
  } catch (err) {
    console.log(err);
  }
}

function* getUser(action) {
  try {
    const userInfo = yield call(UserService.prototype.getUser, action.payload);
    yield put(getUserDataSuccess(userInfo));
  } catch (err) {
    yield put(getUserDataFailure(new Error('UNKNODW ERROR')));
  }
}

function* passwordUpdateSaga(action) {
  try {
    yield call(UserService.prototype.pwUpdate, action.payload);
    yield put(passwordUpdateSuccess());
    if (!alert('비밀번호 변경이 완료 되었습니다')) {
      yield;
    }
  } catch (err) {
    yield put(passwordUpdateFailure(new Error('UNKNODW ERROR')));
  }
}

// listner

function* watchLogIn() {
  yield takeLatest(loginUser.type, login);
}

function* watchGetUserData() {
  yield takeLatest(getUserData.type, getUser);
}

function* watchLogOut() {
  yield takeLatest(logOutUser.type, logOut);
}

function* watchUserSign() {
  yield takeLatest(signUser.type, userSign);
}

function* watchSendEmail() {
  yield takeLatest(sendEmail.type, sendEmailSaga);
}

function* watchPasswordUpdate() {
  yield takeLatest(passwordUpdate.type, passwordUpdateSaga);
}

function* watchputData() {
  yield takeLatest(putData.type, putDataSaga);
}

function* watchpQuitup() {
  yield takeLatest(quitup.type, quitupSaga);
}
// sendEmail

// root

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchUserSign),
    fork(watchGetUserData),
    fork(watchpQuitup),
    fork(watchSendEmail),
    fork(watchPasswordUpdate),
    fork(watchputData),
  ]);
}
