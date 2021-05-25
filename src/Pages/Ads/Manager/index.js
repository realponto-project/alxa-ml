import React, { useEffect, useState } from 'react'
import { isNil, length, pathOr } from 'ramda'
import { Form } from 'antd'
import readXlsxFile from 'read-excel-file'

import ManagerContainer from '../../../Containers/Ads/Manager'
import { getAll, getCusmtomerById } from '../../../Services/Ads'
import {
  getAllAccounts,
  getLoaderAdsByMlAccountId,
  updateAds
} from '../../../Services/mercadoLibre'
import { buildFormValuesCustomer } from '../../../utils/Specs/Customer'

const schema = {
  SKU: {
    prop: 'sku',
    type: String
  },
  PRICE: {
    prop: 'price',
    type: Number
  }
}

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
    setPage(order ? 1 : current)
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
      if (response.status === 200) {
        setVisibleModalAdd(false)
      }
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

  const handleChangeUpload = (reference) => {
    readXlsxFile(reference.current.files[0], { schema }).then(function ({
      rows
    }) {
      const skuList = []
      const priceList = []
      rows.forEach(({ sku, price }) => {
        skuList.push(sku)
        priceList.push(price)
      })

      updateAds({ skuList, priceList })
    })
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
      accounts={accounts}
      closeModalAdd={closeModalAdd}
      expand={expand}
      formAdd={formAdd}
      formSearch={formSearch}
      handleChangeAccount={(id) => setMlAccountId(id)}
      handleChangeUpload={handleChangeUpload}
      handleClearForm={handleClearForm}
      handleClickEdit={handleClickEdit}
      handleClickExpand={handleClickExpand}
      handleSubmitForm={handleSubmitForm}
      handleSubmitSync={handleSubmitSync}
      loading={loading}
      mlAccountId={mlAccountId}
      modelTitle={isNil(id) ? 'Cadastro cliente' : 'Atualizar cliente'}
      onChangeTable={onChangeTable}
      openModalAdd={() => setVisibleModalAdd(true)}
      page={page}
      source={source}
      total={total}
      visibleModalAdd={visibleModalAdd}
    />
  )
}

export default Manager
