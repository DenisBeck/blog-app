import React, { useState } from 'react';

import Button from '../button/Button';

import classes from './Pagination.module.scss';

function Pagination({ pagesCount, activeNumber }) {
  let initialOffset = 0;
  if (activeNumber > 2) {
    initialOffset = activeNumber - 2;
  } else if (pagesCount - activeNumber < 2) {
    initialOffset = pagesCount - activeNumber - 2;
  }
  const [offset, setOffset] = useState(initialOffset);

  const pageNumbers = new Array(pagesCount < 5 ? pagesCount : 5).fill(0).map((_, i) => i + 1);

  const onNextHandler = () => {
    setOffset((o) => (o < pagesCount - 5 ? o + 1 : o));
  };

  const onPrevHandler = () => {
    setOffset((o) => (o >= 1 ? o - 1 : o));
  };

  return (
    <div className={classes.pagination}>
      <Button
        type="link"
        link={offset < 1 ? null : `/articles/page/${activeNumber - 1}`}
        className={[classes['pagination-prev'], offset < 1 ? classes.disabled : null].join(' ')}
        onClick={onPrevHandler}
        disabled={offset < 1}
      />
      <ul className={classes['pagination-list']}>
        {pageNumbers.map((item) => (
          <li className={classes['pagination-item']} key={item}>
            <Button
              className={[
                classes['pagination-button'],
                Number(activeNumber) === Number(item) ? classes.active : null,
              ].join(' ')}
              type="link"
              link={`/articles/page/${item}`}
              label={item}
            />
          </li>
        ))}
      </ul>
      <Button
        type="link"
        link={offset >= pagesCount - 5 ? null : `/articles/page/${+activeNumber + 1}`}
        className={[classes['pagination-next'], offset >= pagesCount - 5 ? classes.disabled : null].join(' ')}
        onClick={onNextHandler}
        disabled={offset >= pagesCount - 5}
      />
    </div>
  );
}

export default Pagination;
