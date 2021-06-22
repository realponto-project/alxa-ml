import React, { useState, useEffect } from 'react'
import {
  applySpec,
  pathOr,
  find,
  map,
  pipe,
  replace,
  propEq,
  multiply,
  prop,
  keys,
  compose
} from 'ramda'
import moment from 'moment'
import {
  Row,
  Col,
  Image,
  Typography,
  Divider,
  Modal,
  Input,
  Form,
  Button,
  Select
} from 'antd'
import { connect } from 'react-redux'
import { CheckOutlined } from '@ant-design/icons'
import styles from './style.module.css'
import { getAll } from '../../Services/Plans'
import { createSubscription } from '../../Services/Subscription'
import { createCardHash } from '../../Services/pagarme'

import Logo from './alxa.svg'
import Visa from './visa.svg'
import MasterCard from './mastercard.svg'

const { Title, Paragraph } = Typography
const { Option } = Select

const buildPlan = applySpec({
  activated: pathOr('', ['activated']),
  key: pathOr('', ['id']),
  amount: pipe(
    pathOr('', ['amount']),
    String,
    replace(/(\d)(\d{2})$/, '$1,$2')
  ),
  description: pathOr('', ['description']),
  discount: pathOr('', ['discount']),
  text: pathOr('Pagamento mensal', ['text']),
  quantityProduct: pathOr('', ['quantityProduct'])
})

const Plan = ({ isVisible, handleCancel, setSubscription }) => {
  const [planId, setPlanId] = useState('')
  const [plans, setPlans] = useState([])
  const [form] = Form.useForm()
  const [installment, setInstallment] = useState(1)

  const selectPlan = (id) => {
    setPlanId(id)
  }

  const getAllPlans = () => {
    getAll({ activated: true, description: 'Anual' }).then(({ data: { source } }) => {
      const sourceFormated = map(buildPlan, source)
      setPlans(sourceFormated)
      setPlanId(
        prop('key', find(propEq('quantityProduct', 300), sourceFormated))
      )
    })
  }

  useEffect(() => {
    getAllPlans()
  }, [])

  const quantityProductPlan = prop(
    'quantityProduct',
    find(propEq('key', planId), plans)
  )

  const amount =
    plans &&
    planId &&
    pipe(
      find(propEq('key', planId)),
      applySpec({
        description: prop('description'),
        amount: pipe(prop('amount'), replace(',', '.'), Number)
      }),
      ({ amount }) => multiply(12)(amount).toFixed(2)
    )(plans)

  const inicioAssinatura = moment().format('L')
  const terminoAssinatura = moment().add(13, 'months').format('L')

  const mask = (value, pattern) => {
    let i = 0
    const v = value.toString().replace(pattern[1], '')
    return pattern[0]
      .replace(/#/g, () => v[i++] || '')
      .replace(pattern[2], '')
      .toUpperCase()
  }

  const patterns = {
    card_holder_name: [new Array(45).fill('#').join(''), /([^a-zA-Z|\s])/g],
    card_number: ['#### #### #### ####', /\D/g, /(\s{0,3})$/g],
    card_expiration_date: ['##/##', /\D/g, /(\/)$/g],
    card_cvv: ['###', /\D/g],
    installment: ['#', /\D/g]
  }

  const maskTest = (e) => (key) => {
    return { [key]: mask(e[key], patterns[key]) }
  }

  const installments = (value) => {
    setInstallment(value)
  }

  const addSubscription = async (values) => {
    const cardUser = {
      card_holder_name: values.card_holder_name,
      card_number: values.card_number.replace(/\D/g, ''),
      card_expiration_date: values.card_expiration_date.replace(/\D/g, ''),
      card_cvv: values.card_cvv.replace(/\D/g, ''),
    }
    try {
      const cardHash = await createCardHash(cardUser)
      const { data } = await createSubscription({
        planId,
        cardHash,
        activated: true,
        amount: Number(amount) * 100,
        paymentMethod: 'credit_card',
        installments: installment
      })
      setSubscription(data)
      setInstallment(1)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      visible={isVisible}
      width={'90%'}
      footer={null}
      closable={false}
      centered={true}>
      <Row gutter={[16, 16]}>
        <Col
          style={{
            background: 'white',
            display: 'flex',
            justifyContent: 'space-between'
          }}
          span={24}>
          <Col span={11}>
            <Image
              style={{
                position: 'relative',
                width: '150px',
                height: '79px'
              }}
              preview={false}
              width={220}
              src={Logo}
            />

            <Title level={2} style={{ marginTop: '20px' }}>
              Tenha mais controle na sua empresa com o alxa PLUS!
            </Title>

            <Paragraph className={styles.fontSize16}>
              Aproveite todas as nossas funcionalidades:
            </Paragraph>

            <Paragraph>
              <CheckOutlined className={styles.checkOutlinedIcon} />
              Gestão de estoque
            </Paragraph>
            <Paragraph>
              <CheckOutlined className={styles.checkOutlinedIcon} />
              <strong>Controle de vendas</strong>
            </Paragraph>
            <Paragraph>
              <CheckOutlined className={styles.checkOutlinedIcon} />
              Ponto de venda
            </Paragraph>
            <Paragraph>
              <CheckOutlined className={styles.checkOutlinedIcon} />
              <strong>Controle de cliente</strong>
            </Paragraph>
            <Paragraph>
              <CheckOutlined className={styles.checkOutlinedIcon} />
              Cupom não fiscal
            </Paragraph>

            <Paragraph className={styles.fontWeightBold}>
              <CheckOutlined className={styles.checkOutlinedIcon} />
              Até {quantityProductPlan} produtos
            </Paragraph>

            <Divider />

            <Paragraph
              style={{
                margin: '0 0 40px 10px'
              }}>
              Você pode cancelar a qualquer momento, sem nenhum custo ou taxa de
              cancelamento, lincença paga de forma <strong>anual</strong>.
            </Paragraph>

            <Paragraph className={styles.fontWeightBold}>
              Assine um plano e ganhe + 1 mês totalmente GRÁTIS!
            </Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph className={styles.textSelectPlan}>
              Selecione o plano que mais combina com a sua empresa. Cancele
              quando quiser!
            </Paragraph>
            <Paragraph className={styles.textMostPopular}>
              Mais popular
            </Paragraph>
            <Row justify="space-between">
              {plans.map(
                ({
                  key,
                  description,
                  amount,
                  month,
                  quantityProduct,
                  text,
                }) => (
                  <Col span={12} key={key}>
                    <div
                      className={styles.cardPlans}
                      onClick={() => selectPlan(key)}
                      style={
                        key === planId ? { border: '2px solid #7BDAAA' } : {}
                      }>
                      <Col span={24} style={{ textAlign: 'center' }}>
                        <h1 className={styles.textDescription}>
                          {description}
                        </h1>
                      </Col>
                      <Col span={24} style={{ textAlign: 'center' }}>
                        <h1 className={styles.textAmount}>
                          <span className={styles.textSimbol}>R$ </span>
                          {amount}
                          {month}
                        </h1>
                        <h4 className={styles.text}>{text}</h4>
                        {quantityProduct && (
                          <span
                            className={styles.textDiscount}
                            style={key === planId ? { color: '#7BDAAA' } : {}}>
                            {quantityProduct} produtos
                          </span>
                        )}
                        {!quantityProduct && (
                          <span className={styles.textNoDiscount} />
                        )}
                      </Col>
                    </div>
                  </Col>
                )
              )}
            </Row>
            <Paragraph className={styles.textCardData}>
              Preencha os dados do cartão
            </Paragraph>
            <Row>
              <Image
                className={styles.imageVisa}
                preview={false}
                width={48}
                src={Visa}
              />
              <Image
                className={styles.imageMasterCard}
                preview={false}
                width={28}
                src={MasterCard}
              />
            </Row>
            <Form
              onFinish={addSubscription}
              layout={'vertical'}
              onValuesChange={(e) =>
                form.setFieldsValue(pipe(keys, (tes) => tes[0], maskTest(e))(e))
              }
              form={form}>
              <Form.Item
                label={
                  <label
                    style={{
                      color: '#333',
                      fontWeight: 'bold',
                      fontSize: '11px',
                      margin: '10px 0 0 0'
                    }}>
                    Nome titular
                  </label>
                }
                name="card_holder_name">
                <Input placeholder="Insira o nome do titular"/>
              </Form.Item>

              <Form.Item
                label={
                  <label
                    style={{
                      color: '#333',
                      fontWeight: 'bold',
                      fontSize: '11px',
                      margin: '0 0 0 0'
                    }}>
                    Número do cartão
                  </label>
                }
                name="card_number">
                <Input placeholder="Insira o número do cartão"/>
              </Form.Item>
              <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item
                  style={{ width: '33%' }}
                  label={
                    <label
                      style={{
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        margin: '0 0 0 0'
                      }}>
                      Data validade
                    </label>
                  }
                  name="card_expiration_date">
                  <Input placeholder="Insira a data"/>
                </Form.Item>

                <Form.Item
                  style={{ width: '33%' }}
                  label={
                    <label
                      style={{
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        margin: '0 0 0 0'
                      }}>
                      CVV
                    </label>
                  }
                  name="card_cvv">
                  <Input placeholder="Insira o código"/>
                </Form.Item>

                <Form.Item
                  style={{ width: '33%' }}
                  label={
                    <label
                      style={{
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        margin: '0 0 0 0'
                      }}>
                      Parcelas
                    </label>
                  }
                  name="installment"
                  >
                  <Select onChange={installments} defaultValue={installment}>
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                  </Select>
                </Form.Item>
              </Row>

              <Row align="center">
                <Paragraph className={styles.textDetailsSignature}>
                  Detalhes da assinatura
                </Paragraph>
              </Row>

              <Row span={24}>
                <Col span={12}>
                  <Paragraph className={styles.textSignature}>
                    Valor total
                  </Paragraph>

                  <Paragraph className={styles.textSignature}>
                    Parcelas
                  </Paragraph>

                  <Paragraph className={styles.textSignature}>
                    Duração
                  </Paragraph>

                  <Paragraph className={styles.textSignature}>
                    Início da assinatura
                  </Paragraph>

                  <Paragraph className={styles.textSignature}>
                    Término da assinatura
                  </Paragraph>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Paragraph className={styles.textSignature}>
                    <strong>R$ {amount}</strong>
                  </Paragraph>

                  <Paragraph className={styles.textSignature}>
                    <strong>{installment} x</strong>
                  </Paragraph>

                  <Paragraph className={styles.textSignature}>
                    <strong>12 meses + 1 mês GRÁTIS</strong>
                  </Paragraph>

                  <Paragraph className={styles.textSignature}>
                    <strong>{inicioAssinatura}</strong>
                  </Paragraph>

                  <Paragraph className={styles.textSignature}>
                    <strong>{terminoAssinatura}</strong>
                  </Paragraph>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  className={styles.buttonBuy}
                  type="primary"
                  htmlType="submit">
                  Finalizar compra
                </Button>
              </Form.Item>
            </Form>
            <Row align="center">
              <Paragraph onClick={handleCancel} className={styles.textNoThanks}>
                Não, obrigado.
              </Paragraph>
            </Row>
          </Col>
        </Col>
      </Row>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setSubscription: (payload) => dispatch({ type: 'SET_SUBSCRIPTION', payload})
})

const enhanced = compose(connect(null, mapDispatchToProps))

export default enhanced(Plan)
