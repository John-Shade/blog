import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useRef, useMemo, useState } from 'react'

import { actions as dataActions } from '../redux/dataSlice'
import { actions as userActions } from '../redux/userSlice'
import { getArticle } from '../api/api'

const rootActions = {
  ...dataActions,
  ...userActions,
}

const useAction = () => {
  const dispatch = useDispatch()
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}

export const useGetData = () => {
  const [a, setA] = useState(false)
  const { slug } = useParams()
  const ref = useRef(false)
  const dispatch = useDispatch()
  const dataList = useSelector((st) => {
    const ind = st.data.dataList.findIndex((el) => el.slug === slug)
    if (ind === -1 && !ref.current) {
      ref.current = true
      dispatch(getArticle(slug)).then(() => {
        setA(true)
      })
    } else if (!a) setA(true)
    return st.data.dataList[ind]
  })
  return { dataList, a }
}

export default useAction
