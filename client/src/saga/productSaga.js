// eslint-disable-next-line
import { all, delay, fork, takeLatest, put, call } from 'redux-saga/effects';
// eslint-disable-next-line
import { productCreate, productCreateSuccess, productCreateFailure } from '@reducer/productReducer';
import ProductService from '../services/productService';

function* createSaga(action) {
  try {
    yield call(ProductService.prototype.create, action.payload);
    yield put(productCreateSuccess());
  } catch (err) {
    yield put(productCreateFailure(new Error('UNKNODW ERROR')));
  }
}

// listner

function* watchCreate() {
  yield takeLatest(productCreate.type, createSaga);
}

export default function* productSaga() {
  yield all([
    fork(watchCreate),
    // fork(watchLogOut),
    // fork(watchUserSign),
    // fork(watchGetUserData),
    // fork(watchpQuitup),
    // fork(watchSendEmail),
    // fork(watchPasswordUpdate),
    // fork(watchputData),
  ]);
}
