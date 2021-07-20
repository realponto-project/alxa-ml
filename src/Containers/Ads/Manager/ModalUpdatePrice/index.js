import React, { useEffect, useRef, useState } from 'react'
import { isEmpty, isNil, map, pathOr } from 'ramda'
import readXlsxFile from 'read-excel-file'
import { Button, Modal, Select, message } from 'antd'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import * as yup from 'yup'

const { Option } = Select

const skuValue = {
  prop: 'sku',
  type: String
}

const priceValue = {
  prop: 'price',
  type: Number
}

const schema = {
  SKU: skuValue,
  sku: skuValue,
  Sku: skuValue,
  PRICE: priceValue,
  preço: priceValue,
  Preço: priceValue,
  price: priceValue
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
      accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
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

  const handleChangeUpload = (e) => {
    setLoading(true)
    setFilename('')
    const name = pathOr('', ['current', 'files', '0', 'name'], inputEl)

    readXlsxFile(inputEl.current.files[0], { schema })
      .then(async function ({ rows }) {
        console.log('rows', rows)

        const schemaRows = yup.array().of(
          yup.object().shape({
            sku: yup.string().required(),
            price: yup.number().required()
          })
        )

        if (await schemaRows.isValid(rows)) {
          setFilename(name)
          setRows(rows)
        } else {
          message.error('Arquivo inválido')
          if (inputEl.current) {
            inputEl.current.value = ''
          }
        }

        setLoading(false)
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

    if (inputEl.current) {
      inputEl.current.value = ''
    }
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
