import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import heartIcon from '../../assets/img/heart.png';
import heartFilledIcon from '../../assets/img/heart_filled.png';
import UserInfo from '../user-info';
import Button from '../button/Button';
import Popup from '../popup';
import ErrorText from '../error-text';
import { selectToken } from '../../redux/slices/AuthSlice';
import {
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from '../../redux/api/articleApi';
import loading from '../../assets/img/loading.gif';
import { useGetUserQuery } from '../../redux/api/userApi';

import classes from './Article.module.scss';

function Article({ full, article }) {
  const { title, slug, tagList, body, description, author, createdAt, updatedAt, favorited, favoritesCount } = article;

  const [likesCount, setLikesCount] = useState(favoritesCount);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const [fetchErrors, setFetchErrors] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  const authToken = useSelector(selectToken);
  const response = useGetUserQuery(authToken);
  const user = response?.data?.user;

  const [favoriteArticle, { isLoadingLike }] = useFavoriteArticleMutation();
  const [unfavoriteArticle, { isLoadingUnlike }] = useUnfavoriteArticleMutation();
  const [deleteArticle, { isLoading }] = useDeleteArticleMutation();

  const fetchArticleDelete = async () => {
    if (!authToken) {
      return;
    }
    setDeleting(false);
    try {
      await deleteArticle({
        authKey: authToken,
        slug,
      }).unwrap();

      navigate('/');
    } catch (err) {
      if (typeof err.data === 'string') {
        setFetchErrors(err.data);
      } else {
        setFetchErrors(Object.entries(err.data.errors).map((arr) => arr.join(' ')));
      }
    }
  };

  const toggleFavorite = async () => {
    if (!authToken) {
      return;
    }

    let responseData;
    if (isFavorite) {
      const { data } = await unfavoriteArticle({ authKey: authToken, slug });
      responseData = data;
    } else {
      const { data } = await favoriteArticle({ authKey: authToken, slug });
      responseData = data;
    }
    const { favorited: isLiked, favoritesCount: likes } = responseData.article;
    setIsFavorite(isLiked);
    setLikesCount(likes);
  };

  return (
    <div className={classes.article}>
      <div className={classes['article-content']}>
        <div className={classes['article-header']}>
          <h5 className={classes['article-title']}>
            {!full ? <Link to={`/articles/${article.slug}`}>{title}</Link> : title}
          </h5>
          <button
            type="button"
            className={classes['article-favorites']}
            onClick={toggleFavorite}
            disabled={isLoadingLike || isLoadingUnlike}
          >
            <img src={isFavorite ? heartFilledIcon : heartIcon} alt="likes" />
            <span className={classes['article-favorites-count']}>{likesCount}</span>
            {fetchErrors.length > 0 && <ErrorText className={classes['article-error']} text={fetchErrors} />}
          </button>
        </div>
        <ul className={classes['article-tags']}>
          {tagList?.map((tag, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className={classes['article-tag']}>
              {tag}
            </li>
          ))}
        </ul>
        <p className={classes['article-text']}>
          {!full ? <Link to={`/articles/${article.slug}`}>{description}</Link> : description}
        </p>
      </div>

      <div className={classes['article-sidebar']}>
        <UserInfo author={author} date={format(new Date(updatedAt || createdAt), 'MMMM d, yyyy')} />
        {full && user && user.username === author.username && (
          <div className={classes['article-actions']}>
            <Button
              type="button"
              label={!isLoading ? 'Delete' : null}
              className={classes['article-delete']}
              onClick={() => setDeleting(true)}
              image={isLoading && loading}
            />
            <Button type="link" link={`/articles/${slug}/edit`} label="edit" className={classes['article-edit']} />
            {deleting && (
              <Popup
                question="Are you sure to delete this article?"
                className={classes['article-popup']}
                handleNoClick={() => setDeleting(false)}
                handleYesClick={fetchArticleDelete}
                handleBlur={() => setDeleting(false)}
              />
            )}
            {fetchErrors.length > 0 && <ErrorText className={classes['article-error']} text={fetchErrors} />}
          </div>
        )}
      </div>

      {full && (
        <div className={classes['article-body']}>
          <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
        </div>
      )}
    </div>
  );
}

export default Article;
