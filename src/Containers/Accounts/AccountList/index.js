import React from 'react'
import { Table, Empty, ConfigProvider, Image } from 'antd'
import {map} from 'ramda'
import NoData from '../../../Assets/noData.svg'
import { SyncOutlined } from '@ant-design/icons'

const columns = (updateToken) => [
  {
    title: 'Conta',
    dataIndex: 'fullname',
    key: 'fullname',
    fixed: 'left',
  },
  {
    title: 'Recarregar',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    render: (id, { loading = false, updatedAt}) => {
      if(new Date() - new Date(updatedAt) > 21600000)
        return <SyncOutlined spin={loading} style={loading ? { color: '#1980ff'} : {}} onClick={() => updateToken(id)}/>
    } 
  },
]

const AccountList = ({ datasource, loading, onChangeTable, page, updateToken}) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
      description="Não há dados" 
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ current: page }}
        onChange={onChangeTable}
        columns={columns(updateToken)} 
        loading={loading} 
        dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource)} />
    </ConfigProvider>
  )
}

export default AccountList
