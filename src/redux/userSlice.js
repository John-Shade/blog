import { createSlice } from '@reduxjs/toolkit'

import { createtUser, getUser, getCurrentUser, updateUser } from '../api/api'

const initialState = {
  userInfo: {
    username: null,
    token: null,
    email: null,
    image: null,
  },
  isLoggedIn: undefined,
  awaitingRequest: false,
  mistake: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = initialState.userInfo
      state.isLoggedIn = false
      localStorage.removeItem('token')
    },
    changeIsLogged(state) {
      state.isLoggedIn = false
    },
    changeMistake(state) {
      state.mistake = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createtUser.pending, (state) => {
        state.awaitingRequest = true
      })
      .addCase(createtUser.fulfilled, (state) => {
        state.awaitingRequest = false
        state.mistake = false
      })
      .addCase(createtUser.rejected, (state) => {
        state.isLoggedIn = false
        state.awaitingRequest = false
        state.mistake = true
      })
    builder
      .addCase(getUser.pending, (state) => {
        state.awaitingRequest = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userInfo = action.payload
        state.isLoggedIn = true
        localStorage.setItem('token', action.payload.token)
        state.awaitingRequest = false
        state.mistake = false
      })
      .addCase(getUser.rejected, (state) => {
        state.awaitingRequest = false
        state.mistake = true
      })
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.userInfo = action.payload
      state.isLoggedIn = true
      localStorage.setItem('token', action.payload.token)
    })
    builder
      .addCase(updateUser.pending, (state) => {
        state.awaitingRequest = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload
        localStorage.setItem('token', action.payload.token)
        state.awaitingRequest = false
      })
      .addCase(updateUser.rejected, (state) => {
        state.awaitingRequest = false
      })
  },
})

export const { actions, reducers } = userSlice

export default userSlice
