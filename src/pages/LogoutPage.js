import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ArticlesList from '../components/articles-list';
import { removeToken, selectToken } from '../redux/slices/AuthSlice';

function LogoutPage() {
  const authToken = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authToken) {
      navigate('/sign-in', { replace: true });
    } else {
      localStorage.removeItem('auth');
      dispatch(removeToken());
    }
  });

  return <ArticlesList />;
}

export default LogoutPage;
