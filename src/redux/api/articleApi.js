import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  tagTypes: ['Article'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ countOnPage = 20, pageNumber = 1, tag = undefined, author = undefined, favorited = undefined }) => ({
        url: '/articles',
        params: {
          limit: countOnPage,
          offset: countOnPage * (pageNumber - 1),
          tag,
          author,
          favorited,
        },
      }),
      providesTags: ['Article'],
    }),
    getArticle: builder.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
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
    }),
    unfavoriteArticle: builder.mutation({
      query: ({ authKey, slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          authorization: `Token ${authKey}`,
        },
      }),
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
