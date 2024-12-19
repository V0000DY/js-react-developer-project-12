import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes';

const prepareHeaders = (headers, { getState }) => {
  const { authSlice } = getState();
  headers.set('Authorization', `Bearer ${authSlice?.token}`);

  return headers;
};

export const selectMessagesByChannel = createSelector(
  (res) => res.data,
  (res, channelId) => channelId,
  (data, channelId) => data?.filter((message) => message.channelId === channelId),
);

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders,
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: routes.getMessagesPath(),
        method: 'GET',
      }),
      providesTags: (result = []) => [
        'Message',
        ...result.map(({ id }) => ({ type: 'Message', id })),
      ],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.getMessagesPath(),
        method: 'POST',
        body: message,
      }),
    }),
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: routes.getMessagePath(messageId),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Message', id: arg }],
    }),
  }),
});

const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;

export {
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
  useDeleteMessageMutation as deleteMessage,
};
