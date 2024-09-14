import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ArticleForm from '../components/article-form';
import { selectToken } from '../redux/slices/AuthSlice';
import { useCreateArticleMutation } from '../redux/api/articleApi';

function CreateArticlePage() {
  const authToken = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/sign-in', { replace: true });
    }
  });

  const [createArticle, fetchInfo] = useCreateArticleMutation();

  return <ArticleForm process={createArticle} fetchInfo={fetchInfo} type="create" header="Create new article" />;
}

export default CreateArticlePage;
