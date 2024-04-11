import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetData } from '../../hooks/hooks'
import ErrorMessage from '../forms/ErrorMessage'

export default function PrivateRouteForEdit() {
  // const { slug } = useParams()

  const isLoggedIn = useSelector((state) => state.user.userInfo.username)

  const { dataList } = useGetData()

  if (dataList) {
    if (isLoggedIn === dataList.author.username)
      return <Outlet context={dataList} />
    return <ErrorMessage />
  }
  // return <Navigate to="/sign-in" />
}
