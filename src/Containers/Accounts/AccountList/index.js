import React from 'react'
import { Table, Empty, ConfigProvider, Image } from 'antd'
import {map} from 'ramda'
import NoData from '../../../Assets/noData.svg'

const columns = () => [
  {
    title: 'Conta',
    dataIndex: 'fullname',
    key: 'fullname',
    fixed: 'left',
  },
]

const AccountList = ({ datasource, loading, onChangeTable, page}) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
      description="Não há dados" 
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ current: page }}
        onChange={onChangeTable}
        columns={columns()} 
        loading={loading} 
        dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource)} />
    </ConfigProvider>
  )
}

export default AccountList
