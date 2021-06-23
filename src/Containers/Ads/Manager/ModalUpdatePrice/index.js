import React, { useEffect, useRef, useState } from 'react'
import { isEmpty, isNil, map, pathOr } from 'ramda'
import readXlsxFile from 'read-excel-file'
import { Button, Modal, Select } from 'antd'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'

const { Option } = Select

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

const MyUploadXlsx = ({ reference, handleChange, filename, loading }) => (
  <>
    <label
      htmlFor="upload-xlsx"
      className={`ant-btn ${loading && 'ant-btn-loading'}`}>
      <UploadOutlined /> Importar planilha para atualizar preços
      {loading && <LoadingOutlined />}
    </label>
    <input
      ref={reference}
      id="upload-xlsx"
      type="file"
      style={{ display: 'none' }}
      onChange={handleChange}
    />
    <p>{filename}</p>
  </>
)

const ModalLoadAds = ({ visible, close, onSubmit, calcs }) => {
  const inputEl = useRef(null)
  const [rows, setRows] = useState([])
  const [calcPriceId, setCalcPriceId] = useState()
  const [filename, setFilename] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangeUpload = () => {
    setLoading(true)
    setFilename('')
    readXlsxFile(inputEl.current.files[0], { schema })
      .then(function ({ rows }) {
        const name = pathOr('', ['current', 'files', '0', 'name'], inputEl)

        setLoading(false)
        setRows(rows)
        setFilename(name)
      })
      .catch((err) => console.error('err', err))
  }

  const handelOk = () => {
    if (isEmpty(rows) || isNil(calcPriceId)) return

    onSubmit({ rows, calcPriceId })
  }

  useEffect(() => {
    setRows([])
    setCalcPriceId()
    setFilename('')
    setLoading(false)
  }, [visible])

  return (
    <Modal
      visible={visible}
      onCancel={close}
      title={'Carregar anúncios'}
      footer={[
        <Button key="cancel" onClick={close}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handelOk}>
          Atualizar
        </Button>
      ]}>
      <MyUploadXlsx
        filename={filename}
        reference={inputEl}
        handleChange={handleChangeUpload}
        loading={loading}
      />
      <Select
        placeholder="Selecione uma fórmula:"
        allowClear
        rules={[{ required: true }]}
        onChange={setCalcPriceId}
        value={calcPriceId}
        style={{ width: '100%' }}>
        {map(
          ({ name, id }) => (
            <Option key={id} value={id}>
              {name}
            </Option>
          ),
          calcs
        )}
      </Select>
    </Modal>
  )
}

export default ModalLoadAds
