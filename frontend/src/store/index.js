import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice.js';
import authReducer from './slices/authSlice.js';
import { messagesApi } from './apis/messagesApi.js';
import { authApi } from './apis/authApi.js';
import { channelsApi } from './apis/channelsApi.js';

export default configureStore({
  reducer: {
    authSlice: authReducer,
    uiSlice: uiReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(messagesApi.middleware, authApi.middleware, channelsApi.middleware),
});
