import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../button';

import classes from './Header.module.scss';

function Header({ className }) {
  return (
    <header className={classes.header}>
      <div className={[className, classes.container].join(' ')}>
        <Link to="/" className={classes['header-logo']}>
          Realworld Blog
        </Link>
        <div className={classes['header-sign']}>
          <Button className={classes['header-sign-in']} type="link" label="Sign In" link="/login" />
          <Button className={classes['header-sign-up']} type="link" label="Sign Up" link="/register" />
        </div>
      </div>
    </header>
  );
}

export default Header;
