import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      login: false,
      userData: null,
    },
    isLoading: false,
    isDone: false,
    error: null,
  },
  reducers: {
    // login
    loginUser: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.userInfo = action.payload;
    },
    loginUserFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = {
        login: false,
        userInfo: action.error,
      };
    },

    getUserData: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    getUserDataSuccess: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.userInfo = action.payload;
    },
    getUserDataFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = {
        login: false,
        userInfo: action.error,
      };
    },

    // logout
    logOutUser: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    logOutUserSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.userInfo = {
        login: false,
        userInfo: null,
      };
    },

    // sign
    signUser: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = {
        userInfo: null,
      };
    },
    signUserSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
    },
    signUserFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    // info Update
    infoUpdate: (state) => {
      state.isLoading = false;
      state.isDone = true;
    },
    infoUpdateSuccess: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.userInfo = action.payload;
    },
    infoUpdateFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    // PW Update
    passwordUpdate: (state) => {
      state.isLoading = false;
      state.isDone = true;
    },
    passwordUpdateSuccess: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.userInfo = action.payload;
    },
    passwordUpdateFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    //sendEmail
    sendEmail: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    sendEmailSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
    },
    sendEmailFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },

    //put Data
    putData: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    putDataSuccess: (state) => {
      state.isLoading = false;
      state.isDone = true;
      state.userInfo = action.payload;
    },
    putDataFailure: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.error = action.error;
    },
  },
});

export const {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  getUserData,
  getUserDataSuccess,
  getUserDataFailure,
  logOutUser,
  logOutUserSuccess,
  logOutUserFailure,
  signUser,
  signUserSuccess,
  signUserFailure,
  infoUpdate,
  infoUpdateSuccess,
  infoUpdateFailure,
  passwordUpdate,
  passwordUpdateSuccess,
  passwordUpdateFailure,
  sendEmail,
  sendEmailSuccess,
  sendEmailFailure,
  putData,
  putDataSuccess,
  putDataFailure,
} = userReducer.actions;
