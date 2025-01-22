import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { message } from "antd"
import { useEffect } from "react"

/**
 * 
 * @param {props} children 
 * @returns successfully return specified component if token exist, or navigate to '/dashboard/login'
 */
export function AuthRoute({ children }) {
  const isLogin = useSelector(state => state.user.isLogin)

  useEffect(() => {
    if (!isLogin) {
      message.warning("Please log in to access this content.")
    }
  }, [isLogin])

  if (isLogin) {
    return <>{children}</>
  } else {
    return <Navigate to={'/dashboard/login'} replace />
  }
}
