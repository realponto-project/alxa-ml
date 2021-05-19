import React from 'react'
import { Table, Empty, ConfigProvider, Image, Progress } from 'antd'
import NoData from '../../../../Assets/noData.svg'

const columns = ({ handleClickEdit }) => [
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    fixed: 'left'
  },
  {
    title: 'Descrição',
    dataIndex: 'title',
    key: 'title',
    fixed: 'left'
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    fixed: 'left'
  },
  {
    title: 'Progresso',
    dataIndex: '',
    key: 'price',
    fixed: 'left',
    render: () => (
      <Progress
        percent={100}
        steps={3}
        strokeColor="#52c41a"
        format={(value) => 3}
      />
    )
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left'
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
