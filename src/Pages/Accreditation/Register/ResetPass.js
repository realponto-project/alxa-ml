import React, { useState } from 'react'
import {message} from 'antd'
import ResetPassContainer from '../../../Containers/Accreditation/ResetPass'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'

import { resetPassword } from '../../../Services/User'

const ResetPass = ({ history, match }) => {
  const [sucess, setSucess] = useState(false)
  const [loading, setLoading] = useState(false)


  const goToLogin = () => history.push('/login')

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      const { token } = match.params

      await resetPassword(token ,values)

      setLoading(false)
      setSucess(true)
    } catch (error) {
      setLoading(false)
      message.error(
        'Não foi possível realizar a atualização de sua senha'
      )
    }
  }

  return <ResetPassContainer 
    handleSubmit={handleSubmit}
    sucess={sucess}
    loading={loading}
    goToLogin={goToLogin}
  />
}


const enhanced = compose(withRouter)

export default enhanced(ResetPass)
