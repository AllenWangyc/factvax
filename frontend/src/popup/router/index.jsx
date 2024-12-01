import { createHashRouter, Navigate } from 'react-router-dom'
import Login from '@/popup/pages/login'
import Entry from '@/popup/pages/entry'
import Home from '@/popup/pages/home'
import Account from '@/popup/pages/account'

// Global router
export const globalRouters = createHashRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <Entry />
    ),
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/account',
        element: <Account />,
      },
      {
        path: '/',
        element: <Navigate to="/home" />,
      },
      {
        path: '*',
        element: <Navigate to="/home" />,
      },
    ],
  },
])