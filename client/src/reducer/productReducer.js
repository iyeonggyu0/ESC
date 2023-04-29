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

    // getBestProduct
    productGetBestProductData: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productGetBestProductDataSuccess: (state) => {
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

    // 상품문의
    // - post
    productInquiry: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productInquirySuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },
    productInquiryFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    // - get
    productInquiryGet: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productInquiryGetSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },
    productInquiryGetFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    // - delete
    productInquiryDelete: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productInquiryDeleteSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },

    // - put
    productInquiryPut: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productInquiryPutSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },

    // 상품문의 - 답변
    // - post
    productAnswerPost: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productAnswerPostSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },
    productAnswerPostFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    // - put
    productAnswerPut: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productAnswerPutSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },

    // - delete
    productAnswerDelete: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    productAnswerDeleteSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },

    // 장바구니
    // - post
    shoppingBagPost: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    shoppingBagPostSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },

    // - put
    shoppingBagPut: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    shoppingBagPutSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
    },

    // multer - put
    multerPut: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    multerPutSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
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
  shoppingBagPost,
  shoppingBagPostSuccess,
  shoppingBagPut,
  shoppingBagPutSuccess,
  multerPut,
  multerPutSuccess,
} = productReducer.actions;
