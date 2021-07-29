import React from 'react'
import { join } from 'ramda'
import { Button, Table, Tag } from 'antd'
import { AreaChartOutlined, EditOutlined } from '@ant-design/icons'

import { mlStatus } from '../../../../utils/orderStatus'

const TagUpdateStatus = ({ status }) => {
  const color = {
    updated: 'green',
    unupdated: 'orange',
    waiting_update: 'blue',
    error: 'red',
    not_update: 'purple'
  }[status]

  const value = {
    updated: 'Atualizado',
    unupdated: 'Desatualizado',
    waiting_update: 'Aguardando atualização',
    error: 'Erro ao atualizar',
    not_update: 'Não deve atualizar'
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
const columns = ({ handleClickEdit, handleClickGraphc }) => [
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
    width: 180,
    key: 'item_id'
    // render: pipe(split('-'),join('\n'))
  },
  {
    title: 'Descrição',
    dataIndex: 'title',
    width: 450,
    key: 'title',
    sorter: true
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    render: (price) =>
      price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    sorter: true
  },
  {
    title: 'Preço ML',
    dataIndex: 'price_ml',
    key: 'price_ml',
    render: (price) =>
      price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    sorter: true
  },
  {
    title: 'Status de atualização',
    dataIndex: 'update_status',
    width: 180,
    align: 'center',
    render: (update_status) => {
      return <TagUpdateStatus status={update_status} />
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 180,
    align: 'center',
    render: (status) => <TagStatus status={status} />
  },
  {
    title: 'Gráfico',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    align: 'center',
    render: (id) => (
      <Button type="link">
        <AreaChartOutlined onClick={() => handleClickGraphc(id)} />
      </Button>
    )
  },
  {
    title: 'Editar',
    // dataIndex: 'id',
    // key: 'id',
    fixed: 'right',
    width: 100,
    align: 'center',
    render: (_, record) => (
      <Button type="link">
        <EditOutlined onClick={() => handleClickEdit(record)} />
      </Button>
    )
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
    {
      title: 'Mensagem',
      dataIndex: 'message',
      key: 'message',
      render: (_, { messagePt, message }) => {
        return messagePt || message
      }
    }
  ]

  return (
    <Table columns={columns} dataSource={record.logErrors} pagination={false} />
  )
}

const AdList = ({
  datasource,
  handleClickEdit,
  handleClickGraphc,
  loading,
  onChangeTable,
  pagination
}) => {
  return (
    <Table
      scroll={{ x: 1500 }}
      pagination={pagination}
      onChange={onChangeTable}
      columns={columns({ handleClickEdit, handleClickGraphc })}
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
