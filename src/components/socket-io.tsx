import { StompSessionProvider, useSubscription } from 'react-stomp-hooks'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/anth-context'

export const OnStation = () => {
  const [IPADDRESS, setIPADDRESS] = useState('')
  const [HOST, setHOST] = useState('')
  useEffect(() => {
    const IPADDRESS = window.localStorage.getItem('IPADDRESS') || ''
    const HOST = window.localStorage.getItem('HOST') || ''
    setIPADDRESS(IPADDRESS)
    setHOST(HOST)
  }, [])

  const { HttpDefaultPoint } = useAuth()
  const url = `/topic/pad/line/${HttpDefaultPoint?.lineNo}/station/${HttpDefaultPoint?.stationNo}/rdcardOnStation`
  return (
    <StompSessionProvider url={`http://${IPADDRESS}:${HOST}/websocket`}>
      <SubscribingComponent url={url} type={'onStation'} />
    </StompSessionProvider>
  )
}

const SubscribingComponent = ({ url, type }: { url: string; type: string }) => {
  const { setOnStation, setOutStation, onStation, outStation } = useAuth()
  useSubscription(url, (message) =>
    type === 'onStation'
      ? setOnStation(JSON.stringify(message.body))
      : setOutStation(JSON.stringify(message.body))
  )
  return <></>
}

export const OutStation = () => {
  const [IPADDRESS, setIPADDRESS] = useState('')
  const [HOST, setHOST] = useState('')
  useEffect(() => {
    const IPADDRESS = window.localStorage.getItem('IPADDRESS') || ''
    const HOST = window.localStorage.getItem('HOST') || ''
    setIPADDRESS(IPADDRESS)
    setHOST(HOST)
  }, [])
  const { HttpDefaultPoint } = useAuth()
  const url = `/topic/pad/line/${HttpDefaultPoint?.lineNo}/station/${HttpDefaultPoint?.stationNo}/rdcardOutStation`
  return (
    <StompSessionProvider url={`http://${IPADDRESS}:${HOST}/websocket`}>
      <SubscribingComponent url={url} type={'outStation'} />
    </StompSessionProvider>
  )
}
