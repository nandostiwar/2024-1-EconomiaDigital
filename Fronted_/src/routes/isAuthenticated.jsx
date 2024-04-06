import { Navigate, Outlet } from 'react-router-dom'

const IsAuthenticated = () => {
  let auth = { 'access': true }

  if (sessionStorage.getItem('token')) {
    auth = { 'access': false }
  } else {
    auth = { 'access': true }
  }

  return (
    auth.access ? <Outlet /> : <Navigate to="/dashboard" />
  )
}

export default IsAuthenticated