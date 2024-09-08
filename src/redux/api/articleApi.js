import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//   async getArticles(countOnPage = 20, pageNumber = 0, tag = '', author = '', favorited = '') {
//     let queryString = `${this.baseUrl}/articles?limit=${countOnPage}`;
//     if (pageNumber > 0) {
//       queryString += `&offset=${countOnPage * pageNumber}`;
//     }
//     if (tag) {
//       queryString += `&tag=${tag}`;
//     }
//     if (author) {
//       queryString += `&author=${author}`;
//     }
//     if (favorited) {
//       queryString += `&favorited=${favorited}`;
//     }

//     const response = await fetch(queryString, {
//       method: 'GET',
//     });
//     if (!response.ok) {
//       throw new Error('Не удалось получить данные...');
//     }
//     const { articles } = await response.json();
//     return articles;
//   }

//   async createArticle(authKey, data) {
//     const response = await fetch(`${this.baseUrl}/articles`, {
//       method: 'POST',
//       headers: {
//         ContentType: 'application/json',
//         Authorization: authKey
//       },
//       body: JSON.stringify(data)
//     });
//     if (!response.ok) {
//       throw new Error('Не удалось создать статью...');
//     }
//     const { article } = await response.json();
//     return article;
//   }

//   async getArticle(slug) {
//     const response = await fetch(`${this.baseUrl}/articles/${slug}`, {
//       method: 'GET',
//     });
//     if (!response.ok) {
//       throw new Error('Не удалось получить статью...');
//     }
//     const { article } = await response.json();
//     return article;
//   }

//   async updateArticle(authKey, slug, data) {
//     const response = await fetch(`${this.baseUrl}/articles/${slug}`, {
//       method: 'PUT',
//       headers: {
//         ContentType: 'application/json',
//         Authorization: authKey
//       },
//       body: JSON.stringify(data)
//     });
//     if (!response.ok) {
//       throw new Error('Не удалось отредактировать статью...');
//     }
//     const { article } = await response.json();
//     return article;
//   }

//   async deleteArticle(authKey, slug) {
//     const response = await fetch(`${this.baseUrl}/articles/${slug}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: authKey
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Не удалось удалить статью...');
//     }
//   }

// }

// export default new ArticlesApi();

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
      providesTags: [{ type: 'Article', id: 'LIST' }],
    }),
    getArticle: builder.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleQuery } = articleApi;
