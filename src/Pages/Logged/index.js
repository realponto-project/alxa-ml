import React, { useEffect } from 'react'
import { Row, Col, message } from 'antd'
import { Switch } from 'react-router-dom'
import { compose, isEmpty } from 'ramda'
import { connect } from 'react-redux'

import ProtectedRoute from '../../Routes/protectedRoute'
import rootRoutes from '../../Routes/root'
import Header from '../../Components/Header'
import Layout from '../../Components/Layout'
import { getToken, messaging } from '../../firebase'

const renderRoute = (route) => <ProtectedRoute key={route.path} {...route} />

export const Logged = ({ setReducrTokenFcm, tokenFcm }) => {
  useEffect(() => {
    if (Notification.permission === 'granted' && isEmpty(tokenFcm)) {
      getToken()
        .then((token) => {
          setReducrTokenFcm(token)
        })
        .catch((err) => console.error(err))
    }
  }, [])

  messaging.onMessage((payload) => {
    const {
      notification: { body }
    } = payload

    message.success(body)
  })

  return (
    <Layout>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Header rootRoutes={rootRoutes} showSettings />
        </Col>
        <Col span={24}>
          <Switch>{rootRoutes.map(renderRoute)}</Switch>
        </Col>
      </Row>
    </Layout>
  )
}

const mapStateToProps = ({ tokenFcm }) => ({
  tokenFcm
})

const mapDispatchToProps = (dispatch) => ({
  setReducrTokenFcm: (payload) => dispatch({ type: 'SET_TOKEN_FCM', payload })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(Logged)
