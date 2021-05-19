import React from 'react'
import { Table } from 'antd'
import { map } from 'ramda'

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
  },
]

const AccountList = ({ datasource, loading, onChangeTable, page}) => {
  return <Table 
            pagination={{ current: page }}
            onChange={onChangeTable}
            columns={columns(updateToken)} 
            loading={loading} 
            dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource)} />
    }

export default AccountList
