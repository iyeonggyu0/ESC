import { createSlice } from '@reduxjs/toolkit';

export const productReducer = createSlice({
  name: 'product',
  initialState: {
    productData: null,
    isLoading: false,
    isDone: false,
    error: null,
  },
  reducers: {
    // create
    productCreate: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productCreateSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },
    productCreateFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    // getAll
    productGetData: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productGetDataSuccess: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.productData = action.payload;
    },
    productGetDataFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    // getOne
    productGetOneData: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productGetOneDataSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },

    // delete
    productDelete: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productDeleteSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },

    // getAll
    productModify: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productModifySuccess: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.productData = action.payload;
    },
    productModifyFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    // 리뷰
    // - post
    productReviewPost: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productReviewPostSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },
    productReviewPostFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    // - delete
    productReviewDelete: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productReviewDeleteSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },
    productReviewDeleteFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    // - put
    productReviewPut: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productReviewPutSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },
    productReviewPutFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },
  },
});

export const {
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
} = productReducer.actions;
