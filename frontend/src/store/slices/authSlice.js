/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: '',
  isAuthorized: false,
};

const getStorageData = () => {
  try {
    return JSON.parse(localStorage.getItem('authData'));
  } catch (error) {
    console.log('Ошибка авторизации. Не удалось получить данные из localStorage', error);
    return null;
  }
};

const getInialState = () => {
  const storageData = getStorageData();

  if (storageData) {
    return {
      ...storageData,
      isAuthorized: true,
    };
  }
  return initialState;
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: getInialState(),
  reducers: {
    logIn: (state, { payload }) => {
      localStorage.setItem('authData', JSON.stringify(payload));
      Object.assign(state, {
        ...payload,
        isAuthorized: true,
      });
    },
    logOut: (state) => {
      localStorage.removeItem('authData');
      Object.assign(state, initialState);
    },
  },
});

export const {
  logIn,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;
