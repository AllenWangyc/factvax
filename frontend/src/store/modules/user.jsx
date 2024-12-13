import { createSlice } from "@reduxjs/toolkit"

const userStore = createSlice({
  name: 'user',
  initialState: {
    username: '',
    detectCounter: 0
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload
    },
    increaseDetectCounter(state) {
      state.detectCounter++
    }
  }
})

