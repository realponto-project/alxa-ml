import React from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Space,
  Typography
} from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import logo from '../../../Assets/logo.svg'
import allTheData from '../../../Assets/allTheData.svg'
import styles from './style.module.css'
import {
  validateCNPJ,
  validateEmail,
  validateNickName
} from '../../../utils/validators'

const { Title, Text, Paragraph } = Typography
const rules = [{ required: true, message: 'Este campo é obrigatório!' }]

const Register = ({ handleClickContinue, loading }) => (
  <Row>
    <Col span={16}>
      <div className={styles.contentPublicity}>
        <Image width={160} src={logo} preview={false} />
        <h1>Tenha mais controle na sua empresa com o alxa!</h1>
        <h4>Aproveite todas as nossa funcionalidades:</h4>
        <Space direction="vertical" style={{ margin: '0 0 170px 10px' }}>
          <Text>
            <CheckOutlined /> Gestão de estoque
          </Text>
          <Text>
            <CheckOutlined /> Controle de vendas
          </Text>
          <Text>
            <CheckOutlined /> Ponto de venda
          </Text>
          <Text>
            <CheckOutlined /> Controle de cliente
          </Text>
          <Text>
            <CheckOutlined /> Cupom não fiscal
          </Text>
        </Space>
        <Paragraph style={{ fontSize: '1.25em' }}>
          Finalize agora o seu cadastro e comece a gerenciar a sua empresa em
          poucos minutos.
        </Paragraph>
        <div className={styles.wrapperAllTheData}>
          <Image src={allTheData} preview={false} width={'100%'} />
        </div>
      </div>
    </Col>

    <Col span={8}>
      <div className={styles.contentForm}>
        <Row
          style={{
            height: '100%'
          }}
          align="middle">
          <Col span={24}>
            <Form
              validateTrigger="onBlur"
              layout="vertical"
              onFinish={(formData) => handleClickContinue(formData)}>
              <Card bordered={false}>
                <Title level={4}>Dados da Empresa</Title>
                <Form.Item
                  rules={rules}
                  name="razaoSocial"
                  label="Nome da empresa">
                  <Input placeholder="Insira o nome da empresa" />
                </Form.Item>
                <Form.Item
                  rules={[
                    ...rules,
                    { validator: (_, value) => validateCNPJ(value) }
                  ]}
                  name="cnpj"
                  label="CPNJ">
                  <Input placeholder="Insira o cnpj" />
                </Form.Item>

                <Form.Item
                  rules={[
                    ...rules,
                    { validator: (_, value) => validateNickName(value) }
                  ]}
                  name="nickName"
                  label="apelido">
                  <Input placeholder="Insira o nome fantasia" />
                </Form.Item>

                <Title level={5}>Dados de acesso</Title>
                <Form.Item rules={rules} name="responsible" label="Responsável">
                  <Input placeholder="Insira o nome do responsável" />
                </Form.Item>
                <Form.Item
                  rules={[
                    ...rules,
                    { validator: (_, value) => validateEmail(value) }
                  ]}
                  name="email"
                  label="E-mail">
                  <Input placeholder="Insira o email" />
                </Form.Item>
                <Form.Item rules={rules} name="password" label="Senha">
                  <Input.Password placeholder="Insira a senha" />
                </Form.Item>
              </Card>

              <Row justify="center">
                <Col span={22}>
                  <Form.Item>
                    <Button
                      size="large"
                      htmlType="submit"
                      loading={loading}
                      type="primary"
                      style={{ width: '100%' }}>
                      Continuar
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
)

export default Register
