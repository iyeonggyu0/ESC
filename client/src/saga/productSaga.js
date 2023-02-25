// eslint-disable-next-line
import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
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
  productGetBestProductData,
  productGetBestProductDataSuccess,
  productInquiry,
  productInquirySuccess,
  productInquiryFailure,
  productInquiryGet,
  productInquiryGetSuccess,
  productInquiryGetFailure,
  productInquiryDelete,
  productInquiryDeleteSuccess,
  productInquiryPut,
  productInquiryPutSuccess,
  productAnswerPost,
  productAnswerPostSuccess,
  productAnswerPostFailure,
  productAnswerPut,
  productAnswerPutSuccess,
  productAnswerDelete,
  productAnswerDeleteSuccess,
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

function* productGetBestProductsDataSaga(action) {
  try {
    const productData = yield call(ProductService.prototype.getBestProducts, action.payload);
    yield action.payload.setProductData(productData.bestProduct);
    yield action.payload.setProductKeyData(productData.bestKeyboard);
    yield put(productGetBestProductDataSuccess());
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

// 상품문의
// - post
function* ProductInquiryPostSaga(action) {
  try {
    yield call(ProductService.prototype.inquiryPost, action.payload);
    yield put(productInquirySuccess());
  } catch (err) {
    yield put(productInquiryFailure(new Error('UNKNODW ERROR')));
  }
}

// - get
function* ProductInquiryGetSaga(action) {
  try {
    const data = yield call(ProductService.prototype.inquiryGet, action.payload);
    yield action.payload.setInquiryData(data);
    yield put(productInquiryGetSuccess());
  } catch (err) {
    yield put(productInquiryGetFailure(new Error('UNKNODW ERROR')));
  }
}

// - delete
function* ProductInquiryDeleteSaga(action) {
  try {
    yield call(ProductService.prototype.inquiryDelete, action.payload);
    yield put(productInquiryDeleteSuccess());
  } catch (err) {
    console.error(err);
  }
}

// - put
function* ProductInquiryPutSaga(action) {
  try {
    yield call(ProductService.prototype.inquiryPut, action.payload);
    yield put(productInquiryPutSuccess());
  } catch (err) {
    console.error(err);
  }
}

function* ProductAnswerPostSaga(action) {
  try {
    yield call(ProductService.prototype.answerPost, action.payload);
    yield put(productAnswerPostSuccess());
  } catch (err) {
    yield put(productAnswerPostFailure(new Error('UNKNODW ERROR')));
  }
}

// - delete
function* ProductAnswerDeleteSaga(action) {
  try {
    yield call(ProductService.prototype.answerDelete, action.payload);
    yield put(productAnswerDeleteSuccess());
  } catch (err) {
    console.error(err);
  }
}

// - put
function* ProductAnswerPutSaga(action) {
  try {
    yield call(ProductService.prototype.answerPut, action.payload);
    yield put(productAnswerPutSuccess());
  } catch (err) {
    console.error(err);
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

function* watchProductGetBestProductData() {
  yield takeLatest(productGetBestProductData.type, productGetBestProductsDataSaga);
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

function* watchProductInquiryPost() {
  yield takeLatest(productInquiry.type, ProductInquiryPostSaga);
}

function* watchProductInquiryGet() {
  yield takeLatest(productInquiryGet.type, ProductInquiryGetSaga);
}

function* watchProductInquiryDelete() {
  yield takeLatest(productInquiryDelete.type, ProductInquiryDeleteSaga);
}

function* watchProductInquiryPut() {
  yield takeLatest(productInquiryPut.type, ProductInquiryPutSaga);
}

function* watchProductAnswerPost() {
  yield takeLatest(productAnswerPost.type, ProductAnswerPostSaga);
}

function* watchProductAnswerDelete() {
  yield takeLatest(productAnswerPut.type, ProductAnswerPutSaga);
}

function* watchProductAnswerPut() {
  yield takeLatest(productAnswerDelete.type, ProductAnswerDeleteSaga);
}

export default function* productSaga() {
  yield all([
    fork(watchCreate),
    fork(watchProductGetData),
    fork(watchProductGetOneData),
    fork(watchProductGetBestProductData),
    fork(watchProductDelete),
    fork(watchProductModify),
    fork(watchProductReviewPost),
    fork(watchProductReviewDelete),
    fork(watchProductReviewPut),
    fork(watchProductInquiryPost),
    fork(watchProductInquiryGet),
    fork(watchProductInquiryDelete),
    fork(watchProductInquiryPut),
    fork(watchProductAnswerPost),
    fork(watchProductAnswerDelete),
    fork(watchProductAnswerPut),
  ]);
}
