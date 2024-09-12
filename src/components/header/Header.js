import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../button';
import { selectToken } from '../../redux/slices/AuthSlice';
import UserInfo from '../user-info';
import { useGetUserQuery } from '../../redux/api/userApi';

import classes from './Header.module.scss';

function Header({ className }) {
  const isAuth = useSelector(selectToken);
  console.log('render Header');
  const response = useGetUserQuery();
  const user = response?.data?.user;

  return (
    <header className={classes.header}>
      <div className={[className, classes.container].join(' ')}>
        <Link to="/" className={classes['header-logo']}>
          Realworld Blog
        </Link>
        {isAuth && (
          <Link to="/profile">
            <UserInfo author={user} />
          </Link>
        )}
        <div className={classes['header-sign']}>
          {isAuth ? (
            <Button className={classes['header-sign-out']} type="link" label="Log Out" link="/log-out" />
          ) : (
            <>
              <Button className={classes['header-sign-in']} type="link" label="Sign In" link="/sign-in" />
              <Button className={classes['header-sign-up']} type="link" label="Sign Up" link="/sign-up" />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
