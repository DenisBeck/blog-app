import React from 'react';

import classes from './ArticleForm.module.scss';

function ArticleForm({ type }) {
  return <form className={classes['article-form']}>ARTICLE FORM - !!! {type} !!!</form>;
}

export default ArticleForm;
