import React from 'react'
import { Button, Form, Input, Modal, Row } from 'antd'
import { isEmpty, isNil, map } from 'ramda'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import getAddress from '../../../Services/Address'
import { customerMask } from '../../../utils/Masks'
import { cpf, cnpj } from 'cpf-cnpj-validator'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]

const cnpjAndCpfIsInvalid = (value) =>
  !(isEmpty(value) || isNil(value)) &&
  !cpf.isValid(value) &&
  !cnpj.isValid(value)

const customerFormItemsList = [
  {
    label: 'Nome do cliente',
    name: 'name',
    placeholder: 'Insira a razão social',
    rules
  },
  {
    label: 'Nome Fantasia',
    name: 'socialName',
    placeholder: 'Insira o nome fantasia'
  },
  {
    label: 'CNPJ/CPF',
    name: 'document',
    placeholder: 'Insira o documento',
    rules: [
      {
        validator: async (_, value) => {
          if (cnpjAndCpfIsInvalid(value)) {
            return Promise.reject(new Error('Valor inválido'))
          }
        }
      }
    ]
  },
  { label: 'Telefone', name: 'phone', placeholder: 'Insira o telefone' }
]

const addressFormItemsList = [
  { label: 'CEP', name: 'zipcode', placeholder: 'Insira o cep', rules },
  { label: 'UF', name: 'state', placeholder: 'Insira o uf', rules },
  { label: 'Cidade', name: 'city', placeholder: 'Insira a cidade', rules },
  {
    label: 'Bairro',
    name: 'neighborhood',
    placeholder: 'Insira o bairro',
    rules
  },
  { label: 'Logradouro', name: 'street', placeholder: 'Insira a rua', rules },
  {
    label: 'Número',
    name: 'streetNumber',
    placeholder: 'Insira o número',
    rules
  },
  {
    label: 'Complemento',
    name: 'complementary',
    placeholder: 'Insira o complemento'
  },
  {
    label: 'Referência',
    name: 'reference',
    placeholder: 'Insira o ponto de referência'
  }
]

const renderFormItems = ({ label, name, rules, placeholder }) => {
  return (
    <Form.Item key={name} label={label} name={name} rules={rules}>
      <Input name={name} placeholder={placeholder} />
    </Form.Item>
  )
}

const Add = ({
  expand,
  form,
  handleCancel,
  handleClickExpand,
  handleSubmit,
  loading,
  title,
  visible
}) => {
  const getFieldAddress = async ({ target }) => {
    const { name, value } = customerMask(target)

    try {
      if (name === 'zipcode' && value.length === 9) {
        const zipcode = await getAddress(value)
        form.setFieldsValue(zipcode)
      }
    } catch (error) {
      console.error(error)
    }

    form.setFields([
      {
        name,
        errors: [],
        value
      }
    ])
  }
  return (
    <Modal
      centered={true}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          loading={loading}
          onClick={() => form.submit()}
          type="primary">
          Salvar
        </Button>
      ]}
      onCancel={handleCancel}
      title={title}
      visible={visible}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={handleSubmit}
        validateTrigger="onBlur"
        onChange={getFieldAddress}>
        {map(renderFormItems, customerFormItemsList)}

        <Row justify="end">
          <a onClick={handleClickExpand}>
            {expand ? <MinusOutlined /> : <PlusOutlined />} Endereço
          </a>
        </Row>

        {expand ? map(renderFormItems, addressFormItemsList) : null}
      </Form>
    </Modal>
  )
}

export default Add
