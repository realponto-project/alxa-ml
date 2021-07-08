import React, { useEffect, useState } from 'react'
import { compose, isNil, length, map, pathOr } from 'ramda'
import { Form } from 'antd'
import { connect } from 'react-redux'

import ManagerContainer from '../../../Containers/Ads/Manager'
import { getAll, getCusmtomerById, updateAds } from '../../../Services/Ads'
import {
  getAllAccounts,
  updateAdsByAccount
} from '../../../Services/mercadoLibre'
import { getAllCalcPrice } from '../../../Services/CalcPrice'
import { buildFormValuesCustomer } from '../../../utils/Specs/Customer'

const Manager = ({ tokenFcm }) => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [expand, setExpand] = useState(false)
  const [formAdd] = Form.useForm()
  const [id, setId] = useState()
  const [source, setSource] = useState([])
  const [visibleModalAdd, setVisibleModalAdd] = useState(false)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(10)
  const [formSearch] = Form.useForm()
  const [formValues, setFormValues] = useState({})
  const [modalUpdatePriceIsVisible, setModalUpdatePriceIsVisible] = useState(
    false
  )
  const [calcs, setCalcs] = useState([])

  const getAllAds = async () => {
    setLoading(true)

    try {
      const { data } = await getAll({
        ...formValues,
        order,
        page,
        limit
      })

      setSource(map((item) => ({ ...item, key: item.id }), data.source))
      setTotal(data.total)
    } catch (error) {}

    setLoading(false)
  }

  const onChangeTable = ({ current, pageSize }, _, sorter, { action }) => {
    const formatOrder = {
      descend: 'DESC',
      ascend: 'ASC'
    }

    if (limit !== pageSize) {
      setLimit(pageSize)
      setPage(1)
    }

    if (action === 'sort') {
      setOrder(
        sorter.order ? [[sorter.columnKey, formatOrder[sorter.order]]] : []
      )
      setPage(1)
    } else {
      setPage(current)
    }
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

  const handleSubmitUpdatePrice = ({ rows, calcPriceId }) => {
    updateAds({ rows, calcPriceId, tokenFcm })
    setModalUpdatePriceIsVisible(false)
  }

  const handleClickUpdate = () => {
    formSearch.submit()
    updateAdsByAccount(formSearch.getFieldValue('account'), {
      query: formValues,
      tokenFcm
    })
  }

  useEffect(() => {
    getAllAds()
  }, [page, formValues, order, limit])

  useEffect(() => {
    getAllAccounts().then(({ data }) => {
      setAccounts(data)
      if (length(data) > 0) {
        formSearch.setFieldsValue({ account: data[0]?.id })
        setFormValues({ account: data[0]?.id })
      }
    })

    getAllCalcPrice().then(({ data }) =>
      setCalcs([...data, { name: '=', id: '' }])
    )
  }, [])

  return (
    <ManagerContainer
      pagination={{ total, current: page, pageSize: limit }}
      accounts={accounts}
      closeModalAdd={closeModalAdd}
      expand={expand}
      formAdd={formAdd}
      formSearch={formSearch}
      handleClearForm={handleClearForm}
      handleClickEdit={handleClickEdit}
      handleClickExpand={handleClickExpand}
      handleSubmitForm={handleSubmitForm}
      loading={loading}
      modelTitle={isNil(id) ? 'Cadastro cliente' : 'Atualizar cliente'}
      onChangeTable={onChangeTable}
      openModalAdd={() => setVisibleModalAdd(true)}
      source={source}
      limit={limit}
      visibleModalAdd={visibleModalAdd}
      calcs={calcs}
      modalUpdatePriceIsVisible={modalUpdatePriceIsVisible}
      closeModalUpdatePrice={() => setModalUpdatePriceIsVisible(false)}
      openModalUpdatePrice={() => setModalUpdatePriceIsVisible(true)}
      handleSubmitUpdatePrice={handleSubmitUpdatePrice}
      handleClickUpdate={handleClickUpdate}
    />
  )
}

const mapStateToProps = ({ tokenFcm }) => ({
  tokenFcm
})

const enhanced = compose(connect(mapStateToProps))

export default enhanced(Manager)
