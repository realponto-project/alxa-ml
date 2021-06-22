import React from 'react'
import { Button, Col, Form, Image, Input, Row, Typography } from 'antd'

import pass from '../../../Assets/pass.svg'
import logo from '../../../Assets/logo.svg'
import styles from './style.module.css'

import { validateEmail } from '../../../utils/validators'

const { Paragraph } = Typography
const rules = [{ required: true }]

const ForgotPass = ({handleSubmit, loading, sucess, goToLogin}) => {
  return (
    <Row gutter={10} style={{ height: '100vh', margin: 0 }} align="middle">
      <Col span={16}>
        <div className={styles.contentPublicity}>
          <Row style={{ height: '100%' }} align="center" justify="middle">
            <Col>
              <Row justify="center" gutter={[0, 80]}>
                <Image width={362} src={pass} preview={false} />
              </Row>
              <Row justify="center">
                <h1 className={styles.title}>Esqueceu sua senha?</h1>
              </Row>
              <Row justify="center">
                <Col span={16}>
                  <Paragraph style={{ textAlign: 'center' }}>
                    Solicite a recuperação da sua senha nos informando seu email!
                  </Paragraph>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>

      {!sucess ? 
      <Col span={8}>
        <Row justify="center" gutter={[0, 87]}>
          <Image width={160} src={logo} preview={false} />
        </Row>

        <Row justify="center">
          <Col span={20}>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="E-mail" name="email" rules={[
                    ...rules,
                    { validator: (_, value) => validateEmail(value) }
                  ]}>
                <Input placeholder="Insira seu email"/>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  type="primary"
                  loading={loading}
                  style={{ width: '100%', marginTop: '10px' }}>
                  Solicitar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col> : 
      <Col span={8} align="center">
        <Row justify="center" gutter={[0, 87]}>
          <Image width={160} src={logo} preview={false} />
        </Row>

        <Row justify="center">
          <Col span={20} align="center">
            <Paragraph>Prontinho! Em alguns instantes você receberá 
            um email com as instruções para redefinir sua senha.</Paragraph>
          </Col>
        </Row>
        <Button
          size="large"
          type="primary"
          style={{ width: '70%', marginTop: '20px'}}
          onClick={goToLogin}
          >
          Ir para login
        </Button>
      </Col>}
      
    </Row>
  )
}

export default ForgotPass
