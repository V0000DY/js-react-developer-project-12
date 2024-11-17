import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import getAuthHeader from './getAuthHeader.js';

const headerWithToken = getAuthHeader();

const socket = io('http://localhost:5002');

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Channel', 'Message'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: '/channels',
        method: 'GET',
        headers: headerWithToken,
      }),
      providesTags: (result = []) => [
        'Channel',
        ...result.map(({ id }) => ({ type: 'Channel', id })),
      ],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '/channels',
        method: 'POST',
        body: channel,
        headers: headerWithToken,
      }),
      invalidatesTags: ['Channel'],
    }),
    editChannel: builder.mutation({
      query: (channel) => ({
        url: `/channels/${channel.id}`,
        method: 'PATCH',
        body: channel.editedChannel,
        headers: headerWithToken,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Channel', id: arg.id }],
    }),
    deleteChannel: builder.mutation({
      query: (channelId) => ({
        url: `/channels/${channelId}`,
        method: 'DELETE',
        headers: headerWithToken,
      }),
      invalidatesTags: ['Channel'],
    }),
    getMessages: builder.query({
      query: () => ({
        url: '/messages',
        method: 'GET',
        headers: headerWithToken,
      }),
      providesTags: ['Message'],
      async onCacheEntryAdded(arg, lifecycleApi) {
        try {
          await lifecycleApi.cacheDataLoaded;
          socket.on('newMessage', (newMessage) => {
            lifecycleApi.updateCachedData((draft) => {
              draft.push(newMessage);
            });
          });
        } catch (err) {
          console.error('Socket.io error from apiSlice', err);
        }
        await lifecycleApi.cacheEntryRemoved;
        socket.close();
      },
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        headers: headerWithToken,
        body: message,
      }),
    }),
  }),
});

const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useDeleteChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
} = apiSlice;

export {
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
  useEditChannelMutation as editChannel,
  useDeleteChannelMutation as deleteChannel,
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
};
