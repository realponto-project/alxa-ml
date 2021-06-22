import React from 'react'
import {
  Card,
  Typography,
  Row,
  Col,
  Input,
  Form,
  DatePicker,
  Button,
  Upload
} from 'antd'
import {
  always,
  applySpec,
  head,
  ifElse,
  keys,
  pipe,
  prop,
  replace,
  __
} from 'ramda'
import moment from 'moment'
import mask, { myInfoMask } from '../../utils/Masks'
import { UploadOutlined } from '@ant-design/icons'

import styles from './style.module.css'

const { Title, Text } = Typography

const MyInfo = ({
  company,
  loading,
  user,
  updateMyInfo,
  handleUpload,
  handleRemoveLogo,
  handleChangeUpload
}) => {
  const [form] = Form.useForm()

  const buildIntialValues = applySpec({
    document: pipe(
      prop('document'),
      mask('##.###.###-#'),
      replace(/^\.\.-$/, '')
    ),
    phone: prop('phone'),
    birthday: ifElse(
      prop('birthday'),
      pipe(prop('birthday'), moment),
      always(undefined)
    )
  })

  const onValuesChange = (dataChange) => {
    const { name, value } = myInfoMask(
      applySpec({
        name: pipe(keys, head),
        value: (item) => pipe(pipe(keys, head), prop(__, item))(item)
      })(dataChange)
    )

    form.setFieldsValue({
      [name]: value
    })
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={5}>Informações da empresa</Title>
            </Col>
            <Col span={8}>
              <Text strong>Nome</Text>
              <p>{company?.name}</p>
            </Col>
            <Col span={8}>
              <Text strong>Apelido</Text>
              <p>{company?.nickName}</p>
            </Col>
            <Col span={8}>
              <Text strong>Documento</Text>
              <p>{company?.document}</p>
            </Col>

            <Col span={8}>
              <Row>
                <Col span={24}>
                  <Text strong>Logo</Text>
                </Col>
                <Col span={24}>
                  <Upload
                    name="file"
                    listType="picture"
                    accept="image/jpg, image/jpeg, image/png"
                    headers={{
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                    }}
                    onChange={handleChangeUpload}
                    fileList={company.logo ? [company.logo] : []}
                    action={handleUpload}
                    onRemove={handleRemoveLogo}>
                    {!company.logo && (
                      <Card className={styles.cardUploadLogoChildren}>
                        <Button type="link" icon={<UploadOutlined />}>
                          Adicionar
                        </Button>
                      </Card>
                    )}
                  </Upload>
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Text strong>Site</Text>
              <p>{company?.siteUrl}</p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={5}>Informações do usuário</Title>
            </Col>
            <Col span={12}>
              <Text strong>Nome completo</Text>
              <p>{user && user.name}</p>
            </Col>
            <Col span={12}>
              <Text strong>Email</Text>
              <p>{user && user.email}</p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            onValuesChange={onValuesChange}
            onFinish={updateMyInfo}
            initialValues={buildIntialValues(user)}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Title level={5}>Informações pessoais</Title>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="document"
                  label="Identidade"
                  rules={[
                    { required: true, message: 'Este campo é obrigatório!' }
                  ]}>
                  <Input maxLength={11} placeholder="Insira a sua identidade" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="phone"
                  label="Telefone"
                  rules={[
                    { required: true, message: 'Este campo é obrigatório!' }
                  ]}>
                  <Input
                    addonBefore="+55 "
                    maxLength={17}
                    placeholder="Insira seu telefone"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="birthday"
                  label="Data de Nascimento"
                  rules={[
                    { required: true, message: 'Este campo é obrigatório!' }
                  ]}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ width: '100%' }}
                    placeholder="Data de nascimento"
                  />
                </Form.Item>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button loading={loading} htmlType="submit" type="primary">
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default MyInfo
