import React from 'react';
import { Navigate } from 'react-router-dom';
import { Home, Login, AccountInformation, NotFound, ChangePassword, SignUp } from './pages';
const routes = (username) => [
  { path: '/login', element: username ? <Navigate to='/home' /> : <Login /> },
  { path: '/register', element: username ? <Navigate to='/home' /> : <SignUp /> },
  {
    path: '/user',
    element: !username ? (
      <Navigate to='/login' />
    ) : (
      <Navigate to='/user/account' />
    ),
  },
  { path: '/user/account', element: <AccountInformation /> },
  {
    path: '/user/password',
    element: !username ? <Navigate to='/login' /> : <ChangePassword />,
  },
  {
    path: '/',
    element: username ? <Home /> : <Navigate to='/login' />,
    children: [{ path: 'home', element: <Home /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default routes;