import React, { Fragment } from 'react'
import moment from 'moment'
import ClassNames from 'classnames'
import { add, isEmpty, length, map, multiply, pathOr, reduce } from 'ramda'

import styles from './style.module.css'
import { formatPrice } from '../../utils'
import mask from '../../utils/Masks'

const renderItems = ({ quantity, productId, price, product }) => (
  <Fragment key={productId}>
    <tr className={styles.ttu}>
      <td colSpan="3">{product.name}</td>
    </tr>
    <tr className={ClassNames(styles.ttu, styles.top1)}>
      <td>R$ {formatPrice(price)}</td>
      <td>{quantity}</td>
      <td>R$ {formatPrice(price * quantity)}</td>
    </tr>
  </Fragment>
)

const paymentLabel = {
  boleto: 'Boleto',
  credit_card: 'Cartão de crédito',
  debit_card: 'Cartão de débito',
  card_credit_master: 'Cartão crédito Master',
  card_credit_visa: 'Cartão crédito Visa',
  card_debit_master: 'Cartão débito Master',
  card_debit_visa: 'Cartão débito Visa',
  cash: 'Dinheiro'
}

const Cupom = ({
  company = {},
  customer = {},
  discount,
  items = [],
  payment,
  installments,
  formData,
  createdAt
}) => {
  const subTotal = reduce(
    add,
    0,
    map(({ quantity, price }) => multiply(quantity, price), items || [])
  )

  const maskDocument = (value) => {
    return {
      11: mask('###.###.###-##')(value),
      14: mask('##.###.###/####-##')(value)
    }[length(value)]
  }

  const maskPhone = (value) => {
    return {
      13: mask('### ## ####-####')(value),
      14: mask('### ## #####-####')(value)
    }[length(value)]
  }

  return (
    <table className={styles.printerTicket}>
      <tbody>
        <tr>
          <th className={styles.title} colSpan="3">
            {pathOr('------------------', ['name'], company)}
          </th>
        </tr>
        <tr>
          <th colSpan="3">{moment(createdAt).format('DD/MM/YYYY - LTS')}</th>
        </tr>
        <tr className={styles.top3}>
          <td colSpan="3">{pathOr('Venda rápida', ['name'], customer)}</td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">{maskDocument(customer.document)}</td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">{maskPhone(customer.phone)}</td>
        </tr>
        {!isEmpty(customer.street) && (
          <>
            <tr className={styles.top3}>
              <td colSpan="3">Endereço</td>
            </tr>
            <tr className={ClassNames(styles.ttu)}>
              <td colSpan="3">
                {customer.street}, {customer.streetNumber},
                <br />
                {customer.neighborhood}, {customer.city} - {customer.states}
                <br /> {customer.zipcode}
              </td>
            </tr>
          </>
        )}
        <tr style={{ borderBottom: 'none' }}>
          <th
            className={styles.ttu}
            colSpan="3"
            style={{ borderTop: '1px dashed #bcbcbc' }}>
            <b>Cupom não fiscal</b>
          </th>
        </tr>
        {items && items.length > 0 && map(renderItems, items)}
        <tr>
          <th className={styles.ttu1} colSpan="3">
            <b>Condições de pagamento</b>
          </th>
        </tr>
        <tr className={styles.top3}>
          <td colSpan="2">FORMA DE PAGAMENTO</td>
          <td align="right">
            {payment !== 'Dinheiro' && `${installments} x `}{' '}
            {paymentLabel[payment]}
          </td>
        </tr>
        <tr className={styles.ttu}>
          <td colSpan="2">Sub-total</td>
          <td align="right">R$ {formatPrice(subTotal)}</td>
        </tr>
        <tr className={styles.ttu} style={{ padding: '10px 0' }}>
          <td colSpan="2">Desconto</td>
          <td align="right">- R$ {formatPrice(discount)}</td>
        </tr>
        <tr className={styles.ttu} style={{ padding: '10px 0' }}>
          <td colSpan="2">Total</td>
          <td align="right">R$ {formatPrice(subTotal - discount)}</td>
        </tr>
        <tr className={styles.sup} style={{ borderTop: '1px dashed #bcbcbc' }}>
          <td colSpan="3" align="center">
            {company.siteUrl || 'www.alxa.com.br - gestão integrada'}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Cupom
