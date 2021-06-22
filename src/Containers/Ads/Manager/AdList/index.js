import React from 'react'
import { Table, Tag } from 'antd'
import { mlStatus } from '../../../../utils/orderStatus'

const TagUpdateStatus = ({ status }) => {
  const color = {
    updated: 'lime',
    unupdated: 'orange',
    waiting_update: 'blue',
    error: 'red'
  }[status]

  const value = {
    updated: 'Atualizado',
    unupdated: 'Desatualizado',
    waiting_update: 'Aguardoando atualização',
    error: 'Erro ao atualizar'
  }[status]

  return <Tag color={color}>{value}</Tag>
}

const TagStatus = ({ status }) => {
  const color = {
    active: 'lime',
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
    />
  )
}

export default AdList
