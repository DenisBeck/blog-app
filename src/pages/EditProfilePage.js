import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProfileForm from '../components/profile-form';
import { selectToken } from '../redux/slices/AuthSlice';
import { useGetUserQuery, useUpdateUserMutation } from '../redux/api/userApi';
import Loader from '../components/loader';
import ErrorText from '../components/error-text';

function EditProfilePage() {
  const authToken = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/sign-in');
    }
  });

  const { data, isLoading, isError, error } = useGetUserQuery(authToken);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorText text={error.data} />;
  }

  const { user } = data;
  const [updateUser, fetchInfo] = useUpdateUserMutation(authToken);

  return (
    <ProfileForm
      type="editProfile"
      header="Edit Profile"
      fetchInfo={fetchInfo}
      process={updateUser}
      currentUser={user}
    />
  );
}

export default EditProfilePage;
