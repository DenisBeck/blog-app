import React from 'react';

import classes from './ErrorText.module.scss';

function ErrorText({ className, text }) {
  return <div className={[classes.error, className].join(' ')}>{text}</div>;
}

export default ErrorText;
