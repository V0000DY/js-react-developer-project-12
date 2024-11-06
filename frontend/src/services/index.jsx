import { configureStore } from '@reduxjs/toolkit';
import { chatsApi } from './channelsApi';
import { messagesApi } from './messagesApi';

export default configureStore({
  reducer: {
    [chatsApi.reducerPath]: chatsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(chatsApi.middleware, messagesApi.middleware),
});
