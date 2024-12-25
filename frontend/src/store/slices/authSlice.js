/* eslint-disable no-param-reassign */
import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from '../apis/authApi';

const initialState = {
  token: null,
  username: '',
  isError: false,
  error: '',
};

const getStorageData = () => {
  try {
    return JSON.parse(localStorage.getItem('authData'));
  } catch (error) {
    return null;
  }
};

const getInialState = () => {
  const storageData = getStorageData();

  return {
    ...initialState,
    ...storageData,
  };
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: getInialState(),
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('authData');
      Object.assign(state, initialState);
    },
    setAuthError: (state, payload) => {
      Object.assign(state, payload);
    },
    resetAuthError: (state) => {
      Object.assign(state, { isError: false, error: '' });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(authApi.endpoints.login.matchFulfilled, authApi.endpoints.signup.matchFulfilled),
      (state, { payload }) => {
        localStorage.setItem('authData', JSON.stringify(payload));
        Object.assign(state, {
          ...payload,
          isError: false,
          error: '',
        });
      },
    )
      .addMatcher(
        isAnyOf(authApi.endpoints.login.matchRejected, authApi.endpoints.signup.matchRejected),
        (state, { payload }) => {
          Object.assign(state, {
            isError: true,
            error: payload,
          });
        },
      );
  },
});

export const selectAuth = (state) => state.authSlice;

export const selectUser = createSelector(
  selectAuth,
  (authState) => authState.username,
);

export const selectToken = createSelector(
  selectAuth,
  (authState) => authState.token,
);

export const selectIsAuthError = createSelector(
  selectAuth,
  (authState) => authState.isError,
);

export const selectAuthError = createSelector(
  selectAuth,
  (authState) => authState.error,
);

export const selectIsAuth = createSelector(
  selectToken,
  selectIsAuthError,
  (token, isError) => Boolean(token) && !isError,
);

export const {
  logOut,
  setAuthError,
  resetAuthError,
} = authSlice.actions;

export default authSlice.reducer;
