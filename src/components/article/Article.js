import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import heartIcon from '../../assets/img/heart.png';
import UserInfo from '../user-info';
import Button from '../button/Button';
import Popup from '../popup';
import ErrorText from '../error-text';
import { selectToken } from '../../redux/slices/AuthSlice';
import { useDeleteArticleMutation } from '../../redux/api/articleApi';
import loading from '../../assets/img/loading.gif';

import classes from './Article.module.scss';

function Article({ full, article }) {
  const [fetchErrors, setFetchErrors] = useState([]);
  const navigate = useNavigate();
  const authToken = useSelector(selectToken);
  const [deleting, setDeleting] = useState(false);
  const { title, slug, tagList, body, description, author, createdAt, updatedAt, favoritesCount } = article;

  const [deleteArticle, fetchInfo] = useDeleteArticleMutation();
  const { isLoading } = fetchInfo;

  const fetchArticleDelete = async () => {
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

      <div className={classes['article-sidebar']}>
        <UserInfo author={author} date={format(new Date(updatedAt || createdAt), 'MMMM d, yyyy')} />
        {full && (
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
