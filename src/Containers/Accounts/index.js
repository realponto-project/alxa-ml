import React from 'react'
import { Row, Col, Card, Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import AccountList from './AccountList'
import ModalSuccessLink from '../../Components/Links/sucessLink'

const { Title } = Typography

const Accounts = ({
  onChangeTable,
  goToMl,
  loading,
  page,
  modalSuccessLinkIsVisible,
  handleCancelModalSuccessLink,
  source
}) => {
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
          <AccountList
            onChangeTable={onChangeTable}
            loading={loading}
            page={page}
            datasource={source}
          />
        </Card>
      </Col>

      <ModalSuccessLink
        handleCancel={handleCancelModalSuccessLink}
        isVisible={modalSuccessLinkIsVisible}
      />
    </Row>
  )
}
export default Accounts
