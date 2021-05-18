import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Typography, Input } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import AccountList from './AccountList'
import ModalSuccessLink from '../../Components/Links/sucessLink'
import { useLocation } from 'react-router-dom'
import { createAccountService } from '../../Services/Link'
import { split } from 'ramda'

const { Title } = Typography

const Accounts = ({ onChangeTable, goToMl, loading, page, match }) => {
  const [modalSuccessLinkIsVisible, setModalSuccessLinkIsVisible] = useState(
    false
  )
  const location = useLocation()

  useEffect(() => {
    const createAccount = async () => {
      const { status } = await createAccountService({ code })

      if (status === 201) {
        setModalSuccessLinkIsVisible(true)
      }
    }

    const [, code] = split('=', location.search)
    if (code) {
      createAccount()
    }
  }, [])

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Vincule novas contas
              </Title>
              <p style={{ marginBottom: 0 }}>
                Vincule suas novas contas e gerencie aqui
              </p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button icon={<PlusOutlined />} onClick={() => goToMl()}>
                Vincular conta
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={18}>
              <Input
                placeholder="Filtre por conta"
                prefix={<SearchOutlined />}
                name="name"
                // value={filters.name}
                // onChange={handleOnChange}
              />
            </Col>

            <Col span={6} style={{ textAlign: 'right' }}>
              <Button
                style={{ marginRight: '16px' }}
                // onClick={clearFilters}
              >
                Limpar filtros
              </Button>
              <Button
                type="primary"
                // onClick={handleGetUsersByFilters}
              >
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <AccountList
            onChangeTable={onChangeTable}
            loading={loading}
            page={page}
          />
        </Card>
      </Col>

      <ModalSuccessLink
        handleCancel={() => setModalSuccessLinkIsVisible(false)}
        isVisible={modalSuccessLinkIsVisible}
      />
    </Row>
  )
}
export default Accounts
