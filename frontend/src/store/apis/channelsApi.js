import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes';

const prepareHeaders = (headers, { getState }) => {
  const { authSlice } = getState();
  headers.set('Authorization', `Bearer ${authSlice?.token}`);

  return headers;
};

export const selectChannelById = createSelector(
  (res) => res.data,
  (res, channelId) => channelId,
  (data, channelId) => data?.find((channel) => channel.id === channelId),
);

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders,
  }),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: routes.getChannelsPath(),
        method: 'GET',
      }),
      providesTags: (result = []) => [
        'Channel',
        ...result.map(({ id }) => ({ type: 'Channel', id })),
      ],
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
  }),
});

const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useDeleteChannelMutation,
} = channelsApi;

export {
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
  useEditChannelMutation as editChannel,
  useDeleteChannelMutation as deleteChannel,
};
