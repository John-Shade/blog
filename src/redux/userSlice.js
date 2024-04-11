import { createSlice } from '@reduxjs/toolkit'

import { createtUser, getUser, getCurrentUser, updateUser } from '../api/api'

const initialState = {
  userInfo: {
    username: null,
    // password: null,
    token: null,
    email: null,
    // bio: null,
    image: null,
  },
  isLoggedIn: undefined,
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
  },
  extraReducers: (builder) => {
    console.log('user extraReducers')
    builder
      .addCase(createtUser.pending, () => {
        console.log('createtUser pending')
      })
      .addCase(createtUser.fulfilled, () => {
        console.log('createtUser fulfilled')
      })
      .addCase(createtUser.rejected, (state) => {
        console.log('createtUser rejected')
        state.isLoggedIn = false
      })
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log('getUser fulfilled')
      state.userInfo = action.payload
      state.isLoggedIn = true
      localStorage.setItem('token', action.payload.token)
    })
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      console.log('getCurrentUser fulfilled')
      state.userInfo = action.payload
      state.isLoggedIn = true
      localStorage.setItem('token', action.payload.token)
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log('updateUser fulfilled')
      state.userInfo = action.payload
      localStorage.setItem('token', action.payload.token)
    })
  },
})

export const { actions, reducers } = userSlice

export default userSlice
