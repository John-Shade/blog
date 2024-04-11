// import logo from './logo.svg'
// import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// import { Pagination } from 'antd'
// import { getArticles } from '../api/api'
// import { changeIndexAction } from '../redux/reducer'

import { useDispatch } from 'react-redux'

import Header from '../components/header'
import ArticleList from '../components/article-list'
import Article from '../components/article'
import CreateAccountForm from '../components/forms/CreateAccountForm'
import LoginForm from '../components/forms/LoginForm'
import EditProfileForm from '../components/forms/EditProfileForm'
import ArticleForm from '../components/forms/ArticleForm'
import PrivateRoute from '../components/routes/PrivateRoute'
import PrivateRouteIfLogged from '../components/routes/PrivateRouteIfLogged'
import PrivateRouteForEdit from '../components/routes/PrivateRouteForEdit'

import { getCurrentUser } from '../api/api'
import useAction from '../hooks/hooks'

import './App.css'

function App() {
  const dispatch = useDispatch()
  const { changeIsLogged } = useAction()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) dispatch(getCurrentUser())
    else changeIsLogged()
  }, [dispatch, changeIsLogged])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="articles" />} />
        <Route path="/*" element={<PrivateRouteIfLogged />}>
          <Route path="sign-up" element={<CreateAccountForm />} />
          <Route path="sign-in" element={<LoginForm />} />
        </Route>
        <Route path="articles">
          <Route index element={<ArticleList />} />
          <Route path=":slug">
            <Route index element={<Article />} />
            <Route path="edit" element={<PrivateRouteForEdit />}>
              <Route path="" element={<ArticleForm />} />
            </Route>
          </Route>
        </Route>
        <Route path="profile" element={<PrivateRoute />}>
          <Route path="" element={<EditProfileForm />} />
        </Route>
        <Route path="new-article" element={<PrivateRoute />}>
          <Route path="" element={<ArticleForm />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
