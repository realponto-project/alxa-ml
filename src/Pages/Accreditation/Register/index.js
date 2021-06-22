import React, { useState } from 'react'
import { applySpec, compose, pathOr } from 'ramda'
import { withRouter } from 'react-router-dom'

import RegisterContainer from '../../../Containers/Accreditation/Register'
import { createCompany } from '../../../Services/Company'

const buildCompany = applySpec({
  name: pathOr('', ['razaoSocial']),
  nickName: pathOr('', ['nickName']),
  document: pathOr('', ['cnpj'])
})
const buildUser = applySpec({
  name: pathOr('', ['responsible']),
  email: pathOr('', ['email']),
  password: pathOr('', ['password']),
  firstAccess: () => false
})

const buildPayload = applySpec({
  company: buildCompany,
  user: buildUser
})

const Register = ({ history }) => {
  const [loading, setLoading] = useState(false)

  const handleClickContinue = async (formData) => {
    setLoading(true)
    try {
      await createCompany(buildPayload(formData))

      setLoading(false)
      history.push('/register/sucess')
    } catch (err) {
      setLoading(false)
      history.push('/register/sucess')
    }
  }

  return (
    <RegisterContainer
      handleClickContinue={handleClickContinue}
      loading={loading}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(Register)
