import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import LoginContainer from '../../Containers/Login'
import Auth from '../../Services/Auth'
import { getCompanyById } from '../../Services/Company'
import { getAllStatus } from '../../Services/Status'
import { getSubscriptionActivated } from '../../Services/Subscription'
import { getAll as getAllPlan } from '../../Services/Plans'

const Login = ({
  history,
  loggedUser,
  setCompany,
  setStatus,
  setSubscription,
  setPlan
}) => {
  const [isVisibleMessageError, setIsVisibleMessageError] = useState(false)
  const [loading, setLoading] = useState(false)

  const authentication = (values) => {
    let redirectPage = '/logged/ads/manager'
    setLoading(true)
    Auth(values)
      .then(({ data }) => {
        loggedUser(data)
        if (data.firstAccess) {
          redirectPage = '/user/onboarding'
        }
        localStorage.setItem('token', data.token)
        localStorage.setItem('user.name', data.name)
        return data
      })
      .then((data) => {
        return getCompanyById(data.companyId)
      })
      .then(({ data }) => setCompany(data))
      .then(() => getAllStatus({ limit: 9999 }))
      .then(({ data }) => setStatus(data))
      .then(() => getAllPlan())
      .then(({ data }) => setPlan(data.source))
      .then(() => getSubscriptionActivated())
      .then(({ data }) => setSubscription(data))
      .then(() => history.push(redirectPage))
      .catch((err) => {
        setLoading(false)
        setIsVisibleMessageError(!!err.response)
        console.error(err)
      })
  }

  return (
    <LoginContainer
      authentication={authentication}
      isVisibleMessageError={isVisibleMessageError}
      loading={loading}
      registerPath="register"
      forgotPassPath="forgotPass"
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  loggedUser: (payload) => dispatch({ type: 'USER_LOGGED', payload }),
  setCompany: (payload) => dispatch({ type: 'SET_COMPANY', payload }),
  setStatus: (payload) => dispatch({ type: 'SET_STATUS', payload }),
  setSubscription: (payload) => dispatch({ type: 'SET_SUBSCRIPTION', payload }),
  setPlan: (payload) => dispatch({ type: 'SET_PLANS', payload })
})

const enhanced = compose(connect(null, mapDispatchToProps), withRouter)

export default enhanced(Login)
