import { createSlice } from '@reduxjs/toolkit';

export const productReducer = createSlice({
  name: 'product',
  initialState: {
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
  },
});

export const { productCreate, productCreateSuccess, productCreateFailure } = productReducer.actions;
