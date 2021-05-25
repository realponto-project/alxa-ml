import React, { useRef, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Typography,
  Select,
  Modal,
  Form,
  Checkbox
} from 'antd'
import { SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { keys, map } from 'ramda'

import AdList from './AdList'
import { mlStatus } from '../../../utils/orderStatus'

const { Title } = Typography
const { Option } = Select

const MyUploadXlsx = ({ reference, handleChange }) => (
  <>
    <label htmlFor="upload-xlsx" className="ant-btn">
      <UploadOutlined /> importar planilha para atualizar preços
    </label>
    <input
      ref={reference}
      id="upload-xlsx"
      type="file"
      style={{ display: 'none' }}
      onChange={handleChange}
    />
  </>
)

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
  handleSubmitSync,
  formSearch,
  handleClearForm,
  handleSubmitForm,
  handleChangeUpload
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
              <Row justify="end">
                <MyUploadXlsx
                  reference={inputEl}
                  handleChange={() => handleChangeUpload(inputEl)}
                />
              </Row>
              <Row justify="end">
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
          <Form
            form={formSearch}
            initialValues={{ status: '', type_sync: [false, true] }}
            onFinish={handleSubmitForm}>
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <Form.Item name="account">
                  <Select style={{ width: '100%' }}>
                    {map(
                      ({ fullname, id }) => (
                        <Option value={id}>{fullname}</Option>
                      ),
                      accounts
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ paddingTop: '5px' }}>
                <Form.Item name="status">
                  <Select style={{ width: '100%' }}>
                    <Option value="">Todos</Option>
                    {map(
                      (key) => (
                        <Option key={key} value={key}>
                          {mlStatus[key]}
                        </Option>
                      ),
                      keys(mlStatus)
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="type_sync">
                  <Checkbox.Group>
                    <Checkbox value={true} style={{ lineHeight: '32px' }}>
                      Preço atualizado
                    </Checkbox>
                    <Checkbox value={false} style={{ lineHeight: '32px' }}>
                      Preço desatualizado
                    </Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </Col>

              <Col span={18}>
                <Form.Item name="searchGlobal">
                  <Input
                    allowClear
                    name="search_name_or_document"
                    placeholder="Filtre por sku ou descrição"
                    prefix={<SearchOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ textAlign: 'right' }}>
                <Form.Item>
                  <Button
                    style={{ marginRight: '16px' }}
                    onClick={handleClearForm}>
                    Limpar filtros
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Filtrar
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
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
