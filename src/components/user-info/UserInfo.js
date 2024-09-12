import React from 'react';

import classes from './UserInfo.module.scss';

function UserInfo({ author, date = null }) {
  return (
    <div className={classes['user-info']}>
      <div className={classes['user-info-name']}>{author?.username}</div>
      {date && <div className={classes.date}>{date}</div>}
      <div className={classes['user-info-avatar']}>
        <img src={author?.image} alt="John Doe" />
      </div>
    </div>
  );
}

export default UserInfo;
