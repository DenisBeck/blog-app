import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// class ProfileApi {
//   constructor() {
//     this.baseUrl = 'https://blog.kata.academy/api';
//   }

//   async registerUser(data) {
//     const response = await fetch(`${this.baseUrl}/users`, {
//       method: 'POST',
//       headers: {
//         ContentType: 'application/json'
//       },
//       body: JSON.stringify(data)
//     });
//     if (!response.ok) {
//       throw new Error('Не удалось зарегистрироваться...');
//     }
//     const { user } = await response.json();
//     return user;
//   }

//   async loginUser(data) {
//     const response = await fetch(`${this.baseUrl}/users/login`, {
//       method: 'POST',
//       headers: {
//         ContentType: 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       throw new Error('Не удалось залогиниться...');
//     }
//     const { user } = await response.json();
//     return user;
//   }

//   async updateUser(authKey, data) {
//     const response = await fetch(`${this.baseUrl}/user`, {
//       method: 'PUT',
//       headers: {
//         ContentType: 'application/json',
//         Authorization: authKey
//       },
//       body: JSON.stringify(data)
//     });
//     if (!response.ok) {
//       throw new Error('Не удалось изменить данные пользователя...');
//     }
//     const { user } = await response.json();
//     return user;
//   }

// }

// export default new ProfileApi();

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/user',
        headers: {
          authorization: `Token ${localStorage.getItem('auth')}`,
        },
      }),
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
        return {
          url: 'users/login',
          method: 'POST',
          body: data,
        };
      },
    }),
    updateUser: builder.mutation({
      query(data) {
        console.log('updateUser');
        return {
          url: 'user',
          method: 'PUT',
          body: data,
          headers: {
            authorization: `Token ${localStorage.getItem('auth')}`,
          },
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useUpdateUserMutation, useGetUserQuery } = userApi;
