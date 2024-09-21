import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (authKey) => {
        if (authKey) {
          return {
            url: '/user',
            headers: {
              authorization: `Token ${authKey}`,
            },
          };
        }
        return null;
      },
      providesTags: ['User'],
    }),
    registerUser: builder.mutation({
      query(data) {
        return {
          url: 'users',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query(data) {
        const { user } = data;
        return {
          url: 'users/login',
          method: 'POST',
          body: {
            user,
          },
        };
      },
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query(data) {
        const { authKey, user } = data;
        return {
          url: 'user',
          method: 'PUT',
          body: { user },
          headers: {
            authorization: `Token ${authKey}`,
          },
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useUpdateUserMutation, useGetUserQuery } = userApi;
