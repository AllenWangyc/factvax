import { createSlice } from "@reduxjs/toolkit"

// Initialate state
const initialState = {
  userInfo: null,
  isLoggedIn: false,
};

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload
      state.isLoggedIn = true
    },
    logout(state) {
      state.userInfo = null
      state.isLoggedIn = false
    },
    initUserState(state, action) {
      return { ...state, ...action.payload } // Use to initialate state in background script
    },
  },
})

export const { setUser, logout, initUserState } = userSlice.actions
export default userSlice.reducer
