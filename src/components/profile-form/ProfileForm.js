/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../input';
import Button from '../button/Button';
import ErrorText from '../error-text';
import { selectToken, setToken } from '../../redux/slices/AuthSlice';
import loading from '../../assets/img/loading.gif';

import classes from './ProfileForm.module.scss';

function ProfileForm({ process, fetchInfo, header, type, currentUser }) {
  const { isLoading } = fetchInfo;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authToken = useSelector(selectToken);

  const [fetchErrors, setFetchErrors] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      email: currentUser ? currentUser.email : null,
      image: currentUser ? (currentUser.image ?? '') : null,
      username: currentUser ? currentUser.username : null,
    },
  });

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

  const rules = {
    username: {
      register: {
        required: {
          value: true,
          message: 'Username is required',
        },
        minLength: {
          value: 3,
          message: 'Your name needs to be at least 3 characters',
        },
        maxLength: {
          value: 20,
          message: 'Your name needs to be less than 20 characters',
        },
      },
      edit: {
        required: {
          value: true,
          message: 'Username is required',
        },
      },
    },
    email: {
      register: {
        required: {
          value: true,
          message: 'Email is required',
        },
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'Email must match a pattern',
        },
      },
      login: {
        required: {
          value: true,
          message: 'Email is required',
        },
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'Email must match a pattern',
        },
      },
      edit: {
        required: {
          value: true,
          message: 'Email is required',
        },
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'Email must match a pattern',
        },
      },
    },
    password: {
      register: {
        required: {
          value: true,
          message: 'Password is required',
        },
        minLength: {
          value: 6,
          message: 'Your password needs to be at lease 6 characters',
        },
        maxLength: {
          value: 40,
          message: 'Your password needs to be less than 40 characters',
        },
      },
      login: {
        required: {
          value: true,
          message: 'Password is required',
        },
      },
      edit: {
        required: {
          value: true,
          message: 'Password is required',
        },
        minLength: {
          value: 6,
          message: 'Your password needs to be at lease 6 characters',
        },
        maxLength: {
          value: 40,
          message: 'Your password needs to be less than 40 characters',
        },
      },
    },
    repeatPassword: {
      register: {
        required: {
          value: true,
          message: 'Password to confirm is required',
        },
        validate: (value) => {
          if (watch('password') !== value) {
            return 'Passwords must match';
          }
          return true;
        },
      },
    },
    image: {
      edit: {
        pattern: {
          value: /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
          message: 'URL must match a pattern',
        },
      },
    },
    agreement: {
      register: {
        required: 'Agreement is required',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes['profile-form']}>
      <h3 className={classes['profile-form-title']}>{header}</h3>
      {type !== 'login' && (
        <Input
          key="username"
          validateOptions={{ register, rules: rules.username[type] }}
          className={classes['profile-form-input']}
          slug="username"
          label="Username"
          ariaInvalid={!!errors.username}
          value={currentUser ? currentUser.username : null}
        />
      )}
      {errors.username && <ErrorText text={errors.username.message} />}
      {getErrorMessageForField('username') && <ErrorText text={getErrorMessageForField('username')} />}

      <Input
        key="email"
        validateOptions={{ register, rules: rules.email[type] }}
        className={classes['profile-form-input']}
        slug="email"
        label="Email address"
        ariaInvalid={!!errors.email}
        value={currentUser ? currentUser.email : null}
      />
      {errors.email && <ErrorText text={errors.email.message} />}
      {getErrorMessageForField('email') && <ErrorText text={getErrorMessageForField('email')} />}

      <Input
        key="password"
        validateOptions={{ register, rules: rules.password[type] }}
        type="password"
        className={classes['profile-form-input']}
        slug="password"
        label="Password"
        ariaInvalid={!!errors.password}
      />
      {errors.password && <ErrorText text={errors.password.message} />}
      {getErrorMessageForField('password') && <ErrorText text={getErrorMessageForField('password')} />}

      {type === 'register' && (
        <Input
          key="repeatPassword"
          validateOptions={{ register, rules: rules.repeatPassword[type] }}
          type="password"
          className={classes['profile-form-input']}
          slug="repeatPassword"
          label="Repeat Password"
          ariaInvalid={!!errors.repeatPassword}
        />
      )}
      {errors.repeatPassword && <ErrorText text={errors.repeatPassword.message} />}
      {getErrorMessageForField('repeatPassword') && <ErrorText text={getErrorMessageForField('repeatPassword')} />}

      {type === 'edit' && (
        <Input
          key="image"
          validateOptions={{ register, rules: rules.image[type] }}
          className={classes['profile-form-input']}
          slug="image"
          label="Avatar image (url)"
          ariaInvalid={!!errors.avatar}
          value={currentUser ? currentUser.image : null}
        />
      )}
      {errors.image && <ErrorText text={errors.image.message} />}
      {getErrorMessageForField('avatar') && <ErrorText text={getErrorMessageForField('avatar')} />}

      {type === 'register' && (
        <label htmlFor="agreement" className={classes['profile-form-checkbox']}>
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            aria-invalid={!!errors.agreement}
            {...register('agreement', rules.agreement.register)}
          />
          I agree to the processing of my personal information
        </label>
      )}
      {errors.agreement && <ErrorText text={errors.agreement.message} />}
      {getErrorMessageForField('agreement') && <ErrorText text={getErrorMessageForField('agreement')} />}

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
