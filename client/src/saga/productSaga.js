// eslint-disable-next-line
import { all, delay, fork, takeLatest, put, call } from 'redux-saga/effects';
// eslint-disable-next-line
import {
  productCreate,
  productCreateSuccess,
  productCreateFailure,
  productGetData,
  productGetDataSuccess,
  productGetDataFailure,
  productGetOneData,
  productGetOneDataSuccess,
  productDelete,
  productDeleteSuccess,
} from '@reducer/productReducer';
import ProductService from '../services/productService';

function* createSaga(action) {
  try {
    yield call(ProductService.prototype.create, action.payload);
    yield put(productCreateSuccess());
  } catch (err) {
    yield put(productCreateFailure(new Error('UNKNODW ERROR')));
  }
}

function* productGetDataSaga(action) {
  try {
    const productData = yield call(ProductService.prototype.get, action.payload);
    yield put(productGetDataSuccess(productData));
  } catch (err) {
    yield put(productGetDataFailure(new Error('UNKNODW ERROR')));
  }
}

function* productGetOneDataSaga(action) {
  try {
    const productData = yield call(ProductService.prototype.getOne, action.payload);
    yield action.payload.setProductData(productData);
    yield put(productGetOneDataSuccess());
  } catch (err) {
    yield console.error(err);
  }
}

function* productDeleteSaga(action) {
  try {
    yield call(ProductService.prototype.delete, action.payload);
    yield put(productDeleteSuccess());
  } catch (err) {
    yield console.error(err);
  }
}

// listner
function* watchCreate() {
  yield takeLatest(productCreate.type, createSaga);
}

function* watchProductGetData() {
  yield takeLatest(productGetData.type, productGetDataSaga);
}

function* watchProductGetOneData() {
  yield takeLatest(productGetOneData.type, productGetOneDataSaga);
}

function* watchProductDelete() {
  yield takeLatest(productDelete.type, productDeleteSaga);
}

export default function* productSaga() {
  yield all([
    fork(watchCreate),
    fork(watchProductGetData),
    fork(watchProductGetOneData),
    fork(watchProductDelete),
    // fork(watchpQuitup),
    // fork(watchSendEmail),
    // fork(watchPasswordUpdate),
    // fork(watchputData),
  ]);
}
