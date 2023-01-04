import React from 'react'
import './App.less'
import { useAuth } from './context/anth-context'
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import styled from '@emotion/styled'

function App() {
  const { HttpDefaultPoint } = useAuth()
  return (
    <AppContainer className="App">
      {HttpDefaultPoint?.staffNo && HttpDefaultPoint?.staffName ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`
