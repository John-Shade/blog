import {
  configureStore,
  applyMiddleware,
  combineSlices,
} from '@reduxjs/toolkit'

import { thunk } from 'redux-thunk'

import dataSlice from './dataSlice'
import userSlice from './userSlice'

const rootReducer = combineSlices(userSlice, dataSlice)

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk))

export default store
