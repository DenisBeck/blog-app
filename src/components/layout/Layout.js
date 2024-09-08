import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header';

import classes from './Layout.module.scss';

function Layout() {
  return (
    <>
      <Header className={classes.container} />
      <main className={classes.main}>
        <div className={classes.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
