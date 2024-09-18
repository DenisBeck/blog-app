/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import useInput from '../../hooks/useInput';

import classes from './Input.module.scss';

function Input({ validateOptions, ariaInvalid, type = 'text', value, slug, label, className, onInput }) {
  const inputProps = useInput(value ?? '');

  return (
    <div className={[classes.input, className].join(' ')}>
      <label className={classes['input-label']} htmlFor={slug}>
        {label}

        <input
          className={[classes['input-field'], ariaInvalid ? classes.error : null].join(' ')}
          id={slug}
          autoComplete={slug}
          type={type}
          name={slug}
          placeholder={label}
          aria-invalid={ariaInvalid}
          onInput={onInput}
          {...validateOptions}
          {...inputProps}
        />
      </label>
    </div>
  );
}

export default Input;
