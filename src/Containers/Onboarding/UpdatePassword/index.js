/* eslint-disable prefer-promise-reject-errors */
import React from 'react'
import styles from '../style.module.css'
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd'

const { Title } = Typography
const { Paragraph } = Typography

const UpdatePass = ({ onEdit, loading, setLoading }) => {
  const [form] = Form.useForm()

  return (
    <>
      <Title level={1} className={styles.textTitleForm}>
        Crie sua senha
      </Title>
      <Card
        style={{
          background: '#FFFFFF'
        }}>
        <Row justify="end">
          <Col>
            <Paragraph className={styles.textPessoalData}>
              Dados de segurança
            </Paragraph>
          </Col>
        </Row>
        <Form
          name="form_update_password_onboarding"
          layout="vertical"
          form={form}
          onFinish={() => {
            setLoading(true)
            form
              .validateFields()
              .then((values) => {
                form.resetFields()
                onEdit(values)
              })
              .catch((info) => {
                setLoading(false)
                console.log('Validate Failed:', info)
              })
          }}>
          <Form.Item
            label="Senha"
            name="newPassword"
            rules={[{ required: true, message: 'Campo obrigatório' }]}>
            <Input.Password placeholder="Insira sua senha atual" />
          </Form.Item>
        </Form>
      </Card>
      <Button
        form="form_update_password_onboarding"
        key="submit"
        htmlType="submit"
        loading={loading}
        type="primary"
        className={styles.buttonLetsGo}>
        Concluir
      </Button>
    </>
  )
}

export default UpdatePass
