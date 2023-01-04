import React from 'react'
import { SettingPage } from '../screens/setting-page'

interface RoutesItems {
  path: string
  element: React.ReactElement
  children?: RoutesItems[]
}

export const routers: RoutesItems[] = [
  {
    path: '/setting',
    element: <SettingPage />,
  },
]
