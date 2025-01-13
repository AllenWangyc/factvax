import { createSlice } from "@reduxjs/toolkit"
import { parseJsonCookies } from '@/utils'
import { loginAPI } from '@/apis'

const userInfo = parseJsonCookies('userInfo')

const userStore = createSlice({
  name: 'user',
  initialState: {
    isLogin: userInfo ? true : false,
    username: userInfo?.username || '',
    colorSeed: userInfo?.randomNumber || -1, // Use for Setting avator's color and bg color, the value from [0, 9]
    detectCounter: 0,
  },
  reducers: {
    setLogin(state) {
      state.isLogin = true
    },
    setUsername(state, action) {
      state.username = action.payload
    },
    setColorSeed(state, action) {
      state.colorSeed = action.payload
    },
    increaseDetectCounter(state) {
      state.detectCounter++
    },
    logout(state) {
      // Reset global states and local storage key values
      state.username = ''
      state.colorSeed = -1
      state.isLogin = false
    }
  }
})

const { setUsername, setColorSeed, increaseDetectCounter, logout, setLogin } = userStore.actions

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    console.log(res)
    dispatch(setLogin())
    if (res.username) {
      dispatch(setUsername(res.username))
    }
    if (res.colorSeed || res.colorSeed === 0) {
      dispatch(setColorSeed(res.colorSeed))
    }
  }
}

const userReducer = userStore.reducer

export { fetchLogin, setColorSeed, logout }

export default userReducer