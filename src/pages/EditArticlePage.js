import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import ArticleForm from '../components/article-form';
import { useGetArticleQuery, useUpdateArticleMutation } from '../redux/api/articleApi';
import Loader from '../components/loader';
import { selectToken } from '../redux/slices/AuthSlice';

function EditArticlePage() {
  const { slug } = useParams();
  const authToken = useSelector(selectToken);
  const { data, isLoading } = useGetArticleQuery(slug);
  const [updateArticle, fetchInfo] = useUpdateArticleMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/sign-in');
    }
  });

  if (isLoading) {
    return <Loader />;
  }

  const { article } = data;

  return (
    <ArticleForm
      article={article}
      process={updateArticle}
      fetchInfo={fetchInfo}
      type="editArticle"
      header="Edit article"
    />
  );
}

export default EditArticlePage;
