/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import useInput from '../../hooks/useInput';

import classes from './Input.module.scss';

function Input({ validateOptions, ariaInvalid, type = 'text', value, slug, label, className }) {
  const inputProps = useInput(value ?? '');

  const { register, rules } = validateOptions;

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
          {...register(slug, rules)}
          {...inputProps}
        />
      </label>
    </div>
  );
}

export default Input;
