/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import Button from '../button';

import classes from './Tags.module.scss';

function Tags({ tags, onAddTag, onRemoveTag }) {
  const [value, setValue] = useState('');

  const addTag = (val) => {
    if (val.trim()) {
      onAddTag(val);
      setValue('');
    }
  };

  return (
    <ul className={classes.tags}>
      {tags.length > 0 &&
        tags.map((tag) => (
          <li key={tag} className={classes['tags-item']}>
            <input className={classes['tags-input']} value={tag} onChange={() => {}} />
            <Button className={classes['tags-delete']} type="button" label="Delete" onClick={() => onRemoveTag(tag)} />
          </li>
        ))}
      <li className={classes['tags-item']}>
        <input
          className={classes['tags-input']}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tag"
        />
        <Button className={classes['tags-delete']} type="button" label="Delete" onClick={() => setValue('')} />
        <Button className={classes['tags-add']} type="button" label="Add Tag" onClick={() => addTag(value)} />
      </li>
    </ul>
  );
}

export default Tags;
