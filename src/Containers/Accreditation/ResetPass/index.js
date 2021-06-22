import React from 'react'
import { Button, Col, Form, Image, Input, Row, Typography } from 'antd'

import resetPass from '../../../Assets/resetPass.svg'
import logo from '../../../Assets/logo.svg'
import styles from './style.module.css'

const { Paragraph } = Typography

const validatorPassword = (passwordPropName, shouldBeEqual = false) => ({
  getFieldValue
}) => {
  const validator = (rule, value) => {
    if (shouldBeEqual) {
      if (!value || getFieldValue(passwordPropName) === value) {
        return Promise.resolve()
      }
      return Promise.reject('Senhas não coincidem!')
    }

    if (value && getFieldValue(passwordPropName) === value) {
      return Promise.reject(
        'A sua nova senha deve ser diferente da sua senha antiga!'
      )
    }
    return Promise.resolve()
  }

  return { validator }
}

const ResetPass = ({ handleSubmit, loading, sucess, goToLogin }) => {
  return (
    <Row gutter={10} style={{ height: '100vh', margin: 0 }} align="middle">
      <Col span={16}>
        <div className={styles.contentPublicity}>
          <Row style={{ height: '100%' }} align="center" justify="middle">
            <Col>
              <Row justify="center" gutter={[0, 80]}>
                <Image width={362} src={resetPass} preview={false} />
              </Row>
              <Row justify="center">
                <h1 className={styles.title}>Redefinir senha</h1>
              </Row>
              <Row justify="center">
                <Col span={16}>
                  <Paragraph style={{ textAlign: 'center' }}>
                    Nos informe a sua nova senha para que seja feita a redefinição da mesma e para que possamos estar sempre juntos.
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
                <Form.Item
                  style={{ marginBottom: '20px' }}
                  label="Nova senha"
                  name="newPassword"
                  rules={[
                    validatorPassword('password', false),
                    { required: true, message: 'Campo obrigatório!' }
                  ]}>
                  <Input.Password placeholder="Insira sua nova senha" />
                </Form.Item>

                <Form.Item
                  label="Confirmar senha"
                  name="confirmPassword"
                  rules={[
                    validatorPassword('newPassword', true),
                    { required: true, message: 'Campo obrigatório!' }
                  ]}>
                  <Input.Password placeholder="Confirme sua senha" />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    size="large"
                    type="primary"
                    loading={loading}
                    style={{ width: '100%', marginTop: '10px' }}>
                    Redefinir
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
              <Paragraph>Sua senha foi alterada com sucesso.</Paragraph>

              <Paragraph>Caso você não tenha efetuado essa mudança, nos informe imeditamente no email suporte@alxa.com.br.</Paragraph>
            </Col>
          </Row>
          <Button
            size="large"
            type="primary"
            style={{ width: '70%', marginTop: '20px' }}
            onClick={goToLogin}
          >
            Ir para login
        </Button>
        </Col>}

    </Row>
  )
}

export default ResetPass
