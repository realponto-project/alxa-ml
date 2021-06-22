import React, { useEffect, useState } from 'react'
import { compose, isNil, length, map, pathOr } from 'ramda'
import { Form, message } from 'antd'
import { connect } from 'react-redux'

import ManagerContainer from '../../../Containers/Ads/Manager'
import { getAll, getCusmtomerById, updateAds } from '../../../Services/Ads'
import {
  getAllAccounts,
  getLoaderAdsByMlAccountId,
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
  const [formLoadAd] = Form.useForm()
  const [formValues, setFormValues] = useState({})
  const [modalSyncIsVisible, setModalSyncIsVisible] = useState(false)
  const [modalUpdatePriceIsVisible, setModalUpdatePriceIsVisible] = useState(
    false
  )
  const [calcs, setCalcs] = useState([])

  const getAllAds = async () => {
    setLoading(true)

    try {
      const { data } = await getAll({ ...formValues, order, page, limit })
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

  const handleSubmitSync = async ({
    mlAccountId,
    lastSyncAds = '1990-01-01T00:00:00'
  }) => {
    if (!mlAccountId) return
    setLoading(true)

    getLoaderAdsByMlAccountId(mlAccountId, {
      tokenFcm,
      date: new Date(lastSyncAds)
    })
      .then((response) => {
        setModalSyncIsVisible(false)
        setLoading(false)
        if (response.status === 200) {
          message.info(
            <p>
              Pode demorar um tempo até que os anúncios sejam carregados,
              <br />
              será enviado uma notificação assim que for concluído
            </p>
          )
        }
      })
      // eslint-disable-next-line node/handle-callback-err
      .catch((err) => setLoading(false))
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

  const closeModalSync = () => {
    formLoadAd.resetFields()
    setModalSyncIsVisible(false)
  }

  const handleSubmitUpdatePrice = ({ rows, calcPriceId }) => {
    updateAds({ rows, calcPriceId, tokenFcm })
    setModalUpdatePriceIsVisible(false)
  }

  const handleClickUpdate = () => {
    updateAdsByAccount(formSearch.getFieldValue('account'))
  }

  useEffect(() => {
    getAllAds()
  }, [page, formValues, order])

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
      formLoadAd={formLoadAd}
      accounts={accounts}
      closeModalAdd={closeModalAdd}
      expand={expand}
      formAdd={formAdd}
      formSearch={formSearch}
      handleClearForm={handleClearForm}
      handleClickEdit={handleClickEdit}
      handleClickExpand={handleClickExpand}
      handleSubmitForm={handleSubmitForm}
      handleSubmitSync={handleSubmitSync}
      loading={loading}
      modelTitle={isNil(id) ? 'Cadastro cliente' : 'Atualizar cliente'}
      modalSyncIsVisible={modalSyncIsVisible}
      onChangeTable={onChangeTable}
      openModalAdd={() => setVisibleModalAdd(true)}
      source={source}
      limit={limit}
      visibleModalAdd={visibleModalAdd}
      opneModalSync={() => setModalSyncIsVisible(true)}
      closeModalSync={closeModalSync}
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
