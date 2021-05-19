import React, { useEffect, useState } from 'react'
import { isNil, pathOr } from 'ramda'
import { Form } from 'antd'

import ManagerContainer from '../../../Containers/Ads/Manager'
import { getAll, getCusmtomerById } from '../../../Services/Ads'
import {
  getAllAccounts,
  getLoaderAdsByMlAccountId
} from '../../../Services/mercadoLibre'
import { buildFormValuesCustomer } from '../../../utils/Specs/Customer'

const Manager = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [expand, setExpand] = useState(false)
  const [formAdd] = Form.useForm()
  const [id, setId] = useState()
  const [source, setSource] = useState([])
  const [visibleModalAdd, setVisibleModalAdd] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(10)
  const [mlAccountId, setMlAccountId] = useState('')

  const getAllAds = async () => {
    setLoading(true)

    try {
      const { data } = await getAll({ page, limit: 10 })
      console.log(data)
      setSource(data.source)
      setTotal(data.total)
    } catch (error) {}

    setLoading(false)
  }

  const onChangeTable = ({ current }) => {
    setPage(current)
  }

  const closeModalAdd = () => {
    setId()
    setExpand(false)
    setVisibleModalAdd(false)
    formAdd.resetFields()
  }

  const handleClickExpand = () => setExpand(!expand)

  const handleClickEdit = async (id) => {
    try {
      setId(id)
      const { status, data } = await getCusmtomerById(id)

      if (status !== 200) throw new Error('Customer not found')

      setExpand(!isNil(pathOr(null, ['address'], data)))
      setVisibleModalAdd(true)
      formAdd.setFieldsValue(buildFormValuesCustomer(data))
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmitSync = async () => {
    if (!mlAccountId) return

    getLoaderAdsByMlAccountId(mlAccountId).then((response) => {
      console.log(response)
    })
  }

  useEffect(() => {
    getAllAds()
  }, [page])

  useEffect(() => {
    getAllAccounts().then(({ data }) => setAccounts(data))
  }, [])

  return (
    <ManagerContainer
      closeModalAdd={closeModalAdd}
      expand={expand}
      formAdd={formAdd}
      handleClickEdit={handleClickEdit}
      handleClickExpand={handleClickExpand}
      modelTitle={isNil(id) ? 'Cadastro cliente' : 'Atualizar cliente'}
      openModalAdd={() => setVisibleModalAdd(true)}
      source={source}
      visibleModalAdd={visibleModalAdd}
      loading={loading}
      onChangeTable={onChangeTable}
      total={total}
      page={page}
      accounts={accounts}
      handleSubmitSync={handleSubmitSync}
      handleChangeAccount={(id) => setMlAccountId(id)}
    />
  )
}

export default Manager
