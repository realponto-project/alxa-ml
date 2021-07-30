import React from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { keys, map } from 'ramda'

const { Title, Text } = Typography

const titleWorker = (workerName) => {
  const title = {
    notification: 'Notficação do  Mercado Livre',
    updateAdsOnDB: 'Atualização no Alxa',
    ads: 'Carregar anúncio no Alxa',
    instance: 'Atualização no Mercado Livre'
  }[workerName]

  return title || workerName
}

const translateProperty = (propName) => {
  const resp = {
    waiting: 'Aguardando:',
    active: 'Ativo:',
    completed: 'Completo',
    failed: 'Falhou',
    delayed: 'Atrasado',
    paused: 'Pausado'
  }[propName]

  return resp || propName
}

const Manager = ({ queues }) => {
  return (
    <Row gutter={[8, 16]}>
      {map((key) => {
        const queue = queues[key]
        return (
          <Col span={8}>
            <Card bordered={false}>
              <Title level={4}>{titleWorker(key)}</Title>

              {map(
                (key) => (
                  <Row justify="space-between">
                    <Text>{translateProperty(key)}</Text>
                    <Text>{queue[key]}</Text>
                  </Row>
                ),
                keys(queue)
              )}
            </Card>
          </Col>
        )
      }, keys(queues))}
    </Row>
  )
}

export default Manager
