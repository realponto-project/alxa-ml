import React from 'react'
import ReactDOM from 'react-dom'
import ptBR from 'antd/lib/locale/pt_BR'
import { Empty, ConfigProvider, Image } from 'antd'
import { HashRouter, BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import NoData from './Assets/noData.svg'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        locale={ptBR}
        renderEmpty={() => (
          <Empty
            description="Não há dados"
            image={<Image width={85} src={NoData} preview={false} />}
          />
        )}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
