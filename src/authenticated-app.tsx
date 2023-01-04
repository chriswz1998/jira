import { Sewing } from './screens/sewing-page'
import styled from '@emotion/styled'
import { HangingPage } from './screens/hanging-page'
import { useAuth } from 'context/anth-context'
import { Route, Routes } from 'react-router'
import { SettingPage } from './screens/setting-page'

export const AuthenticatedApp = () => {
  const { HttpDefaultPoint } = useAuth()
  return (
    <Container>
      <Routes>
        <Route
          path={'/'}
          element={
            HttpDefaultPoint?.stationRole === '2' ? <HangingPage /> : <Sewing />
          }
        />
        <Route path={'/setting'} element={<SettingPage />} />
      </Routes>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`
