import React from 'react'
import { Button, Card, Col, Input, Row, Typography, Select, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { keys, map } from 'ramda'

import AdList from './AdList'
import { mlStatus, updateStatus } from '../../../utils/orderStatus'
import ModaaUpdatePrices from './ModalUpdatePrice'
import ModalUpdateAds from './ModalUpdateAds'

const { Title } = Typography
const { Option } = Select

const Manager = ({
  handleClickEdit,
  loading,
  source,
  onChangeTable,
  accounts,
  formSearch,
  formUpdateAds,
  handleClearForm,
  handleSubmitForm,
  closeModalUpdateAd,
  calcs,
  pagination,
  modalUpdatePriceIsVisible,
  closeModalUpdatePrice,
  openModalUpdatePrice,
  handleClickUpdate,
  handleSubmitUpdatePrice,
  modalUpdateAdsIsVisible,
  handleSubmitUpdateAd,
  handelSyncPrice
}) => {
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
              <Row gutter={[0, 8]} justify="end">
                <Col span={24}>
                  <Button style={{ width: 200 }} onClick={openModalUpdatePrice}>
                    Atualizar preços
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Form
            layout="vertical"
            form={formSearch}
            initialValues={{
              status: '',
              update_status: ''
            }}
            onFinish={handleSubmitForm}>
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <Form.Item name="account" label="Conta">
                  <Select style={{ width: '100%' }}>
                    {map(
                      ({ fullname, id }) => (
                        <Option key={id} value={id}>
                          {fullname}
                        </Option>
                      ),
                      accounts
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="update_status" label="Status de atualização">
                  <Select style={{ width: '100%' }}>
                    <Option value="">Todos</Option>
                    {map(
                      (key) => (
                        <Option key={key} value={key}>
                          {updateStatus[key]}
                        </Option>
                      ),
                      keys(updateStatus)
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ paddingTop: '5px' }}>
                <Form.Item name="status" label="Status">
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
          <Row justify="end">
            <Button
              type="link"
              disabled={
                formSearch.getFieldValue('update_status') === 'not_update'
              }
              onClick={handleClickUpdate}>
              Atualizar
            </Button>
          </Row>
          <AdList
            handelSyncPrice={handelSyncPrice}
            onChangeTable={onChangeTable}
            datasource={source}
            handleClickEdit={handleClickEdit}
            loading={loading}
            pagination={pagination}
          />
        </Card>
      </Col>

      <ModalUpdateAds
        visible={modalUpdateAdsIsVisible}
        form={formUpdateAds}
        handleClose={closeModalUpdateAd}
        handleSubmit={handleSubmitUpdateAd}
      />

      <ModaaUpdatePrices
        visible={modalUpdatePriceIsVisible}
        close={closeModalUpdatePrice}
        onSubmit={handleSubmitUpdatePrice}
        calcs={calcs}
      />
    </Row>
  )
}

export default Manager
