import { createSlice } from "@reduxjs/toolkit"

const userStore = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    username: '',
    token: '',
    detectCounter: 0,
  },
  reducers: {
    setLogin(state) {
      state.isLogin = true
    },
    increaseDetectCounter(state) {
      state.detectCounter++
    },
  }
})

const { increaseDetectCounter, setLogin } = userStore.actions

export { increaseDetectCounter }

const userReducer = userStore.reducer

export default userReducer