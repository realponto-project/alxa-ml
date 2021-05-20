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
  Form
} from 'antd'
import { SearchOutlined, UploadOutlined } from '@ant-design/icons'
import readXlsxFile from 'read-excel-file'
import { map } from 'ramda'

import AdList from './AdList'

const { Title } = Typography
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
        }) {
          const skuList = []
          const priceList = []
          rows.forEach(({ sku, price }) => {
            skuList.push(sku)
            priceList.push(price)
          })
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
}) => {
  const [modalSyncIsVisible, setModalSyncIsVisible] = useState(false)
  const inputEl = useRef(null)
  const [formSearch] = Form.useForm()

  const handleChangeForm = (values) => {
    const { name, value } = values
    
    formSearch.setFieldsValue({
      ...formSearch,
      [name]: value
    })
  
    console.log(values)
  }

  const clearForm = () => {
    formSearch.resetFields()
  }

  const onFinish = (values) => {
    console.log(values)
  }

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
                <MyUploadXlsx reference={inputEl} />
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
            initialValues={{status: ""}}
            onValuesChange={handleChangeForm}
            onFinish={onFinish}
          >
            <Row gutter={[8, 8]}>
              <Col span={14}>
                <Form.Item name="account" >
                  <Select
                    // onChange={handleChangeAccount}
                    defaultValue={accounts.length > 0 && accounts[0].id}
                    style={{ width: '100%' }}>
                    {map(
                      ({ fullname, id }) => (
                        <Option value={id}>{fullname}</Option>
                      ),
                      accounts
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10} style={{ paddingTop: '5px' }}>
                <Form.Item name="status" >
                  <Select
                    defaultValue=""
                    style={{ width: '100%' }}>
                    <Option value="">TODOS</Option>
                    <Option value="active">ATIVOS</Option>
                    <Option value="payment_required">PAGAMENTO REQUIRIDO</Option>
                    <Option value="under_review">SOB REVISÃO</Option>
                    <Option value="paused">PAUSADO</Option>
                    <Option value="closed">FECHADO</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={18} >
                <Form.Item name="ads" >
                  <Input
                    name="search_name_or_document"
                    placeholder="Filtre por sku ou descrição"
                    prefix={<SearchOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ textAlign: 'right' }}>
                <Form.Item>
                  <Button style={{ marginRight: '16px' }} onClick={clearForm}>Limpar filtros</Button>
                  <Button type="primary" htmlType="submit">Filtrar</Button>
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
          defaultValue={accounts.length > 0 && accounts[0].id }
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
