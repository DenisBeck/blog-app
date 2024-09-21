import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ArticlesList from '../components/articles-list';
import Loader from '../components/loader';
import { useGetArticlesQuery } from '../redux/api/articleApi';
import { selectToken } from '../redux/slices/AuthSlice';
import ErrorText from '../components/error-text';

const ARTICLES_COUNT_ON_PAGE = 10;

function ArticlesListPage() {
  const authToken = useSelector(selectToken);
  const { page } = useParams();

  const { data, isError, error, isLoading, isFetching } = useGetArticlesQuery({
    authKey: authToken,
    params: {
      countOnPage: ARTICLES_COUNT_ON_PAGE,
      pageNumber: page || 1,
    },
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorText text={error.data} />;
  }

  return <ArticlesList data={data} page={page} countOnPage={ARTICLES_COUNT_ON_PAGE} />;
}

export default ArticlesListPage;
