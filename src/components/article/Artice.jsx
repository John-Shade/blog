import './Article.css'
import { useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import ShortArticle from '../short-article'
import { useGetData } from '../../hooks/hooks'

export default function Article() {
  // const { state } = useLocation()
  const { slug } = useParams()
  const { dataList } = useGetData()
  if (dataList) {
    return (
      <article className="article-container article-container--full">
        <div className="article">
          <ShortArticle item={dataList} slug={slug} />
        </div>
        <div className="article-container--body">
          <Markdown>{dataList.body}</Markdown>
        </div>
      </article>
    )
  }
}
