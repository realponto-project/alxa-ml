import React from 'react'
import { Image, Menu, Layout } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, pathOr } from 'ramda'
import Logo from '../../Assets/alxaML.svg'
import LogoPlus from '../../Assets/alxa-plus.svg'
import AdSide from '../../Components/AdSide'
import styles from './style.module.css'

import {
  DotChartOutlined,
} from '@ant-design/icons'

const { Sider, Content } = Layout
const menuItems = [
  {
    icon: <DotChartOutlined />,
    label: 'Anúncios',
    key: '/logged/ads/manager'
  },
]

const LayoutComponent = ({ children, history, location, company, subscription }) => {
  const goTo = ({ key }) => history.push(key)
  const companyName = pathOr('', ['name'], company)
  const parseCompanyName = companyName.length > 22 ? `${companyName.substr(0, 22)}...` : companyName

  return (
    <Layout className={styles.noPrint}>
      <Sider
        className={styles.noPrint}
        theme="light"
        collapsible
        collapsed={false}
        width={256}
        trigger={null}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}>
        <div
          style={{
            padding: '24px 0 24px 24px',
            margin: 'auto'
          }}
          className={styles.noPrint}
        >
          <Image
            className={styles.noPrint}
            style={{
              position: 'relative',
              width: '210px',
              height: '79px',
              margin: 'auto'
            }}
            preview={false}
            width={220}
            src={subscription.status === 'free' ? Logo : LogoPlus }
          />
          <p
            className={styles.noPrint}
            style={{
              color: '#454550',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
            title={parseCompanyName}
          >
            {parseCompanyName}
          </p>
        </div>
        <Menu
          className={styles.noPrint}
          theme="ligth"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ width: 256 }}>
          {menuItems.map((menuItem) => (
            <Menu.Item className={styles.noPrint} {...menuItem} key={menuItem.key} onClick={goTo}>
              {menuItem.label}
            </Menu.Item>
          ))}
        </Menu>
        {location.pathname.replace('/logged/', '') !== 'plans' &&
          subscription && subscription.status === 'free' 
          && 
          <AdSide className={styles.noPrint} />}
      </Sider>
      <Layout>
        <Content
          style={{
            marginLeft: '256px',
            padding: 16,
            minHeight: '100vh'
          }}>
          {children || 'Nenhum conteúdo criado!'}
        </Content>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = ({ company, subscription }) => ({
  company,
  subscription,
})

const enhanced = compose(connect(mapStateToProps), withRouter)

export default enhanced(LayoutComponent)
