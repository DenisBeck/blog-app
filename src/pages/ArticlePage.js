import React from 'react';
import { useParams } from 'react-router-dom';

import Article from '../components/article';
import { useGetArticleQuery } from '../redux/api/articleApi';
import Loader from '../components/loader';

function ArticlePage() {
  const { slug } = useParams();

  const { data, isLoading } = useGetArticleQuery(slug);

  if (isLoading) {
    return <Loader />;
  }

  const { article } = data;

  return <Article full article={article} />;
}

export default ArticlePage;
