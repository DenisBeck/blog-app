/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Input from '../input';
import { selectToken } from '../../redux/slices/AuthSlice';
import Button from '../button/Button';
import ErrorText from '../error-text';
import Tags from '../tags';
import loading from '../../assets/img/loading.gif';

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

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('title', article ? article.title : null);
    setValue('description', article ? article.description : null);
    setValue('body', article ? article.body : null);
  }, [article]);

  const rules = {
    title: {
      create: {
        required: {
          value: true,
          message: 'Title is required',
        },
      },
      edit: {
        required: {
          value: true,
          message: 'Title is required',
        },
      },
    },
    description: {
      create: {
        required: {
          value: true,
          message: 'Description is required',
        },
      },
      edit: {
        required: {
          value: true,
          message: 'Description is required',
        },
      },
    },
    body: {
      create: {
        required: {
          value: true,
          message: 'Text is required',
        },
      },
      edit: {
        required: {
          value: true,
          message: 'Text is required',
        },
      },
    },
  };

  const onSubmit = async (data) => {
    const dataWithTags = { ...data, tagList: tags };
    try {
      const { article: fetchArticle } = await process({
        article: dataWithTags,
        authKey: authToken || null,
        slug: article ? article.slug : null,
      }).unwrap();

      console.log(fetchArticle);

      navigate('/');
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
      <Input
        key="title"
        validateOptions={{ register, rules: rules.title[type] }}
        className={classes['article-form-input']}
        slug="title"
        label="Title"
        ariaInvalid={!!errors.title}
        value={article ? article.title : null}
      />
      {errors.title && <ErrorText text={errors.title.message} />}
      {getErrorMessageForField('title') && <ErrorText text={getErrorMessageForField('title')} />}

      <Input
        key="description"
        validateOptions={{ register, rules: rules.description[type] }}
        className={classes['article-form-input']}
        slug="description"
        label="Short description"
        ariaInvalid={!!errors.description}
        value={article ? article.description : null}
      />
      {errors.description && <ErrorText text={errors.description.message} />}
      {getErrorMessageForField('description') && <ErrorText text={getErrorMessageForField('description')} />}

      <div className={classes['article-form-textarea']}>
        <label className={classes['article-form-textarea-label']} htmlFor="body">
          Text
          <textarea
            className={[classes['article-form-textarea-text'], errors.text ? classes.error : null].join(' ')}
            id="body"
            name="article-text"
            placeholder="Text"
            onChange={(e) => e.target.value}
            aria-invalid={!!errors.text}
            {...register('body', rules.body[type])}
          >
            {article ? article.body : null}
          </textarea>
        </label>
      </div>
      {errors.body && <ErrorText text={errors.body.message} />}
      {getErrorMessageForField('body') && <ErrorText text={getErrorMessageForField('body')} />}

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
