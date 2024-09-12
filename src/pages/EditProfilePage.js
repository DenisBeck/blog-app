import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProfileForm from '../components/profile-form';
import { selectToken } from '../redux/slices/AuthSlice';
import { useGetUserQuery, useUpdateUserMutation } from '../redux/api/userApi';

function EditProfilePage() {
  const isAuth = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/', { replace: true });
    }
  });

  const [updateUser, fetchInfo] = useUpdateUserMutation();
  const response = useGetUserQuery();
  const currentUser = response?.data?.user;

  return (
    <ProfileForm
      type="edit"
      header="Edit Profile"
      fetchInfo={fetchInfo}
      process={updateUser}
      currentUser={currentUser}
    />
  );
}

export default EditProfilePage;
