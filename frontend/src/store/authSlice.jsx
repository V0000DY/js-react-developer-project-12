/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const token = JSON.parse(localStorage.getItem('userId'));
const userName = token ? JSON.stringify(token.username).replace(/"/g, '') : '';

const initialState = {
  token,
  userName,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setUserName: (state, { payload }) => {
      state.userName = payload;
    },
  },
  selectors: {
    selectToken: (state) => state.token,
    selectUserName: (state) => state.userName,
  },
});

export const { setToken, setUserName } = authSlice.actions;
export const { selectToken, selectUserName } = authSlice.selectors;
export default authSlice.reducer;
