import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.less'
import { AppProviders } from './context'
import { MemoryRouter } from 'react-router-dom'
import { ConfigProvider, Empty } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const customizeRenderEmpty = () => <Empty description={'暂无数据'} />

root.render(
  <React.StrictMode>
    <MemoryRouter>
      <AppProviders>
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
          <App />
        </ConfigProvider>
      </AppProviders>
    </MemoryRouter>
  </React.StrictMode>
)

reportWebVitals()
