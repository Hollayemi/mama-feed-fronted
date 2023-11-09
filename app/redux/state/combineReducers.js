import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/auth/Login';

export const myReducers = combineReducers({
    loginReducer,
});
