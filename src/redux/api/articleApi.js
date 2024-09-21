import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  tagTypes: ['Article'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ authKey, params }) => {
        const { countOnPage = 20, pageNumber = 1, tag = undefined, author = undefined, favorited = undefined } = params;
        return {
          url: '/articles',
          params: {
            limit: countOnPage,
            offset: countOnPage * (pageNumber - 1),
            tag,
            author,
            favorited,
          },
          headers: {
            authorization: `Token ${authKey}`,
          },
        };
      },
      providesTags: ['Article'],
    }),
    getArticle: builder.query({
      query: ({ authKey, slug }) => ({
        url: `/articles/${slug}`,
        headers: {
          authorization: `Token ${authKey}`,
        },
      }),
      providesTags: ['Article'],
    }),
    createArticle: builder.mutation({
      query: (data) => {
        const { authKey, article } = data;
        return {
          url: '/articles',
          method: 'POST',
          body: { article },
          headers: {
            authorization: `Token ${authKey}`,
          },
        };
      },
      invalidatesTags: ['Article'],
    }),
    updateArticle: builder.mutation({
      query: (data) => {
        const { authKey, slug, article } = data;
        return {
          url: `/articles/${slug}`,
          method: 'PUT',
          body: { article },
          headers: {
            authorization: `Token ${authKey}`,
          },
        };
      },
      invalidatesTags: ['Article'],
    }),
    deleteArticle: builder.mutation({
      query: ({ authKey, slug }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          authorization: `Token ${authKey}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),
    favoriteArticle: builder.mutation({
      query: ({ authKey, slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          authorization: `Token ${authKey}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),
    unfavoriteArticle: builder.mutation({
      query: ({ authKey, slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          authorization: `Token ${authKey}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = articleApi;
