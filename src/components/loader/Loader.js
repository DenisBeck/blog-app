import React from 'react';

import classes from './Loader.module.scss';

function Loader() {
  return (
    <div className={classes.loading}>
      <div className={classes['loading-inner']}>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
      </div>
    </div>
  );
}

export default Loader;
