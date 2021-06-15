import React from 'react'
import { Table } from 'antd'
import { map } from 'ramda'

const columns = [
  {
    title: 'Conta',
    dataIndex: 'fullname',
    key: 'fullname',
    fixed: 'left'
  }
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
