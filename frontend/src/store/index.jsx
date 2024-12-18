import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice.js';
// import authReducer from './authSlice.jsx';
import { apiSlice } from './apiSlice.jsx';

export default configureStore({
  reducer: {
    // auth: authReducer,
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiSlice.middleware),
});
