import React from 'react'
import { Row, Col, Modal, Image } from 'antd'

import Winners from '../../Assets/winners.svg'
import styles from './style.module.css'

const SucessLink = ({ isVisible, handleCancel }) => {
  return (
    <Modal
      onCancel={handleCancel}
      visible={isVisible}
      width={400}
      footer={null}>
      <Row justify="center">
        <Col span={24}>
          <Row justify="center">
            <Image width={250} src={Winners} alt="winner" preview={false} />
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center">
            <h2 className={styles.title}>Parabéns</h2>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center">
            <p className={styles.text}>sua conta foi vinculada com sucesso!</p>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

export default SucessLink
