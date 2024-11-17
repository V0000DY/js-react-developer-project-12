import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice.js';
import { apiSlice } from './apiSlice.jsx';

export default configureStore({
  reducer: {
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiSlice.middleware),
});
