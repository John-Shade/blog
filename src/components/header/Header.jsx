import { Header as Head } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Header.css'
import { Button } from 'antd'
import useAction from '../../hooks/hooks'
import { HeaderSpinner } from '../spinner/Spinner'

export default function Header() {
  const { changeIndex, logout } = useAction()
  const { isLoggedIn, awaitingRequest } = useSelector((state) => state.user)
  const { username, image } = useSelector((state) => state.user.userInfo)

  return (
    <Head className="header">
      <Link to="/articles" onClick={() => changeIndex(1)}>
        <span className="header--name">Realworld Blog</span>
      </Link>
      {awaitingRequest && <HeaderSpinner />}
      <div className="header-container">
        {!isLoggedIn && (
          <>
            <Link to="sign-in" className="link header-link">
              Sign In
            </Link>
            <Link to="sign-up" className="link header-link">
              Sign Up
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="new-article" className="link header-link">
              Create article
            </Link>
            <Link to="profile" className="link header-link header-profile">
              {username}
              <img className="header-img" src={image} alt="" />
            </Link>
            <Button className="header-button" onClick={() => logout()}>
              Log Out
            </Button>
          </>
        )}
      </div>
    </Head>
  )
}
