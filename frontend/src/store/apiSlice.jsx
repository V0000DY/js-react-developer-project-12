import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

// const prepareHeaders = (headers, { getState }) => {
//   const { auth } = getState();
//   console.log(`auth = ${JSON.stringify(auth)}`);
//   if (auth.token) {
//     headers.set('Authorization', `Bearer ${auth?.token}`);
//   }

//   return headers;
// };

export const selectMessagesByChannel = createSelector(
  (res) => res.data,
  (res, channelId) => channelId,
  (data, channelId) => data?.filter((message) => message.channelId === channelId),
);

export const selectChannelById = createSelector(
  (res) => res.data,
  (res, channelId) => channelId,
  (data, channelId) => data?.find((channel) => channel.id === channelId),
);

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (userId) {
        headers.set('Authorization', `Bearer ${userId.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Channel', 'Message'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: routes.getLoginPath(),
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: routes.getSignupPath(),
        method: 'POST',
        body: credentials,
      }),
    }),
    getChannels: builder.query({
      query: () => ({
        url: routes.getChannelsPath(),
        method: 'GET',
      }),
      providesTags: (result = []) => [
        'Channel',
        ...result.map(({ id }) => ({ type: 'Channel', id })),
      ],
      invalidatesTags: ['Message'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.getChannelsPath(),
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),
    editChannel: builder.mutation({
      query: (channel) => ({
        url: routes.getChannelPath(channel.id),
        method: 'PATCH',
        body: channel.editedChannel,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Channel', id: arg }],
    }),
    deleteChannel: builder.mutation({
      query: (channelId) => ({
        url: routes.getChannelPath(channelId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
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
  useLoginMutation,
  useSignupMutation,
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useDeleteChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMessageMutation,
} = apiSlice;

export {
  useLoginMutation as userLogin,
  useSignupMutation as userSignup,
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
  useEditChannelMutation as editChannel,
  useDeleteChannelMutation as deleteChannel,
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
  useDeleteMessageMutation as deleteMessage,
};
