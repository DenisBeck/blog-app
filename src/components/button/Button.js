import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.scss';

function Button({ className, type, link, onClick, disabled, label = '', image = '' }) {
  if (type === 'link') {
    return (
      <Link onClick={onClick} to={link} className={[className, classes.link].join(' ')} href="tmp">
        {label}
        {image && <img src={image} alt={image} />}
      </Link>
    );
  }

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={[className, classes.button].join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {image && <img src={image} alt={image} />}
    </button>
  );
}

export default Button;
