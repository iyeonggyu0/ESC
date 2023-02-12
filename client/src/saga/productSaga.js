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
  productModify,
  productModifySuccess,
  productModifyFailure,
  productReviewPost,
  productReviewPostSuccess,
  productReviewPostFailure,
  productReviewDelete,
  productReviewDeleteSuccess,
  productReviewDeleteFailure,
  productReviewPut,
  productReviewPutSuccess,
  productReviewPutFailure,
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

function* productModifySaga(action) {
  try {
    yield call(ProductService.prototype.put, action.payload);
    yield put(productModifySuccess());
  } catch (err) {
    yield put(productModifyFailure(new Error('UNKNODW ERROR')));
  }
}

// 리뷰
// - post
function* productReviewPostSaga(action) {
  try {
    yield call(ProductService.prototype.reviewPost, action.payload);
    yield put(productReviewPostSuccess());
  } catch (err) {
    yield put(productReviewPostFailure(new Error('UNKNODW ERROR')));
  }
}

// - delete
function* productReviewDeleteSaga(action) {
  try {
    yield call(ProductService.prototype.reviewDelete, action.payload);
    yield put(productReviewDeleteSuccess());
  } catch (err) {
    yield put(productReviewDeleteFailure(new Error('UNKNODW ERROR')));
  }
}

// - put
function* productReviewPutSaga(action) {
  try {
    yield call(ProductService.prototype.reviewPut, action.payload);
    yield put(productReviewPutSuccess());
  } catch (err) {
    yield put(productReviewPutFailure(new Error('UNKNODW ERROR')));
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

function* watchProductModify() {
  yield takeLatest(productModify.type, productModifySaga);
}

function* watchProductReviewPost() {
  yield takeLatest(productReviewPost.type, productReviewPostSaga);
}

function* watchProductReviewDelete() {
  yield takeLatest(productReviewDelete.type, productReviewDeleteSaga);
}

function* watchProductReviewPut() {
  yield takeLatest(productReviewPut.type, productReviewPutSaga);
}

export default function* productSaga() {
  yield all([
    fork(watchCreate),
    fork(watchProductGetData),
    fork(watchProductGetOneData),
    fork(watchProductDelete),
    fork(watchProductModify),
    fork(watchProductReviewPost),
    fork(watchProductReviewDelete),
    fork(watchProductReviewPut),
  ]);
}
