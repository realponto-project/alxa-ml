import React from 'react'
import { Table, Tag, Button } from 'antd'
import { map } from 'ramda'

const columns = (chooseProduct) => [
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (text) => (
      <Tag color={text ? '#65A300' : '#DF285F'}>
        {text ? 'Ativo' : 'Inativo'}
      </Tag>
    )
  },
  {
    title: 'Descrição',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },

  {
    title: 'Qtd mínima',
    dataIndex: 'minQuantity',
    key: 'minQuantity',
    fixed: 'left'
  },
  {
    title: 'Qtd estoque',
    dataIndex: 'record.balance',
    key: 'balance',
    fixed: 'left',
    render: (_, record) => record.balance
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      <Button type="link" onClick={() => chooseProduct(record)}>
        Editar
      </Button>
    )
  }
]

const ProductList = ({ datasource, chooseProduct }) => {
  return <Table columns={columns(chooseProduct)} 
    dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource || [])}
  />
}

export default ProductList
