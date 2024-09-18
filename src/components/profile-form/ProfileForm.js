/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../input';
import Button from '../button/Button';
import ErrorText from '../error-text';
import { selectToken, setToken } from '../../redux/slices/AuthSlice';
import loading from '../../assets/img/loading.gif';
import useValidate from '../../hooks/useValidate';
import getValidateFields from '../../hooks/useValidate/getValidateFields';

import classes from './ProfileForm.module.scss';

function ProfileForm({ process, fetchInfo, header, type, currentUser }) {
  const { isLoading } = fetchInfo;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authToken = useSelector(selectToken);

  const [fetchErrors, setFetchErrors] = useState([]);
  const { handleSubmit, setValue, validateFields, clearErrors } = useValidate('profile', type, getValidateFields(type));

  useEffect(() => {
    setValue('username', currentUser ? currentUser.username : null);
    setValue('email', currentUser ? currentUser.email : null);
    setValue('image', currentUser ? currentUser.image : null);
  }, [currentUser]);

  const onSubmit = async (data) => {
    try {
      const { user } = await process({
        user: data,
        authKey: authToken || null,
      }).unwrap();

      dispatch(setToken(user.token));
      localStorage.setItem('auth', user.token);

      navigate('/');
    } catch (err) {
      setFetchErrors(Object.entries(err.data.errors).map((arr) => arr.join(' ')));
    }
  };

  const getErrorMessageForField = (field) => {
    if (!fetchErrors.length) {
      return null;
    }
    return fetchErrors.find((error) => error.includes(field));
  };

  let buttonLabel = 'Save';
  if (type === 'register') {
    buttonLabel = 'Create';
  } else if (type === 'login') {
    buttonLabel = 'Login';
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes['profile-form']}>
      <h3 className={classes['profile-form-title']}>{header}</h3>

      {validateFields.map(({ fieldInfo, validateOptions, errorMessage }) => {
        if (fieldInfo.value === 'agreement') {
          return (
            <Fragment key={fieldInfo.value}>
              <label htmlFor={fieldInfo.value} className={classes['profile-form-checkbox']}>
                <input
                  className={classes['profile-form-checkbox-input']}
                  type={fieldInfo.type}
                  name={fieldInfo.value}
                  id={fieldInfo.value}
                  aria-invalid={!!errorMessage}
                  {...validateOptions}
                />
                {fieldInfo.label}
              </label>
              {errorMessage && <ErrorText text={errorMessage} />}
              {getErrorMessageForField(fieldInfo.value) && (
                <ErrorText text={getErrorMessageForField(fieldInfo.value)} />
              )}
            </Fragment>
          );
        }
        return (
          <Fragment key={fieldInfo.value}>
            <Input
              type={fieldInfo.type}
              validateOptions={validateOptions}
              className={classes['profile-form-input']}
              slug={fieldInfo.value}
              label={fieldInfo.label}
              ariaInvalid={!!errorMessage}
              onInput={() => clearErrors(fieldInfo.value)}
              value={currentUser ? currentUser[fieldInfo.value] : null}
            />
            {errorMessage && <ErrorText text={errorMessage} />}
            {getErrorMessageForField(fieldInfo.value) && <ErrorText text={getErrorMessageForField(fieldInfo.value)} />}
          </Fragment>
        );
      })}

      <Button
        className={classes['profile-form-button']}
        type="Submit"
        label={!isLoading && buttonLabel}
        image={isLoading && loading}
      />

      {type === 'register' && (
        <p className={classes['profile-form-note']}>
          Already have an account?{' '}
          <Link className={classes['profile-form-link']} to="/sign-in">
            Sign In
          </Link>
          .
        </p>
      )}
      {type === 'login' && (
        <p className={classes['profile-form-note']}>
          Don’t have an account?{' '}
          <Link className={classes['profile-form-link']} to="/sign-up">
            Sign Up
          </Link>
          .
        </p>
      )}
    </form>
  );
}

export default ProfileForm;
