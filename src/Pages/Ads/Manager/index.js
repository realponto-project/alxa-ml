import React, { useEffect, useState } from 'react'
import { isNil, length, pathOr } from 'ramda'
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
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(10)
  const [mlAccountId, setMlAccountId] = useState('')
  const [formSearch] = Form.useForm()
  const [formValues, setFormValues] = useState({})

  const getAllAds = async () => {
    setLoading(true)

    try {
      const { data } = await getAll({ ...formValues, order, page, limit: 10 })
      console.log(data)
      setSource(data.source)
      setTotal(data.total)
    } catch (error) {}

    setLoading(false)
  }

  const onChangeTable = ({ current }, _, { order, columnKey }) => {
    const formatOrder = {
      descend: 'DESC',
      ascend: 'ASC'
    }

    setOrder(order ? [[columnKey, formatOrder[order]]] : [])
    setPage(current)
  }

  const closeModalAdd = () => {
    setId()
    setExpand(false)
    setVisibleModalAdd(false)
    setOrder([])
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

  const handleClearForm = () => {
    formSearch.resetFields()
    setPage(1)
    setFormValues({ account: accounts[0]?.id })
    formSearch.setFieldsValue({ account: accounts[0]?.id })
  }

  const handleSubmitForm = (formData) => {
    setPage(1)
    setFormValues(formData)
  }

  useEffect(() => {
    getAllAds()
  }, [page, formValues, order])

  useEffect(() => {
    getAllAccounts().then(({ data }) => {
      setAccounts(data)
      if (length(data) > 0) {
        formSearch.setFieldsValue({ account: data[0]?.id })
        setFormValues({ account: accounts[0]?.id })
      }
    })
  }, [])

  return (
    <ManagerContainer
      formSearch={formSearch}
      handleClearForm={handleClearForm}
      handleSubmitForm={handleSubmitForm}
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
      mlAccountId={mlAccountId}
    />
  )
}

export default Manager
