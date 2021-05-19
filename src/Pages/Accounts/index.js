import React, { useState, useEffect } from 'react'
import AccountsContainer from '../../Containers/Accounts'
import { getAllAccountML } from '../../Services/ML'

const appId = process.env.REACT_APP_APP_ID_ML
const uri = process.env.REACT_APP_URI_ML
const url = `http://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${appId}&redirect_uri=${uri}`

const Accounts = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [source, setSource] = useState([])
  
  useEffect(() => {
    getAllAccount()
  }, [page])

  const getAllAccount = async () => {
    await setLoading(true)
    
    try {
      const {data} = await getAllAccountML()
      setSource(data)
    } catch (error) {}

    await setLoading(false)
  }

  const goToMl = () => {
    window.open(url)
  }

  const onChangeTable = ({ current }) => {
    setPage(current)
  }

  return (
    <AccountsContainer
      onChangeTable={onChangeTable}
      goToMl={goToMl}
      source={source}
      loading={loading}
      page={page}
    />
  )
}

export default Accounts
