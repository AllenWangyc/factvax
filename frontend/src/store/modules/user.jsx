import { createSlice } from "@reduxjs/toolkit"
import {
  setToken as _setToken, getToken, removeToken,
  setUsername as _setUsername, getUsername, removeUsername,
  setColorSeed as _setColorSeed, getColorSeed, removeColorSeed
} from '@/utils'
import { apiReqs, loginAPI } from '@/apis'

const { signIn } = apiReqs

const userStore = createSlice({
  name: 'user',
  initialState: {
    username: getUsername() || '',
    token: getToken() || '',
    colorSeed: getColorSeed() || -1, // Use for Setting avator's color and bg color, value from [0, 9]
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
    setColorSeed(state) {
      state.colorSeed = Math.floor(Math.random() * 10)
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
      removeToken()
      removeUsername()
      removeColorSeed()
    }
  }
})

const { setUsername, setToken, setColorSeed, increaseDetectCounter, logout } = userStore.actions

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    dispatch(setToken(res.data.token))
    dispatch(setUsername(res.data.username))
  }
}

const userReducer = userStore.reducer

export { fetchLogin, setColorSeed, logout }

export default userReducer