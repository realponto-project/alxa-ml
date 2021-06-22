import React from 'react'
import { Button, Col, Form, Image, Input, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

import onlineResume from '../../Assets/onlineResume.svg'
import logo from '../../Assets/alxaML.svg'
import styles from './style.module.css'

const { Paragraph } = Typography
const rules = [{ required: true, message: 'Campo obrigatório!' }]

const Login = ({
  authentication,
  isVisibleMessageError,
  loading,
  registerPath,
  forgotPassPath
}) => {
  const onFinish = (values) => {
    authentication(values)
  }

  return (
    <Row gutter={10} style={{ height: '100vh', margin: 0 }} align="middle">
      <Col span={16}>
        <div className={styles.contentPublicity}>
          <Row style={{ height: '100%' }} align="middle">
            <Col>
              <Row justify="center" gutter={[0, 80]}>
                <Image width={362} src={onlineResume} preview={false} />
              </Row>
              <Row justify="center">
                <h1 className={styles.title}>Conheça o alxa dashboard!</h1>
              </Row>
              <Row justify="center">
                <Col span={16}>
                  <Paragraph style={{ textAlign: 'center' }}>
                    Gestão de verdade para o seu négocio, fácil, rápido e preço
                    justo, com o alxa, você tem ao seu alcance, gestão de
                    clientes, produtos, pedidos e muito mais!
                  </Paragraph>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>

      <Col span={8}>
        <Row justify="center" gutter={[0, 87]}>
          <Image width={270} src={logo} preview={false} />
        </Row>

        <Row justify="center">
          <Col span={20}>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="E-mail" name="email" rules={rules}>
                <Input placeholder="Insira seu email"/>
              </Form.Item>
              <Form.Item label="Senha" name="password" rules={rules}>
                <Input.Password placeholder="Insira sua senha"/>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  type="primary"
                  style={{ width: '100%', marginTop: 10 }}>
                  Acessar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        {isVisibleMessageError && (
          <Row justify="center">
            <Paragraph style={{ textAlign: 'center', color: 'red' }}>
              E-mail ou senha incorretos. Confira-os.
            </Paragraph>
          </Row>
        )}

        <Row justify="center">
          <Paragraph style={{ textAlign: 'center' }}>
            Ainda não possui conta no alxa?
          </Paragraph>
        </Row>

        <Row justify="space-between">
          <Col span={12} align="center">
            <Link to={registerPath}>Cadastre-se agora</Link>
          </Col>
          <Col span={12}  align="center">
            <Link to={forgotPassPath}>Esqueceu sua senha?</Link>
          </Col>
        </Row>

      </Col>
    </Row>
  )
}

export default Login
