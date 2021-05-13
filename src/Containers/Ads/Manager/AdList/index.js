import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image, Progress } from 'antd'
import {map} from 'ramda'
import NoData from '../../../../Assets/noData.svg'

const columns = ({ handleClickEdit }) => [
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    fixed: 'left',
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
    render: () => (<Progress percent={100} steps={3}  strokeColor="#52c41a" format={value => 3} />)
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left'
  },
]

const data = [{
  item_id: 'MLB1278896773',
  sku: 'C-320510',
  title: 'Placa S.al. 12x12 Inflamavel C320510',
  price: 8.89,
  status: 'activated'
},
{
  item_id: 'MLB1278896774',
  sku: 'C-320512',
  title: 'Placa S.al. 12x12 Inflamavel C320510',
  price: 12.89,
  status: 'activated'
}]


const AdList = ({ datasource, handleClickEdit, loading, onChangeTable, total, page}) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
      description="Não há dados" 
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ total, current: page }}
        onChange={onChangeTable}
        columns={columns({ handleClickEdit })} 
        loading={loading} 
        dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), data)} />
    </ConfigProvider>
  )
}

export default AdList
