import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProfileForm from '../components/profile-form';
import { useRegisterUserMutation } from '../redux/api/userApi';
import { selectToken } from '../redux/slices/AuthSlice';

function RegisterPage() {
  const authToken = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate('/', { replace: true });
    }
  });

  const [registerUser, fetchInfo] = useRegisterUserMutation();

  return <ProfileForm process={registerUser} fetchInfo={fetchInfo} header="Create new account" type="register" />;
}

export default RegisterPage;
