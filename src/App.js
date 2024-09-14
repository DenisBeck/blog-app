import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ArticlesListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EditProfilePage from './pages/EditProfilePage';
import EditArticlePage from './pages/EditArticlePage';
import CreateArticlePage from './pages/CreateArticlePage';
import LogoutPage from './pages/LogoutPage';
import Layout from './components/layout';

const routes = [
  { path: '/', element: <ArticlesListPage /> },
  { path: '/articles', element: <ArticlesListPage /> },
  { path: '/articles/:slug', element: <ArticlePage /> },
  { path: '/sign-up', element: <RegisterPage /> },
  { path: '/sign-in', element: <LoginPage /> },
  { path: '/log-out', element: <LogoutPage /> },
  { path: '/profile', element: <EditProfilePage /> },
  { path: '/articles/:slug/edit', element: <EditArticlePage /> },
  { path: '/new-article', element: <CreateArticlePage /> },
  { path: '/articles/page/:page', element: <ArticlesListPage /> },
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
