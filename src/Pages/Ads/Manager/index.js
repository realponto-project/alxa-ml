import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  applySpec,
  compose,
  isEmpty,
  isNil,
  map,
  path,
  pathOr,
  pipe
} from 'ramda'
import { Form } from 'antd'

import ManagerContainer from '../../../Containers/Ads/Manager'
import {
  getAll,
  getCusmtomerById,
  createCustomer,
  updateCustomer
} from '../../../Services/Customer'
import {
  buildAddCustomer,
  buildFormValuesCustomer
} from '../../../utils/Specs/Customer'

const Manager = ({
  cleanCustomerSearch,
  customerSearch,
  setCustomerSearch
}) => {
  const [loading, setLoading] = useState(false)
  const [expand, setExpand] = useState(false)
  const [formAdd] = Form.useForm()
  const [id, setId] = useState()
  const [source, setSource] = useState([])
  const [visibleModalAdd, setVisibleModalAdd] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(10)

  useEffect(() => {
    getAllCustomers()
  }, [page])

  const getAllCustomers = async () => {
    const value = customerSearch.search_name_or_document

    setLoading(true)

    let query = {}

    if (!isEmpty(value)) {
      query = {
        name: value,
        document: value.replace(/\D/g, '')
      }
    }

    try {
      const { data } = await getAll({ ...query, page, limit: 10 })
      setSource(data.source)
      setTotal(data.total)
    } catch (error) {}

    setLoading(false)
  }

  const onChangeTable = ({current}) => {
    setPage(current)
  }

  const onChangeSearch = ({ target }) => {
    setCustomerSearch({ search_name_or_document: target.value })
  }

  const clearFilters = () => {
    cleanCustomerSearch()
  }

  const closeModalAdd = () => {
    setId()
    setExpand(false)
    setVisibleModalAdd(false)
    formAdd.resetFields()
  }

  const handleClickExpand = () => setExpand(!expand)

  const handleSubmitAdd = async (formData) => {
    setLoading(true)
    const customerValues = buildAddCustomer(expand)(formData)
    try {
      if (isNil(id)) {
        await createCustomer(customerValues)
      } else {
        await updateCustomer({ ...customerValues, id })
      }

      getAllCustomers()
      closeModalAdd()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error(err)

      const errors = pathOr([], ['response', 'data', 'errors'], err)

      formAdd.setFields(
        map(
          applySpec({
            errors: pipe(path(['message']), Array),
            name: pipe(path(['field']), Array)
          }),
          errors
        )
      )
    }
  }

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

  const handleFilter = () => {
    if(page !== 1){
      setPage(1)
    } else {
      getAllCustomers()
    }
  }

  return (
    <ManagerContainer
      clearFilters={clearFilters}
      closeModalAdd={closeModalAdd}
      expand={expand}
      filters={customerSearch}
      formAdd={formAdd}
      handleClickEdit={handleClickEdit}
      handleClickExpand={handleClickExpand}
      handleFilter={handleFilter}
      handleSubmitAdd={handleSubmitAdd}
      modelTitle={isNil(id) ? 'Cadastro cliente' : 'Atualizar cliente'}
      onChangeSearch={onChangeSearch}
      openModalAdd={() => setVisibleModalAdd(true)}
      source={source}
      visibleModalAdd={visibleModalAdd}
      loading={loading}
      onChangeTable={onChangeTable}
      total={total}
      page={page}
    />
  )
}

const mapStateToProps = ({ customerSearch }) => ({
  customerSearch
})

const mapDispatchToProps = (dispatch) => ({
  setCustomerSearch: (payload) =>
    dispatch({ type: 'SET_CUSTOMER_GLOBAL_SEARCH', payload }),
  cleanCustomerSearch: () => dispatch({ type: 'CLEAN_CUSTOMER_GLOBAL_SEARCH' })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(Manager)
