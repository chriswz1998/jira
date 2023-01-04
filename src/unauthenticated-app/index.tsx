import { Button } from 'antd'
import styled from '@emotion/styled'
import { AppstoreOutlined } from '@ant-design/icons'
import { Route, Routes, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { SettingPage } from '../screens/setting-page'
import { LoginScreen } from './login'
import { useEffect, useState } from 'react'

export const UnauthenticatedApp = () => {
  const [settingIcon, setSettingIcon] = useState(true)
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/setting') {
      setSettingIcon(false)
    } else {
      setSettingIcon(true)
    }
  }, [pathname])
  return (
    <Container>
      <Routes>
        <Route path={'/'} element={<LoginScreen />} />
        <Route path={'/setting'} element={<SettingPage />} />
      </Routes>
      {settingIcon ? (
        <Link to={{ pathname: '/setting' }}>
          <SettingBtn
            shape="circle"
            size={'large'}
            icon={<AppstoreOutlined />}
          />
        </Link>
      ) : (
        ''
      )}
    </Container>
  )
}

const SettingBtn = styled(Button)`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
`
