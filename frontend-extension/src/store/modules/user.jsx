import { createSlice } from "@reduxjs/toolkit"
import {
  setToken as _setToken, getToken, removeToken,
  setUsername as _setUsername, getUsername, removeUsername,
  setColorSeed as _setColorSeed, getColorSeed, removeColorSeed
} from '@/utils'
import { loginAPI } from '@/apis'

const userStore = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    username: getUsername() || '',
    token: getToken() || '',
    colorSeed: getColorSeed() || -1, // Use for Setting avator's color and bg color, the value from [0, 9]
    detectCounter: 0,
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload
      _setUsername(action.payload)
    },
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setLogin(state) {
      state.isLogin = true
    },
    setColorSeed(state, action) {
      // state.colorSeed = Math.floor(Math.random() * 10)
      state.colorSeed = action.payload
      _setColorSeed(state.colorSeed)
    },
    increaseDetectCounter(state) {
      state.detectCounter++
    },
    logout(state) {
      // Reset global states and local storage key values
      state.username = ''
      state.token = ''
      state.colorSeed = -1
      state.isLogin = false
      removeToken()
      removeUsername()
      removeColorSeed()
    }
  }
})

const { setUsername, setToken, setColorSeed, increaseDetectCounter, logout, setLogin } = userStore.actions

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    dispatch(setLogin())
    console.log(res.colorSeed);

    if (res.token) {
      dispatch(setToken(res.token))
    }
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