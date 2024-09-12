import React from 'react';

import classes from './ErrorText.module.scss';

function ErrorText({ text }) {
  return <div className={classes.error}>{text}</div>;
}

export default ErrorText;
