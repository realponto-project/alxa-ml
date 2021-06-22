import React, { useState } from 'react'
import { Image, Typography, Button, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'
import styles from './style.module.css'
import Box from './box.svg'
import Plan from '../../Containers/Plans'

const { Title } = Typography

const AdBanner = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleCancel = () => {
    setIsVisible(false)
  }

  return (
    <div className={styles.adBannerContainer}>
      <Row>
        <Plan isVisible={isVisible} handleCancel={handleCancel} />
        <Col span={8}>
          <Title level={4}>Gestão completa!</Title>
          <p>
            Acesso completo e ilimitado, gerencie seu
            <b> estoque </b>
            de formar <b>fácil!</b>
          </p>
          <Button onClick={() => setIsVisible(true)} type="primary">
            Assine agora <b> R$9,99/mês</b>
          </Button>
        </Col>
        <Col
          span={16}
          style={{
            textAlign: 'right',
            position: 'relative',
            top: '5px'
          }}>
          <Image width={300} src={Box} preview={false} />
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(AdBanner)
