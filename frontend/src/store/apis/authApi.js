import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes';

const prepareHeaders = (headers, { getState }) => {
  const { auth } = getState();
  headers.set('Authorization', `Bearer ${auth?.token}`);

  return headers;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders,
  }),
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
  }),
});

const {
  useLoginMutation,
  useSignupMutation,
} = authApi;

export {
  useLoginMutation as userLogin,
  useSignupMutation as userSignup,
};
