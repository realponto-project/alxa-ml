import React, {useState, useEffect} from 'react'
import AccountsContainer from '../../Containers/Accounts'

const appId = process.env.REACT_APP_APP_ID_ML
const uri = process.env.REACT_APP_URI_ML
const url = `http://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${appId}&redirect_uri=${uri}`

const Accounts = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    falseLoading()
  }, [page])

  const falseLoading = async () => {
    await setLoading(true)

    await setLoading(false)
  }

  const goToMl = () => {
    window.open(url)
    console.log(url)
  }

  const onChangeTable = ({current}) => {
    setPage(current)
  }

  return (
    <AccountsContainer 
      onChangeTable={onChangeTable}
      goToMl={goToMl}
      loading={loading}
      page={page}
    />
  )
}

export default Accounts
