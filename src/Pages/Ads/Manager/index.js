import React, { useEffect, useState } from 'react'
import { compose, forEach, isNil, length, map, pathOr, propOr } from 'ramda'
import { Form, message } from 'antd'
import { connect } from 'react-redux'

import ManagerContainer from '../../../Containers/Ads/Manager'
import { getAll, updateAds, updateAd, syncPrice } from '../../../Services/Ads'
import {
  getAllAccounts,
  updateAdsByAccount
} from '../../../Services/mercadoLibre'
import { getAllCalcPrice } from '../../../Services/CalcPrice'
import { getAllChangePrice } from '../../../Services/ChangePrice'

const Manager = ({ tokenFcm }) => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [expand, setExpand] = useState(false)
  const [formAdd] = Form.useForm()
  const [formUpdateAds] = Form.useForm()
  const [id, setId] = useState()
  const [source, setSource] = useState([])
  const [visibleModalAdd, setVisibleModalAdd] = useState(false)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(10)
  const [formSearch] = Form.useForm()
  const [formValues, setFormValues] = useState({})
  const [modalGraphcIsVisible, setModalGraphcIsVisible] = useState(false)
  const [modalUpdateAdsIsVisible, setModalUpdateAdsIsVisible] = useState(false)
  const [modalUpdatePriceIsVisible, setModalUpdatePriceIsVisible] = useState(
    false
  )
  const [calcs, setCalcs] = useState([])
  const [rowsChangePrice, setRowsChangePrice] = useState([])
  const [adChoosed, setAdChoosed] = useState()

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

  const handleClickEdit = async (record) => {
    setAdChoosed(record)
    formUpdateAds.setFieldsValue(record)
    setModalUpdateAdsIsVisible(true)
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

  const closeModalUpdateAd = () => {
    setModalUpdateAdsIsVisible(false)
    formUpdateAds.resetFields()
  }

  const handleSubmitUpdateAd = (values) => {
    const id = propOr('', 'id', adChoosed)
    setLoading(true)

    updateAd(id, values)
      .then(() => {
        getAllAds()
        setModalUpdateAdsIsVisible(false)
        message.success('O anúncio foi atualizado com sucesso')
        setLoading(false)
      })
      .catch((err) => {
        const causes = pathOr([], ['response', 'data', 'data', 'cause'], err)
        forEach((cause) => {
          message.error(cause.message)
        }, causes)
        setLoading(false)
      })
  }

  const handleSyncPrice = async (values) => {
    const { setSpin, id, sync } = values

    setSpin(true)
    try {
      await syncPrice(id, { sync })
      getAllAds()
      setSpin(false)
    } catch (error) {
      setSpin(false)
      console.error(error)
    }
  }

  const handleClickGraphc = async (mercadoLibreAdId) => {
    try {
      const { data } = await getAllChangePrice({ mercadoLibreAdId })

      setRowsChangePrice(data)
    } catch (error) {
      console.error(error)
    }

    setModalGraphcIsVisible(true)
  }

  return (
    <ManagerContainer
      pagination={{ total, current: page, pageSize: limit }}
      handleSubmitUpdateAd={handleSubmitUpdateAd}
      accounts={accounts}
      closeModalAdd={closeModalAdd}
      expand={expand}
      formAdd={formAdd}
      formUpdateAds={formUpdateAds}
      closeModalUpdateAd={closeModalUpdateAd}
      formSearch={formSearch}
      handleClearForm={handleClearForm}
      handleClickEdit={handleClickEdit}
      handleClickGraphc={handleClickGraphc}
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
      modalUpdateAdsIsVisible={modalUpdateAdsIsVisible}
      closeModalUpdatePrice={() => setModalUpdatePriceIsVisible(false)}
      openModalUpdatePrice={() => setModalUpdatePriceIsVisible(true)}
      handleSubmitUpdatePrice={handleSubmitUpdatePrice}
      handleClickUpdate={handleClickUpdate}
      handleSyncPrice={handleSyncPrice}
      modalGraphcIsVisible={modalGraphcIsVisible}
      handelCancel={() => setModalGraphcIsVisible(false)}
      rowsChangePrice={rowsChangePrice}
    />
  )
}

const mapStateToProps = ({ tokenFcm }) => ({
  tokenFcm
})

const enhanced = compose(connect(mapStateToProps))

export default enhanced(Manager)
