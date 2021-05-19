import React, { useRef, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Typography,
  Checkbox,
  Select,
  Modal
} from 'antd'
import { SearchOutlined, UploadOutlined } from '@ant-design/icons'
import readXlsxFile from 'read-excel-file'
import { map } from 'ramda'

import AdList from './AdList'

const CheckboxGroup = Checkbox.Group
const { Title } = Typography
const { Option } = Select
const plainOptions = ['Ativo', 'Inativo']

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

const MyUploadXlsx = ({ reference }) => (
  <>
    <label htmlFor="upload-xlsx" className="ant-btn">
      <UploadOutlined /> importar planilha para atualizar preços
    </label>
    <input
      ref={reference}
      id="upload-xlsx"
      type="file"
      style={{ display: 'none' }}
      onChange={() => {
        readXlsxFile(reference.current.files[0], { schema }).then(function ({
          rows,
          errors
        }) {
          const skuList = []
          const priceList = []

          console.log('erros', errors)
          console.log('rows', rows)
          rows.forEach(({ sku, price }) => {
            skuList.push(sku)
            priceList.push(price)
          })
          console.log({ skuList, priceList })
        })
      }}
    />
  </>
)

const Manager = ({
  handleClickEdit,
  loading,
  source,
  onChangeTable,
  total,
  page,
  accounts,
  handleChangeAccount,
  handleSubmitSync
}) => {
  const [modalSyncIsVisible, setModalSyncIsVisible] = useState(false)
  const inputEl = useRef(null)
  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Atualize e transmita seus anúncios
              </Title>
              <p style={{ marginBottom: 0 }}>
                Importe sua planilha com os valores atualizados
              </p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Row>
                <MyUploadXlsx reference={inputEl} />
              </Row>
              <Row>
                <Button onClick={() => setModalSyncIsVisible(true)}>
                  Carregar meus anúncios
                </Button>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={14}>
              <Input
                name="search_name_or_document"
                placeholder="Filtre por sku ou descrição"
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={4} style={{ paddingTop: '5px' }}>
              <CheckboxGroup
                options={plainOptions}
                // onChange={(value) =>
                //   handleOnChange({ target: { name: 'activated', value } })
                // }
              />
            </Col>
            <Col span={6} style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: '16px' }}>Limpar filtros</Button>
              <Button type="primary">Filtrar</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <AdList
            onChangeTable={onChangeTable}
            datasource={source}
            total={total}
            handleClickEdit={handleClickEdit}
            loading={loading}
            page={page}
          />
        </Card>
      </Col>

      <Modal
        visible={modalSyncIsVisible}
        title={'Caregar anúncios'}
        onCancel={() => setModalSyncIsVisible(false)}
        onOk={handleSubmitSync}>
        <Title level={5}>
          Selecione a conta que os anúncios serão carregados
        </Title>
        <Select
          allowClear
          onChange={handleChangeAccount}
          style={{ width: '100%' }}>
          {map(
            ({ fullname, id }) => (
              <Option value={id}>{fullname}</Option>
            ),
            accounts
          )}
        </Select>
      </Modal>
    </Row>
  )
}

export default Manager
