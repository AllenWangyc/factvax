import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import { Layout, Detection, History, Visualization, Login, Register, Result, Info, Password, TC } from '@/dashboard/pages'
import { AuthRoute } from "@/components/AuthRoute"

const router = createBrowserRouter([
  // Dashboard panel
  {
    path: '/',
    element: null,
    loader: () => {
      window.location.replace('/dashboard/');
      return null;
    }
  },
  {
    path: '/dashboard/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        element: <Detection />
      },
      {
        path: 'result/:id',
        element: <Result />
      },
      {
        path: 'history',
        element: <History />
      },
      {
        path: 'visualization',
        element: <Visualization />
      },
    ],

  },
  // Login page
  {
    path: '/dashboard/login',
    element: <Login />
  },
  // Register page
  {
    path: '/dashboard/register',
    element: <Register />
  },
  {
    path: '/dashboard/password',
    element: <Password />
  },
  {
    path: '/dashboard/info',
    element: <Info />
  },
  {
    path: '/dashboard/term&condition',
    element: <TC />
  },
])

export default router