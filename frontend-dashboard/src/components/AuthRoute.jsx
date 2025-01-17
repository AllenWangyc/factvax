import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { message } from "antd"

/**
 * 
 * @param {props} children 
 * @returns successfully return specified component if token exist, or navigate to '/login'
 */
export function AuthRoute({ children }) {
  const isLogin = useSelector(state => state.user.isLogin)
  if (isLogin) {
    return <>{children}</>
  }
  else {
    message.warning('Please log in to access this content.')
    return <Navigate to={'/dashboard/login'} replace />
  }
}