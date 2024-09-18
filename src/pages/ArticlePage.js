import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Article from '../components/article';
import { useGetArticleQuery } from '../redux/api/articleApi';
import Loader from '../components/loader';
import ErrorText from '../components/error-text';

function ArticlePage() {
  const { state } = useLocation();

  const { slug } = useParams();

  const { data, isLoading, isError, error } = useGetArticleQuery(slug);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorText text={error.data} />;
  }

  const { article } = data;

  return <Article full article={state?.article ? state.article : article} />;
}

export default ArticlePage;
