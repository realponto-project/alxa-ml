import React, { useState } from 'react'
import { Image, Typography, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import styles from './style.module.css'
import Plan from '../../Containers/Plans'

import Deliveries from '../../Assets/ads.svg'

const { Title } = Typography
const AdSide = ({ plans }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleCancel = () => {
    setIsVisible(false)
  }

  const price =
    plans.length > 0
      ? `R$ ${plans[1].amount.toString().replace(/(\d)(\d{2})$/, '$1,$2')}/mês`
      : ''

  return (
    <div className={styles.adSideContainer}>
      <Plan
        isVisible={isVisible}
        handleCancel={handleCancel}
        handleOk={console.log}
      />
      <Image
        style={{
          position: 'relative',
          top: '-07px'
        }}
        preview={false}
        width={220}
        src={Deliveries}
      />
      <Title level={4} style={{ padding: '10px 0 4px 0' }}>
        Atualização
      </Title>
      <p>
        Atualize seus anúncios de forma <b>fácil</b> e
        <b> prática</b> com alguns cliques.
      </p>
      {/* <Button onClick={() => setIsVisible(true)} type="primary" block>
        Assine agora <b> {price}</b>
      </Button> */}
    </div>
  )
}

const mapStateToProps = ({ plans }) => ({
  plans
})

const enhanced = compose(connect(mapStateToProps), withRouter)

export default enhanced(AdSide)
