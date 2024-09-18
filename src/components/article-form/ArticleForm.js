/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Input from '../input';
import { selectToken } from '../../redux/slices/AuthSlice';
import Button from '../button/Button';
import ErrorText from '../error-text';
import Tags from '../tags';
import loading from '../../assets/img/loading.gif';
import useValidate from '../../hooks/useValidate';
import getValidateFields from '../../hooks/useValidate/getValidateFields';

import classes from './ArticleForm.module.scss';

function ArticleForm({ article, process, fetchInfo, type, header }) {
  const [tags, setTags] = useState(article ? article.tagList : []);
  const [fetchErrors, setFetchErrors] = useState([]);

  const { isLoading } = fetchInfo;
  const authToken = useSelector(selectToken);

  const navigate = useNavigate();

  const onAddTagHandler = (val) => {
    setTags([...tags, val]);
  };

  const onRemoveTagHandler = (val) => {
    setTags(tags.filter((tag) => tag !== val));
  };

  const { handleSubmit, setValue, validateFields } = useValidate('article', type, getValidateFields(type));

  useEffect(() => {
    setValue('title', article ? article.title : null);
    setValue('description', article ? article.description : null);
    setValue('body', article ? article.body : null);
  }, [article]);

  const onSubmit = async (data) => {
    const dataWithTags = { ...data, tagList: tags };
    try {
      const { article: fetchArticle } = await process({
        article: dataWithTags,
        authKey: authToken || null,
        slug: article ? article.slug : null,
      }).unwrap();

      navigate(`/articles${article ? `/${article.slug}` : ''}`, { state: { article: fetchArticle } });
    } catch (err) {
      if (typeof err.data === 'string') {
        setFetchErrors([err.data]);
      } else {
        setFetchErrors(Object.entries(err.data.errors).map((arr) => arr.join(' ')));
      }
    }
  };

  const getErrorMessageForField = (field) => {
    if (!fetchErrors.length) {
      return null;
    }
    return fetchErrors.find((error) => error.includes(field));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes['article-form']}>
      <h3 className={classes['article-form-title']}>{header}</h3>

      {validateFields.map(({ fieldInfo, validateOptions, errorMessage }) => {
        if (fieldInfo.value === 'body') {
          return (
            <Fragment key={fieldInfo.value}>
              <div className={classes['article-form-textarea']}>
                <label className={classes['article-form-textarea-label']} htmlFor={fieldInfo.value}>
                  {fieldInfo.label}
                  <textarea
                    className={[classes['article-form-textarea-text'], errorMessage ? classes.error : null].join(' ')}
                    id={fieldInfo.value}
                    name={fieldInfo.value}
                    placeholder={fieldInfo.label}
                    onChange={(e) => e.target.value}
                    aria-invalid={!!errorMessage}
                    {...validateOptions}
                    defaultValue={article ? article.body : null}
                  />
                </label>
              </div>
              {errorMessage && <ErrorText text={errorMessage} />}
              {getErrorMessageForField(fieldInfo.value) && (
                <ErrorText text={getErrorMessageForField(fieldInfo.value)} />
              )}
            </Fragment>
          );
        }

        return (
          <Fragment key={fieldInfo.value}>
            <Input
              type={fieldInfo.type}
              validateOptions={validateOptions}
              className={classes['article-form-input']}
              slug={fieldInfo.value}
              label={fieldInfo.label}
              ariaInvalid={!!errorMessage}
              value={article ? article.title : null}
            />
            {errorMessage && <ErrorText text={errorMessage} />}
            {getErrorMessageForField(fieldInfo.value) && <ErrorText text={getErrorMessageForField(fieldInfo.value)} />}
          </Fragment>
        );
      })}

      <div className={classes['article-form-tags']}>
        <h4 className={classes['article-form-tags-title']}>Tags</h4>
        <Tags tags={tags} onAddTag={onAddTagHandler} onRemoveTag={onRemoveTagHandler} />
      </div>

      <Button className={classes['article-form-button']} type="Submit" label="Send" image={isLoading && loading} />
      {fetchErrors.length > 0 && <ErrorText text={fetchErrors} />}
    </form>
  );
}

export default ArticleForm;
