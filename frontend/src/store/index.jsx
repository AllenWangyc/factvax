import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from '@/store/module/user'

export default configureStore({
  reducer: {
    user: userReducer
  }
})