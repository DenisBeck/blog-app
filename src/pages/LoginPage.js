import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProfileForm from '../components/profile-form';
import { useLoginUserMutation } from '../redux/api/userApi';
import { selectToken } from '../redux/slices/AuthSlice';

function LoginPage() {
  const authToken = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate('/', { replace: true });
    }
  });

  const [loginUser, fetchInfo] = useLoginUserMutation();

  return <ProfileForm type="login" process={loginUser} fetchInfo={fetchInfo} header="Sign In" />;
}

export default LoginPage;
