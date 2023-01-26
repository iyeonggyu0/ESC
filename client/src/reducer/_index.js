import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer';

export const rootReducer = combineReducers({
  user: userReducer.reducer,
  product: productReducer.reducer,
});
