import React from 'react'
import styles from '../style.module.css'
import { Row, Col, Card, Image, Typography } from 'antd'

import Mira from './mira.svg'
import Security from './security.svg'
import Monitoramento from './monitoramento.svg'

const { Paragraph } = Typography
const { Title } = Typography

const Welcome = () => {
  return (
    <Card
      style={{
        background: '#F2F2F3'
      }}>
      <Title level={2} className={styles.textTitle}>
        Vamos te ajudar a começar a utilizar o sistema de gestão!
      </Title>
      <Paragraph className={styles.textWelcome}>
        Mas antes precisamos de algumas informações sua, para isso será
        necessário que você preencha o formulário a seguir!
      </Paragraph>
      <Row>
        <Col span={3}>
          <Image
            preview={false}
            width={32}
            src={Mira}
            style={{ margin: '30px 0 0 0' }}
          />
        </Col>
        <Col span={21}>
          <Title level={4} className={styles.textDoc}>
            Documentação
          </Title>
          <Paragraph className={styles.textWelcome}>
            Vamos precisar que você preencha com algumas informações suas.
          </Paragraph>
        </Col>
      </Row>

      <Row>
        <Col span={3}>
          <Image
            preview={false}
            width={32}
            src={Security}
            style={{ margin: '30px 0 0 0' }}
          />
        </Col>
        <Col span={21}>
          <Title level={4} className={styles.textDoc}>
            Segurança
          </Title>
          <Paragraph className={styles.textWelcome}>
          Precisamos que você crie uma senha para que você tenha mais
            segurança.
          </Paragraph>
        </Col>
      </Row>

      <Row>
        <Col span={3}>
          <Image
            preview={false}
            width={32}
            src={Monitoramento}
            style={{ margin: '30px 0 0 0' }}
          />
        </Col>
        <Col span={21}>
          <Title level={4} className={styles.textDoc}>
            Monitoramento da sua jornada
          </Title>
          <Paragraph className={styles.textWelcome}>
            Estaremos acompanhando a evolução do seu negócio com a gente, assim
            podemos no futuro oferecer as melhores soluções.
          </Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default Welcome
