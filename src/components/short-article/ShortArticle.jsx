import './ShortArticle.css'
import { HeartOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Tooltip } from 'antd'
import useAction from '../../hooks/hooks'
import { favorite, unfavorite, deleteArticle } from '../../api/api'
import Img from './Vector.svg'

export default function ShortArticle(props) {
  const { item: data, slug } = props
  const { changeFavorite } = useAction()
  const { username } = useSelector((state) => state.user.userInfo)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  const buttonRef = useRef()

  const navigate = useNavigate()

  const TooltipContainer = (
    <div className="tooltip-container">
      <div className="tooltip-container__text-container">
        <img src={Img} alt="" className="tooltip-container__img" />
        <span className="tooltip-container__text">
          Are you sure to delete this article?
        </span>
      </div>
      <div className="tooltip-container__buttons-container">
        <button
          type="button"
          className="tooltip-container__button"
          onClick={() => buttonRef.current.click()}
        >
          No
        </button>
        <button
          type="button"
          className="tooltip-container__button"
          onClick={() => {
            deleteArticle(slug).then(() => navigate('articles'))
          }}
        >
          Yes
        </button>
      </div>
    </div>
  )
  function cropOverview(text) {
    const mas = text.split(' ')
    let bool = false
    const ind = mas.slice(0).reduce((acc, el, index, arr) => {
      if (acc + el.length >= 76) {
        arr.splice(0, arr.length + 1)
        bool = true
        return index
      }
      return acc + el.length
    }, 0)
    return bool
      ? mas
          .slice(0, ind + 1)
          .join(' ')
          .concat('...')
      : text
  }

  return (
    <>
      <div className="article--body">
        <div className="article--inf">
          <div>
            <Link
              to={data.slug}
              state={{ item: data }}
              className="link link-article"
            >
              <span className="article--title">{cropOverview(data.title)}</span>
            </Link>
            <span>
              <HeartOutlined
                onClick={() => {
                  if (!data.favorited && isLoggedIn) {
                    favorite(data.slug).then(() => changeFavorite(data))
                  } else if (isLoggedIn) {
                    unfavorite(data.slug).then(() => changeFavorite(data))
                  }
                }}
                style={{
                  color: data.favorited && isLoggedIn ? 'red' : 'black',
                }}
              />{' '}
              {data.favoritesCount}
            </span>
          </div>
        </div>
        <div className="article--tags">
          {data.tagList.map((el) => (
            <span className="article--tag" key={el + Math.random()}>
              {el}
            </span>
          ))}
        </div>
        <span className="article--description">{data.description}</span>
      </div>

      <div className="article--user--with-buttons">
        <div className="article--user">
          <div className="article--user--information">
            <span className="article--user--information--username">
              {data.author.username}
            </span>
            <span className="article--user--information--date">
              {format(data.createdAt, 'PPP')}
            </span>
          </div>
          <img
            alt=""
            className="article--user--image"
            src={data.author.image}
          />
        </div>
        {data.author.username === username && slug && (
          <div className="button-container">
            <Tooltip title={TooltipContainer} trigger="click">
              <button
                type="button"
                className="form-button tag-button tag-button--delete"
                aria-label="Delete"
                ref={buttonRef}
              >
                Delete
              </button>
            </Tooltip>
            <Link to="edit" state={{ slug }}>
              <button
                type="button"
                className="form-button tag-button tag-button--edit"
                aria-label="Save"
              >
                Edit
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
