import React from 'react';

import classes from './ProfileForm.module.scss';

function ProfileForm({ type }) {
  return <form className={classes['profile-form']}>PROFILE FORM - !!! {type} !!!</form>;
}

export default ProfileForm;
