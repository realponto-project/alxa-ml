import React from 'react'
import { Button, Col, Form, Input, InputNumber, Modal, Row, Switch } from 'antd'
import { length, lt, pipe, split } from 'ramda'

const ModalUpdateAds = ({
  visible,
  form,
  handleClose,
  handleSubmit,
  loading
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      title="Atualizar anúncio"
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}>
          Atualizar
        </Button>
      ]}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        defaultValue={{ title: '' }}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="SKU" name="sku">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Código" name="item_id">
              <Input readOnly />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Título" name="title">
              <Input
                readOnly={pipe(
                  split('-'),
                  length,
                  lt(1)
                )(form.getFieldValue('item_id') || '')}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Preço" name="price">
              <InputNumber
                style={{ width: '100%' }}
                step={0.01}
                min={0}
                formatter={(value) => Number(value).toFixed(2)}
                parser={(value) => Number(value.replace(/\D/gi, '')) / 100}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalUpdateAds
