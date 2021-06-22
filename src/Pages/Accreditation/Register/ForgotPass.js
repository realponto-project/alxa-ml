import React, { useState } from 'react'
import {message} from 'antd'
import ForgotPassContainer from '../../../Containers/Accreditation/ForgetPass'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'

import { recoveryUser } from '../../../Services/User'

const ForgetPass = ({ history }) => {
  const [sucess, setSucess] = useState(false)
  const [loading, setLoading] = useState(false)

  const goToLogin = () => history.push('/login')

  const handleSubmit = async (values) => {
    try {
      setLoading(true)

      await recoveryUser(values)

      setLoading(false)
      setSucess(true)
    } catch (error) {
      setLoading(false)
      message.error(
        'Não foi possível realizar a solicitação'
      )
    }
  }

  return <ForgotPassContainer 
    handleSubmit={handleSubmit}
    sucess={sucess}
    loading={loading}
    goToLogin={goToLogin}
  />
}


const enhanced = compose(withRouter)

export default enhanced(ForgetPass)
