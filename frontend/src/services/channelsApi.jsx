import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes.js';
import getAuthHeader from './getAuthHeader.js';

export const chatsApi = createApi({
  reducerPath: 'chats',
  baseQuery: fetchBaseQuery({ baseUrl: routes.channelsPath() }),
  endpoints: (build) => ({
    getChanels: build.query({
      query: () => ({
        method: 'GET',
        headers: getAuthHeader(),
      }),
    }),
    addChannels: build.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
        headers: getAuthHeader(),
      }),
    }),
  }),
});

const {
  useGetChanelsQuery,
  useAddChannelsMutation,
} = chatsApi;

export {
  useGetChanelsQuery as getChanels,
  useAddChannelsMutation as addChannel,
};
