/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authData = JSON.parse(localStorage.getItem('authData'));
let token; let username; let isAuthorized;

if (authData) {
  token = authData.token;
  username = authData.username;
  isAuthorized = true;
} else {
  token = null;
  username = '';
  isAuthorized = false;
}

const initialState = {
  token,
  username,
  isAuthorized,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      localStorage.setItem('authData', JSON.stringify(payload));
      state.isAuthorized = true;
      state.token = payload.token;
      state.username = payload.username;
    },
    logOut: (state) => {
      localStorage.removeItem('authData');
      state.isAuthorized = false;
      state.token = null;
      state.username = '';
    },
  },
});

export const {
  logIn,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;
