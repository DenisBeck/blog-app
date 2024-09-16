import React, { useState } from 'react';

import Button from '../button/Button';

import classes from './Pagination.module.scss';

function Pagination({ pagesCount, activeNumber }) {
  let initialOffset;
  if (activeNumber <= 3) {
    initialOffset = 0;
  } else if (activeNumber > 3 && activeNumber < pagesCount - 1) {
    initialOffset = activeNumber - 3;
  } else {
    initialOffset = pagesCount - 5;
  }
  const [offset, setOffset] = useState(initialOffset);

  const pageNumbers = new Array(pagesCount < 5 ? pagesCount : 5).fill(0).map((_, i) => i + 1 + offset);

  const onNextHandler = () => {
    console.log('offset', offset, '...pagescount', pagesCount);
    setOffset((o) => (o < pagesCount - 5 ? o + 1 : o));
  };

  const onPrevHandler = () => {
    setOffset((o) => (o >= 1 ? o - 1 : o));
  };

  return (
    <div className={classes.pagination}>
      {Number(activeNumber) !== 1 ? (
        <Button
          type="link"
          link={`/articles/page/${activeNumber - 1}`}
          className={classes['pagination-prev']}
          onClick={onPrevHandler}
        />
      ) : (
        <span className={[classes['pagination-prev'], classes.disabled].join(' ')} />
      )}

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
              onClick={() => (item > activeNumber ? onNextHandler() : onPrevHandler())}
            />
          </li>
        ))}
      </ul>

      {Number(activeNumber) !== Number(pagesCount) ? (
        <Button
          type="link"
          link={`/articles/page/${Number(activeNumber) + 1}`}
          className={classes['pagination-next']}
          onClick={onNextHandler}
        />
      ) : (
        <span className={[classes['pagination-next'], classes.disabled].join(' ')} />
      )}
    </div>
  );
}

export default Pagination;
