import React, { useState } from 'react'
import { Button, Table, Tag, Tooltip } from 'antd'
import { join } from 'ramda'
import {
  AreaChartOutlined,
  BulbTwoTone,
  EditOutlined,
  SyncOutlined
} from '@ant-design/icons'

import { mlStatus } from '../../../../utils/orderStatus'

const TagUpdateStatus = ({ status }) => {
  const color = {
    updated: 'green',
    unupdated: 'orange',
    unupdated_alxa: 'gold',
    waiting_update: 'blue',
    error: 'red',
    not_update: 'purple'
  }[status]

  const value = {
    updated: 'Atualizado',
    unupdated: 'Desatualizado',
    unupdated_alxa: 'Desatualizado Alxa',
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
    closed: 'red',
    inactive: 'default'
  }[status]

  const value = mlStatus[status]

  return <Tag color={color}>{value}</Tag>
}
const columns = ({
  handleClickEdit,
  handleClickGraphc,
  toggleActive,
  handleSyncPrice
}) => [
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
    title: 'Preço de custo',
    dataIndex: 'costPrice',
    width: 170,
    key: 'costPrice',
    render: (costPrice) =>
      costPrice?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
  },
  {
    title: 'Frete',
    dataIndex: 'shippingCost',
    width: 170,
    key: 'shippingCost',
    render: (shippingCost) =>
      shippingCost?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
  },
  {
    title: 'Preço final',
    dataIndex: 'price',
    key: 'price',
    width: 170,
    render: (price, { id, price_ml }) => {
      const [spin, setSpin] = useState(false)

      return (
        <>
          {price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
          {price !== price_ml && (
            <Tooltip title="Clique duas vezes para atualizar com o preço que está no mercado livre">
              <Button
                type="link"
                onDoubleClick={() =>
                  handleSyncPrice({ setSpin, sync: 'price', id })
                }>
                <SyncOutlined spin={spin} />
              </Button>
            </Tooltip>
          )}
        </>
      )
    },
    sorter: true
  },
  {
    title: 'Preço ML',
    dataIndex: 'price_ml',
    width: 170,
    key: 'price_ml',
    render: (price_ml, { id, price, active }) => {
      const [spin, setSpin] = useState(false)

      return (
        <>
          {price_ml.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
          {price !== price_ml && (
            <Tooltip title="Clique duas vezes para atualizar com o preço que está no alxa">
              <Button
                disabled={!active}
                type="link"
                onDoubleClick={() =>
                  handleSyncPrice({ setSpin, sync: 'price_ml', id })
                }>
                <SyncOutlined spin={spin} />
              </Button>
            </Tooltip>
          )}
        </>
      )
    },
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
    key: 'id-graphic',
    width: 100,
    align: 'center',
    render: (id) => (
      <Button type="link">
        <AreaChartOutlined onClick={() => handleClickGraphc(id)} />
      </Button>
    )
  },
  {
    title: 'Ativo',
    dataIndex: 'active',
    key: 'active',
    width: 100,
    align: 'center',
    render: (active, { id }) => (
      <Tooltip title="Clique dua vezes para alterar">
        <Button type="link">
          <BulbTwoTone
            twoToneColor={active ? '#52c41a' : '#b5b5b5'}
            onDoubleClick={() => toggleActive(id)}
            onClick={() => {}}
          />
        </Button>
      </Tooltip>
    )
  },
  {
    title: 'Editar',
    key: 'id-edit',
    fixed: 'right',
    width: 100,
    align: 'center',
    render: (_, record) => (
      <Button
        disabled={!record.active}
        type="link"
        onClick={() => handleClickEdit(record)}>
        <EditOutlined />
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
  pagination,
  toggleActive,
  handleSyncPrice
}) => {
  return (
    <Table
      scroll={{ x: 2140 }}
      pagination={pagination}
      onChange={onChangeTable}
      columns={columns({
        handleClickEdit,
        handleClickGraphc,
        toggleActive,
        handleSyncPrice
      })}
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
