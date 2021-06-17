import React from 'react'
import { Table, Progress, Tag } from 'antd'
import { mlStatus } from '../../../../utils/orderStatus'
import { gte } from 'ramda'

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
  
  return <Tag color={color} >{value}</Tag>
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
    fixed: 'left',
    render: (
      update_status,
    ) => {
      return (
        <TagUpdateStatus status={update_status} />
      )
    }
  },
  // {
  //   title: 'Progresso',
  //   dataIndex: 'mercado_libre_account_ads.id',
  //   fixed: 'left',
  //   render: (
  //     _,
  //     { totalAccountAd, typeSyncTrue, mercado_libre_account_ads }
  //   ) => {
  //     return (
  //       <Progress
  //         percent={(typeSyncTrue / totalAccountAd) * 100}
  //         steps={totalAccountAd}
  //         strokeColor="#52c41a"
  //         format={() => `${typeSyncTrue}/${totalAccountAd}`}
  //       />
  //     )
  //   }
  // },
  {
    title: 'Status',
    dataIndex: 'status',
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
