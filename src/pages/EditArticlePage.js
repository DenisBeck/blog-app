import React from 'react';
import { useParams } from 'react-router-dom';

import ArticleForm from '../components/article-form';
import { useGetArticleQuery, useUpdateArticleMutation } from '../redux/api/articleApi';
import Loader from '../components/loader';

function EditArticlePage() {
  const { slug } = useParams();

  const { data, isLoading } = useGetArticleQuery(slug);
  const [updateArticle, fetchInfo] = useUpdateArticleMutation();

  if (isLoading) {
    return <Loader />;
  }

  const { article } = data;

  return (
    <ArticleForm article={article} process={updateArticle} fetchInfo={fetchInfo} type="edit" header="Edit article" />
  );
}

export default EditArticlePage;
