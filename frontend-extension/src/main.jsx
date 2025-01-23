import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/common/styles/frame.styl'
import store from '@/store'
import { Provider } from 'react-redux'
import Popup from '@/popup'

// ReactDOM.createRoot(document.getElementById('root')).render(<Popup />)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Popup />
  </Provider>
)