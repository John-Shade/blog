import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRouteIfLogged() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  if (isLoggedIn !== undefined) {
    if (isLoggedIn) return <Navigate to="/articles" />
    return <Outlet />
  }
}
