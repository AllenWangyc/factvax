import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import Popup from '@/popup'
import { Layout, Detection, History, Visualization } from '@/dashboard/pages'

const router = createBrowserRouter([
  // Popup panel
  {
    path: '/',
    element: <Popup />
  },
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
    path: '/dashboard/login'
  }
])

export default router