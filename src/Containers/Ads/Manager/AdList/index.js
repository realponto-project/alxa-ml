import React from 'react'
import { Table, Tag } from 'antd'
import { mlStatus } from '../../../../utils/orderStatus'
import { join, pipe, split } from 'ramda'

const TagUpdateStatus = ({ status }) => {
  const color = {
    updated: 'green',
    unupdated: 'orange',
    waiting_update: 'blue',
    error: 'red',
    not_update: 'purple',
  }[status]

  const value = {
    updated: 'Atualizado',
    unupdated: 'Desatualizado',
    waiting_update: 'Aguardoando atualização',
    error: 'Erro ao atualizar',
    not_update: 'Não deve atualizar',
  }[status]

  return <Tag color={color}>{value}</Tag>
}

const TagStatus = ({ status }) => {
  const color = {
    active: 'green',
    payment_required: 'red',
    under_review: 'orange',
    paused: 'blue',
    closed: 'red'
  }[status]

  const value = mlStatus[status]

  return <Tag color={color}>{value}</Tag>
}
const columns = ({ handleClickEdit }) => [
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    fixed: 'left',
    sorter: true
  },
  {
    title: 'Código',
    dataIndex: 'item_id',
    key: 'item_id',
    fixed: 'left'
    // render: pipe(split('-'),join('\n'))
  },
  {
    title: 'Descrição',
    dataIndex: 'title',
    key: 'title',
    fixed: 'left',
    sorter: true
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    fixed: 'left',
    render: (price) =>
      price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    sorter: true
  },
  {
    title: 'Preço ML',
    dataIndex: 'price_ml',
    key: 'price_ml',
    fixed: 'left',
    render: (price) =>
      price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    sorter: true
  },
  {
    title: 'Status de atualização',
    dataIndex: 'update_status',
    align: 'center',
    fixed: 'left',
    render: (update_status) => {
      return <TagUpdateStatus status={update_status} />
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    align: 'center',
    render: (status) => <TagStatus status={status} />
  }
]

const expandedRowRender = (record) => {
  const columns = [
    { title: 'Departamento', dataIndex: 'department', key: 'department' },
    { title: 'cause_id', dataIndex: 'cause_id', key: 'cause_id' },
    { title: 'Tipo', dataIndex: 'type', key: 'type' },
    { title: 'Código', dataIndex: 'code', key: 'code' },
    {
      title: 'Referência',
      dataIndex: 'references',
      key: 'references',
      render: join('\n')
    },
    { title: 'Mensagem', dataIndex: 'message', key: 'message' }
  ]

  console.log(record.logErrors)
  return (
    <Table columns={columns} dataSource={record.logErrors} pagination={false} />
  )
}

const AdList = ({
  datasource,
  handleClickEdit,
  loading,
  onChangeTable,
  pagination
}) => {
  return (
    <Table
      pagination={pagination}
      onChange={onChangeTable}
      columns={columns({ handleClickEdit })}
      loading={loading}
      dataSource={datasource}
      expandable={{
        expandedRowRender,
        rowExpandable: (record) => record.logErrors.length > 0
      }}
    />
  )
}

export default AdList
