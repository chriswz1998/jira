import React, { ReactNode, useContext, useState } from 'react'

export interface HttpDefaultPoint {
  lineNo?: number
  stationNo?: number
  staffNo?: number | string
  staffName?: string
  stationRole?: string
  capacity?: number
  stationQty?: number
  trackQty?: number
  acceptHanger?: boolean
  autoOut?: boolean
  stationId?: string
  staffId?: string
}

const AuthContext = React.createContext<
  | {
      setHttpDefaultPoint: (data: HttpDefaultPoint) => void
      HttpDefaultPoint: HttpDefaultPoint | null
      onStation: string
      setOnStation: (data: string) => void
      outStation: string
      setOutStation: (data: string) => void
      clear_table: boolean
      set_clear_table: (data: boolean) => void
    }
  | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [HttpDefaultPoint, setHttpDefaultPoint] =
    useState<HttpDefaultPoint | null>({})

  const [onStation, setOnStation] = useState<string>('')
  const [outStation, setOutStation] = useState<string>('')
  const [clear_table, set_clear_table] = useState<boolean>(false)

  return (
    <AuthContext.Provider
      children={children}
      value={{
        HttpDefaultPoint,
        setHttpDefaultPoint,
        onStation,
        setOnStation,
        outStation,
        setOutStation,
        clear_table,
        set_clear_table,
      }}
    />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('必须在auth-provider中使用')
  }
  return context
}
