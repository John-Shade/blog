import { createSlice, current } from '@reduxjs/toolkit'
import { getArticles, getArticle, updateArticle } from '../api/api'

const initialState = {
  dataList: [],
  indexPage: 1,
  totalPages: 0,
  mistake: false,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeIndex(state, action) {
      state.indexPage = action.payload
    },
    changeTotalCount(state, action) {
      state.totalPages = action.payload
    },
    changeFavorite(state, action) {
      const ind = current(state.dataList).findIndex(
        (el) => el.slug === action.payload.slug
      )
      if (action.payload.favorited) {
        state.dataList[ind].favoritesCount = action.payload.favoritesCount - 1
        state.dataList[ind].favorited = false
      } else {
        state.dataList[ind].favoritesCount = action.payload.favoritesCount + 1
        state.dataList[ind].favorited = true
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, () => {})
      .addCase(getArticles.fulfilled, (state, action) => {
        state.dataList = action.payload.articles
        state.totalPages = action.payload.articlesCount
      })
    builder
      .addCase(getArticle.fulfilled, (state, action) => {
        state.dataList = [action.payload.article]
      })
      .addCase(getArticles.rejected, (state) => {
        state.mistake = true
        // state.dataList = action.payload
      })
    builder
      .addCase(updateArticle.rejected, (state) => {
        state.mistake = true
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const ind = current(state.dataList).findIndex(
          (el) => el.slug === action.payload.slug
        )
        state.dataList[ind] = action.payload
      })
  },
})

export const { actions, reducers } = dataSlice
export default dataSlice
