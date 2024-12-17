import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/common/styles/frame.styl'
import router from '@/router'
import store from '@/store'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

// ReactDOM.createRoot(document.getElementById('root')).render(<Popup />)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)