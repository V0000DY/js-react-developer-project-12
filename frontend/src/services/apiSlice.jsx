/* eslint-disable sonarjs/no-nested-functions */
/* eslint-disable no-param-reassign */
import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import getAuthHeader from './getAuthHeader.js';
// eslint-disable-next-line import/no-cycle
import { setDefaultChannelId } from './uiSlice.js';

const headerWithToken = getAuthHeader();

const socket = io('https://simple-chat-4k5t.onrender.com');

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
      invalidatesTags: ['Message'],
      async onCacheEntryAdded(arg, lifecycleApi) {
        try {
          await lifecycleApi.cacheDataLoaded;

          socket.on('newChannel', (newChannel) => {
            lifecycleApi.updateCachedData((draft) => {
              draft.push(newChannel);
            });
          });

          socket.on('removeChannel', ({ id }) => {
            const state = lifecycleApi.getState();
            const { currentChannelId } = state.ui;
            if (currentChannelId === id) {
              lifecycleApi.dispatch(setDefaultChannelId());
            }
            lifecycleApi.updateCachedData((draft) => draft.filter((channel) => channel.id !== id));
          });

          socket.on('renameChannel', (renamedChannel) => {
            const { id, name } = renamedChannel;
            lifecycleApi.updateCachedData((draft) => {
              const originalChannel = draft.find((channel) => channel.id === id);
              originalChannel.name = name;
            });
          });
        } catch (err) {
          console.error('Socket.io error from apiSlice', err);
        }
        await lifecycleApi.cacheEntryRemoved;
        socket.close();
      },
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
      invalidatesTags: (result, error, arg) => [{ type: 'Channel', id: arg }],
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
      providesTags: (result = []) => [
        'Message',
        ...result.map(({ id }) => ({ type: 'Message', id })),
      ],
      async onCacheEntryAdded(arg, lifecycleApi) {
        try {
          await lifecycleApi.cacheDataLoaded;
          socket.on('newMessage', (newMessage) => {
            lifecycleApi.updateCachedData((draft) => {
              draft.push(newMessage);
            });
          });

          socket.on('removeChannel', ({ id }) => {
            lifecycleApi.updateCachedData(
              (draft) => draft.filter((message) => message.channelId !== id),
            );
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
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `/messages/${messageId}`,
        method: 'DELETE',
        headers: headerWithToken,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Message', id: arg }],
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
  useDeleteMessageMutation,
} = apiSlice;

export {
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
  useEditChannelMutation as editChannel,
  useDeleteChannelMutation as deleteChannel,
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
  useDeleteMessageMutation as deleteMessage,
};
