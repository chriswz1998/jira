import { ReactNode } from 'react'
import { AuthProvider } from './anth-context'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}
