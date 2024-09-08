import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ArticlesListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EditProfilePage from './pages/EditProfilePage';
import EditArticlePage from './pages/EditArticlePage';
import CreateArticlePage from './pages/CreateArticlePage';
import Layout from './components/layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesListPage />} />
        <Route path="/articles" element={<ArticlesListPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/editProfile" element={<EditProfilePage />} />
        <Route path="/editArticle" element={<EditArticlePage />} />
        <Route path="/createArticle" element={<CreateArticlePage />} />
        <Route path="/articles/page/:page" element={<ArticlesListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
