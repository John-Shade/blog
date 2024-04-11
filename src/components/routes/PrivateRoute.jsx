import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  if (isLoggedIn !== undefined) {
    if (isLoggedIn) return <Outlet />
    return <Navigate to="/sign-in" />
  }
}
