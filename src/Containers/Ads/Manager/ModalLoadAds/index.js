import { Button, DatePicker, Form, Modal, Select } from 'antd'
import React from 'react'
import moment from 'moment'
import { map } from 'ramda'

const { Option } = Select

const ModalLoadAds = ({ visible, close, form, onSubmit, accounts }) => {
  return (
    <Modal
      visible={visible}
      onCancel={close}
      title={'Caregar anúncios'}
      footer={[
        <Button key="cancel" onClick={close}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
      ]}>
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item
          name="mlAccountId"
          label="Selecione a conta que os anúncios serão carregados">
          <Select
            placeholder="Selecione uma conta"
            rules={[{ required: true }]}
            onChange={(_, { lastSyncAds }) =>
              form.setFieldsValue({
                lastSyncAds: lastSyncAds ? moment(lastSyncAds) : undefined
              })
            }
            style={{ width: '100%' }}>
            {map(
              ({ fullname, id, last_sync_ads }) => (
                <Option key={id} value={id} lastSyncAds={last_sync_ads}>
                  {fullname}
                </Option>
              ),
              accounts
            )}
          </Select>
        </Form.Item>

        <Form.Item name="lastSyncAds" label="Buscar até">
          <DatePicker allowClear />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalLoadAds
