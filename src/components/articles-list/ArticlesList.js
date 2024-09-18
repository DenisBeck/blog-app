import React from 'react';

import Pagination from '../pagination/Pagination';
import Article from '../article/Article';

import classes from './ArticlesList.module.scss';

function ArticlesList({ data, page, countOnPage }) {
  const { articles, articlesCount } = data;

  return (
    <>
      <ul className={classes.articles}>
        {articles.map((article) => (
          <li key={article.slug}>
            <Article article={article} />
          </li>
        ))}
      </ul>
      <Pagination pagesCount={Math.ceil(articlesCount / countOnPage)} activeNumber={page || 1} />
    </>
  );
}

export default ArticlesList;
