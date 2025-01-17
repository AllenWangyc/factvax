import { createSlice } from "@reduxjs/toolkit"
import { parseJsonCookies } from '@/utils'
import { loginAPI, loginByGoogleAPI, loginByGithubAPI, logoutAPI } from '@/apis'

const userInfo = parseJsonCookies('userInfo')

const userStore = createSlice({
  name: 'user',
  initialState: {
    isLogin: userInfo ? true : false,
    username: userInfo?.username || '',
    colorSeed: (userInfo?.randomNumber + 1) ? userInfo?.randomNumber : -1, // Use for Setting avator's color and bg color, the value from [0, 9]
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
    console.log('Login response:', res)
    dispatch(setLogin())
    if (res.username) {
      dispatch(setUsername(res.username))
    }
    if (res.colorSeed || res.colorSeed === 0) {
      dispatch(setColorSeed(res.colorSeed))
    }
  }
}

const fetchLoginByGoogle = () => {
  return async (dispatch) => {
    const res = await loginByGoogleAPI()
    console.log('Google login response: ', res)
    dispatch(setLogin())
    if (res.username) {
      dispatch(setUsername(res.username))
    }
    if (res.colorSeed || res.colorSeed === 0) {
      dispatch(setColorSeed(res.colorSeed))
    }
  }
}

const fetchLoginByGithub = () => {
  return async (dispatch) => {
    const res = await loginByGithubAPI()
    console.log('Github login response: ', res)
    dispatch(setLogin())
    if (res.username) {
      dispatch(setUsername(res.username))
    }
    if (res.colorSeed || res.colorSeed === 0) {
      dispatch(setColorSeed(res.colorSeed))
    }
  }
}

const fetchLogout = () => {
  return async (dispatch) => {
    const res = await logoutAPI()
    console.log('Lotgout response (after): ', res)
    dispatch(logout())
  }
}

const userReducer = userStore.reducer

export { fetchLogin, fetchLoginByGoogle, fetchLoginByGithub, setColorSeed, logout, fetchLogout }

export default userReducer