import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removeToken, selectToken } from '../redux/slices/AuthSlice';

import ArticlesListPage from './ArticlesListPage';

function LogoutPage() {
  const authToken = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) {
      localStorage.removeItem('auth');
      dispatch(removeToken());
    }
    navigate('/sign-in');
  });

  return <ArticlesListPage />;
}

export default LogoutPage;
