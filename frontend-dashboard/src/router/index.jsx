import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import { Layout, Detection, History, Visualization, Login, Register, Result } from '@/dashboard/pages'

const router = createBrowserRouter([
  // Dashboard panel
  {
    path: '/dashboard/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Detection />
      },
      {
        path: 'result',
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
  }
])

export default router