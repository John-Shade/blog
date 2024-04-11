import './ArticleList.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Pagination } from 'antd'
import { getArticles } from '../../api/api'
import useAction from '../../hooks/hooks'
import BigSpinner from '../spinner/Spinner'
import ErrorMessage from './ErrorMessage'

import ShortArticle from '../short-article'

export default function ArticleList() {
  const dispatch = useDispatch()

  const { changeIndex } = useAction()

  const { totalPages, indexPage, dataList, mistake } = useSelector(
    (state) => state.data
  )

  useEffect(() => {
    dispatch(getArticles(indexPage))
  }, [dispatch, indexPage])

  if (dataList.length === 0) {
    return <BigSpinner />
  }

  if (mistake) {
    return <ErrorMessage />
  }

  return (
    <>
      <ul className="article-list article-container">
        {dataList.map((item) => (
          <li className="article article-item" key={item.slug}>
            <ShortArticle item={item} />
          </li>
        ))}
      </ul>
      <Pagination
        defaultCurrent={1}
        pageSize={20}
        onChange={(page) => {
          if (indexPage !== page) {
            changeIndex(page)
          }
        }}
        current={indexPage}
        total={totalPages}
        showSizeChanger={false}
        style={{ textAlign: 'center', marginBottom: 20 }}
      />
    </>
  )
}
