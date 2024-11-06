import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes.js';
import getAuthHeader from './getAuthHeader.js';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ baseUrl: routes.messagesPath() }),
  endpoints: (build) => ({
    getMessages: build.query({
      query: () => ({
        method: 'GET',
        headers: getAuthHeader(),
      }),
    }),
    addMessage: build.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
        headers: getAuthHeader(),
      }),
    }),
  }),
});

const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;

export {
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
};
