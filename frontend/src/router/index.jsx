import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import Popup from '@/popup'
import Layout from '@/dashboard/pages/Layout'

const router = createBrowserRouter([
  // Popup panel
  {
    path: '/',
    element: <Popup />
  },
  // Dashboard panel
  {
    path: '/dashboard',
    element: <Layout />
  },
  // Login page
  {
    path: '/dashboard/login'
  }
])

export default router