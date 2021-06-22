import React, { useEffect, useState } from 'react'
import {
  Table,
  Button,
  Empty,
  ConfigProvider,
  Image,
  Switch,
  Tooltip
} from 'antd'
import { map, pipe } from 'ramda'
import NoData from '../../../../Assets/noData.svg'
import { MailOutlined } from '@ant-design/icons'

const isDisabled = ({ countTokenSended, lastTokenDate }) => {
  const timeHasPassedMs = new Date() - new Date(lastTokenDate)
  const timeForPremissionNextSendMs = 300000 * countTokenSended // 5 minutes multiply by count

  return timeHasPassedMs < timeForPremissionNextSendMs
}

const formatCount = (count) => {
  if (count <= 0) return ''

  const countSeconds = Math.floor(count / 1000) % 60
  const countMinutes = Math.floor(count / 60000)

  const formatToString = pipe(String, (value) => value.padStart(2, '0'))

  const countFormated = `${formatToString(countMinutes)}:${formatToString(
    countSeconds
  )}`

  return countFormated
}

const renderColumnMail = ({ handleClickMail }) => (
  _,
  { firstAccess, activated, id, countTokenSended, lastTokenDate }
) => {
  if (firstAccess && activated) {
    const [conut, setConut] = useState(0)

    const timeForPremissionNextSendMs = 300000 * countTokenSended // 5 minutes multiply by count

    useEffect(() => {
      const countTime = setInterval(() => {
        const timeHasPassedMs = new Date() - new Date(lastTokenDate)
        setConut(timeForPremissionNextSendMs - timeHasPassedMs)
      }, 1000)

      return () => clearInterval(countTime)
    }, [])

    return (
      <Tooltip title={formatCount(conut)}>
        <Button
          type="link"
          disabled={isDisabled({ countTokenSended, lastTokenDate })}
          onClick={() => handleClickMail(id)}
          icon={<MailOutlined />}
        />
      </Tooltip>
    )
  }
}

const columns = ({ chooseUser, handleSubmitUpdate, handleClickMail }) => [
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (__, record) => (
      <Switch
        style={{
          width: '70px',
          backgroundColor: record.activated ? '#65A300' : 'rgba(0,0,0,.25)'
        }}
        checkedChildren="Ativo"
        unCheckedChildren="Inativo"
        checked={record.activated}
        onChange={(activated) =>
          handleSubmitUpdate({ activated, id: record.id })
        }
      />
    )
  },
  {
    title: 'Usuário',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    fixed: 'left'
  },
  {
    title: 'Documento',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
    render: (text) =>
      text
        .replace(/([^x|X|\d])/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\w)/, '$1-$2')
        .replace(/(-\w{1})\d+?$/, '$1')
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      <Button
        type="link"
        onClick={() => chooseUser(record)}
        disabled={!record.activated}>
        Editar
      </Button>
    )
  },
  {
    title: '',
    dataIndex: 'firstAccess',
    fixed: 'left',
    render: renderColumnMail({ handleClickMail }),
    width: 32
  }
]

const UserList = ({
  datasource,
  chooseUser,
  loading,
  onChangeTable,
  total,
  page,
  handleSubmitUpdate,
  handleClickMail
}) => {
  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          description="Não há dados"
          image={<Image width={85} src={NoData} preview={false} />}
        />
      )}>
      <Table
        pagination={{ total, current: page }}
        onChange={onChangeTable}
        columns={columns({ chooseUser, handleSubmitUpdate, handleClickMail })}
        loading={loading}
        dataSource={map(
          (dataArray) => ({ ...dataArray, key: dataArray.id }),
          datasource
        )}
      />
    </ConfigProvider>
  )
}

export default UserList
