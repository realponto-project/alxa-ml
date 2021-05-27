import React from 'react'
import { Table, Progress, Tooltip } from 'antd'
import { mlStatus } from '../../../../utils/orderStatus'
import { gte } from 'ramda'

const formatUpdateStatus = (status) =>
  ({
    updated: 'Atualizado',
    unupdated: 'Desatualizado',
    waiting_update: 'Aguardoando atualização',
    error: 'Erro ao atualizar'
  }[status])

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
    title: 'Progresso',
    dataIndex: 'mercado_libre_account_ads.update_status',
    fixed: 'left',
    render: (
      update_status,
      { totalAccountAd, typeSyncTrue, mercado_libre_account_ads }
    ) => {
      return (
        <Tooltip title={formatUpdateStatus(update_status)}>
          <Progress
            percent={(typeSyncTrue / totalAccountAd) * 100}
            steps={totalAccountAd}
            strokeColor="#52c41a"
            format={() => `${typeSyncTrue}/${totalAccountAd}`}
          />
        </Tooltip>
      )
    }
  },
  {
    title: 'Status',
    dataIndex: 'mercado_libre_account_ads.status',
    key: 'status',
    fixed: 'left',
    render: (status) => mlStatus[status]
  }
]

const AdList = ({
  datasource,
  handleClickEdit,
  loading,
  onChangeTable,
  total,
  page
}) => {
  return (
    <Table
      pagination={{ total, current: page }}
      onChange={onChangeTable}
      columns={columns({ handleClickEdit })}
      loading={loading}
      dataSource={datasource}
    />
  )
}

export default AdList
