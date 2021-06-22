import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { compose, isEmpty, pathOr } from 'ramda'
import { verify } from 'jsonwebtoken'

import OnboardingContainer from '../../Containers/Onboarding'
import {
  updateMyInfo as updateMyInfoService,
  resetPassword,
  getUserById
} from '../../Services/User'

const Onboarding = ({ history, match }) => {
  const [errorMessage, setErrorMessage] = useState(false)
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    try {
      await resetPassword(match.params.token, values)
      setLoading(false)
      history.push('/login')
    } catch (error) {
      updateMyInfoService(
        user.id,
        {
          firstAccess: true,
          lastTokenDate: null,
          countTokenSended: 0
        },
        { headers: match.params.token }
      ).then(() => history.push('/login'))
      console.log(error)
    }
  }

  const updateMyInfo = async (userId, values) => {
    try {
      await updateMyInfoService(
        (userId = user.id),
        {
          ...values,
          document: values.document.replace(/\D/g, '')
        },
        {
          headers: {
            Authorization: `Bearer ${match.params.token}`
          }
        }
      )
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setErrorMessage(error.response.data.error)
      throw error
    }
  }

  useEffect(() => {
    verify(
      match.params.token,
      process.env.REACT_APP_SECRET_KEY_JWT,
      (error, decoded) => {
        const userId = pathOr(false, ['user', 'id'], decoded)
        if (!error && userId) {
          setUserId(userId)
        } else {
          throw new Error('Invalid token')
        }
      }
    )
  }, [])

  useEffect(() => {
    if (!isEmpty(userId)) {
      getUserById(userId, {
        headers: {
          Authorization: `Bearer ${match.params.token}`
        }
      }).then(({ data }) => setUser(data))
    }
  }, [userId])

  return (
    <OnboardingContainer
      user={user}
      updateMyInfo={updateMyInfo}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
      loading={loading}
      setLoading={setLoading}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(Onboarding)
