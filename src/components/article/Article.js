import React from 'react';
import Markdown from 'react-markdown';
import { format } from 'date-fns';

import heartIcon from '../../assets/img/heart.png';
import UserInfo from '../user-info';

import classes from './Article.module.scss';

function Article({ full, article }) {
  const { title, tagList, body, description, author, createdAt, updatedAt, favoritesCount } = article;

  return (
    <div className={classes.article}>
      <div className={classes['article-content']}>
        <div className={classes['article-header']}>
          <h5 className={classes['article-title']}>{title}</h5>
          <span className={classes['article-favorites']}>
            <img src={heartIcon} alt="likes" />
            <span className={classes['article-favorites-count']}>{favoritesCount}</span>
          </span>
        </div>
        <ul className={classes['article-tags']}>
          {tagList?.map((tag, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className={classes['article-tag']}>
              {tag}
            </li>
          ))}
        </ul>
        <p className={classes['article-text']}>{description}</p>
      </div>
      <UserInfo author={author} date={format(new Date(updatedAt || createdAt), 'MMMM d, yyyy')} />
      {full && (
        <div className={classes['article-body']}>
          <Markdown>{body}</Markdown>
        </div>
      )}
    </div>
  );
}

export default Article;
