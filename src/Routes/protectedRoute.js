import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const isAuthenticated = localStorage.getItem('token')

  if (isAuthenticated) {
    return <Route {...props} />
  } else {
    return <Route {...props} />
  }
}

export default ProtectedRoute
