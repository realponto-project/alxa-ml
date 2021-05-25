import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { adjust, compose, findIndex, merge, propEq, split } from 'ramda'
import { useLocation } from 'react-router-dom'

import AccountsContainer from '../../Containers/Accounts'
import { getAllAccountML, refreshToken } from '../../Services/ML'

import { connect } from 'react-redux'
import { adjust, compose, findIndex, merge, propEq } from 'ramda'
import { createAccountService } from '../../Services/Link'
import { getAllAccountML, refreshToken } from '../../Services/ML'

const appId = process.env.REACT_APP_APP_ID_ML
const uri = process.env.REACT_APP_URI_ML
const url = `http://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${appId}&redirect_uri=${uri}`

const Accounts = ({ setToken }) => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [source, setSource] = useState([])
  const [modalSuccessLinkIsVisible, setModalSuccessLinkIsVisible] = useState(
    false
  )
  const [source, setSource] = useState([])
  const location = useLocation()
  

  const getAllAccount = async () => {
    await setLoading(true)

    try {
      const { data } = await getAllAccountML()
      setSource(data)
    } catch (error) {}

    await setLoading(false)
  }

  const updateToken = async (id) => {
    const index = findIndex(propEq('id', id))(source)
    setSource(adjust(index, merge({ loading: true }), source))
    try {
      const { data } = await refreshToken(id)

      setToken({ token: data })
      getAllAccount()
    } catch (error) {
      console.error('Erro ao atualizar token')
    }
    setSource(adjust(index, merge({ loading: false }), source))
  }

  const goToMl = () => {
    window.open(url)
  }

  const onChangeTable = ({ current }) => {
    setPage(current)
  }

  useEffect(() => {
    const createAccount = async () => {
      const {
        status,
        data: { token }
      } = await createAccountService({ code })

      if (status === 201) {
        setModalSuccessLinkIsVisible(true)
        setToken({ token })
      }
    }

    const [, code] = split('=', location.search)
    if (code) {
      createAccount()
    }
  }, [])

  return (
    <AccountsContainer
      onChangeTable={onChangeTable}
      goToMl={goToMl}
      source={source}
      loading={loading}
      page={page}
      updateToken={updateToken}
      modalSuccessLinkIsVisible={modalSuccessLinkIsVisible}
      handleCancelModalSuccessLink={() => setModalSuccessLinkIsVisible(false)}
      updateToken={updateToken}
      modalSuccessLinkIsVisible={modalSuccessLinkIsVisible}
      handleCancelModalSuccessLink={() => setModalSuccessLinkIsVisible(false)}
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  setToken: (payload) => dispatch({ type: 'USER_LOGGED', payload })
})

const enhanced = compose(connect(null, mapDispatchToProps))

export default enhanced(Accounts)
