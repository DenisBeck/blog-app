import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { useGetArticlesQuery } from '../../redux/api/articleApi';
import Loader from '../loader';
import Pagination from '../pagination/Pagination';
import Article from '../article/Article';

import classes from './ArticlesList.module.scss';

const ARTICLES_COUNT_ON_PAGE = 10;

function ArticlesList() {
  const { page } = useParams();

  const { data, isError, isLoading, isFetching } = useGetArticlesQuery({
    countOnPage: ARTICLES_COUNT_ON_PAGE,
    pageNumber: page,
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <h3>Не удалось загрузить статьи...</h3>;
  }

  const { articles, articlesCount } = data;

  return (
    <>
      <ul className={classes.articles}>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link to={`/articles/${article.slug}`}>
              <Article article={article} />
            </Link>
          </li>
        ))}
      </ul>
      <Pagination pagesCount={Math.ceil(articlesCount / ARTICLES_COUNT_ON_PAGE)} activeNumber={page || 1} />
    </>
  );
}

export default ArticlesList;
