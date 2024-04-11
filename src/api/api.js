import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
  timeout: 3000,
  headers: {
    accept: 'application/json',
  },
})

const getArticles = createAsyncThunk(
  'data/getArticles',
  async (indexPage, thunkAPI) => {
    console.log(thunkAPI)
    const res = await instance({
      url: `/articles?offset=${(indexPage - 1) * 20}`,
      method: 'GET',
    })
    return res.data
  }
)

const getArticle = createAsyncThunk('data/getArticle', async (slug) => {
  const res = await instance({
    url: `/articles/${slug}`,
    method: 'GET',
  })
  return res.data
})

const createtUser = createAsyncThunk('user/createtUser', async (objUser) => {
  const res = await instance.post('/users', objUser)
  return res.data.user
})

const getUser = createAsyncThunk('user/getUser', async (objUser) => {
  const res = await instance.post('/users/login', objUser)
  return res.data.user
})

const getCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
  const res = await instance.get('/user')
  return res.data.user
})

const createArticle = async (article) => {
  await instance.post('/articles', article)
}

const updateUser = createAsyncThunk('user/updateUser', async (objUser) => {
  const res = await instance.put('/user', objUser)
  return res.data.user
})

const favorite = async (slug) => {
  await instance.post(`/articles/${slug}/favorite`)
}

const unfavorite = async (slug) => {
  await instance.delete(`/articles/${slug}/favorite`)
}

const updateArticle = createAsyncThunk(
  'data/updateArticle',
  async ({ objArticle, slug }) => {
    const res = await instance.put(`/articles/${slug}`, objArticle)
    return res.data.article
  }
)

const deleteArticle = async (slug) => {
  await instance.delete(`/articles/${slug}`)
}

instance.interceptors.request.use((config) => {
  console.log('interceptors')
  // if (
  //   config.method === 'put' ||
  //   config.url === '/user' ||
  //   (config.url === '/articles' && config.method === 'post')
  // ) {

  // const { token } = store.getState().user.userInfo
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Token ${token}`
  // }
  return config
})

export {
  getArticles,
  createtUser,
  getArticle,
  getUser,
  createArticle,
  updateArticle,
  deleteArticle,
  favorite,
  unfavorite,
  getCurrentUser,
  updateUser,
  instance,
}
