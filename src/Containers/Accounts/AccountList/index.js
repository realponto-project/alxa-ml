import React from 'react'
import { Table } from 'antd'
import { map } from 'ramda'
import moment from 'moment'

const columns =  [
  {
    title: 'Conta',
    dataIndex: 'fullname',
    key: 'fullname',
    fixed: 'left',
  },
  {
    title: 'Última atualização',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (updatedAt) => moment(updatedAt).format('DD/MM/YYYY HH:mm')
  },
]

const AccountList = ({ datasource, loading, onChangeTable, page }) => {
  return (
    <Table
      pagination={{ position: [] }}
      onChange={onChangeTable}
      columns={columns}
      loading={loading}
      dataSource={map(
        (dataArray) => ({ ...dataArray, key: dataArray.id }),
        datasource
      )}
    />
  )
}

export default AccountList
