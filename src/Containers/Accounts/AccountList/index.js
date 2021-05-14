import React from 'react'
import { Table, Empty, ConfigProvider, Image, Progress } from 'antd'
import {map} from 'ramda'
import NoData from '../../../Assets/noData.svg'

const columns = () => [
  {
    title: 'Conta',
    dataIndex: 'account',
    key: 'account',
    fixed: 'left',
  },
]

const data = [{
  account: 'LMS FERRAMENTAS SBC',
},
{
  account: 'SÃO BERNARDO DO CAMPO FERRAMENTAS',
},]


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
        dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), data)} />
    </ConfigProvider>
  )
}

export default AccountList
