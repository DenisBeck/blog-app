import React from 'react';

import Button from '../button/Button';

import classes from './Popup.module.scss';

function Popup({ handleNoClick, handleYesClick, className, question }) {
  return (
    <div className={[classes.popup, className].join(' ')}>
      <div className={classes.decor} />
      <div className={classes['popup-question']}>{question}</div>
      <div className={classes['popup-answer']}>
        <Button onClick={handleNoClick} type="button" label="No" className={classes['popup-no']} />
        <Button onClick={handleYesClick} type="button" label="Yes" className={classes['popup-yes']} />
      </div>
    </div>
  );
}

export default Popup;
