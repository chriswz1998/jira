import { Divider } from 'antd'
import { HeightInp, HeightNumInp } from '../../utils/global.antd'
import styled from '@emotion/styled'
import { useAuth } from '../../context/anth-context'
import { useEffect, useState } from 'react'
import { useMount } from '../../utils'

export const SystemSetting = () => {
  const { HttpDefaultPoint, setHttpDefaultPoint } = useAuth()

  const [IPADDRESS, setIPADDRESS] = useState<string | null>('')
  const [HOST, setHOST] = useState<string | null>('')
  const [lineNo, setLineNo] = useState<string | null | number | undefined>(
    HttpDefaultPoint?.lineNo
  )
  const [stationNo, setStationNo] = useState<
    string | null | number | undefined
  >(HttpDefaultPoint?.stationNo)

  useMount(() => {
    setIPADDRESS(window.localStorage.getItem('IPADDRESS'))
    setHOST(window.localStorage.getItem('HOST'))
    setLineNo(window.localStorage.getItem('lineNo'))
    setStationNo(window.localStorage.getItem('stationNo'))
  })

  useEffect(() => {
    setHttpDefaultPoint({
      ...HttpDefaultPoint,
      lineNo: Number(lineNo),
      stationNo: Number(stationNo),
    })
  }, [lineNo, stationNo])

  const lineChange = (value: any) => {
    setLineNo(value.target.value)
    window.localStorage.setItem('lineNo', value.target.value)
    setHttpDefaultPoint({ ...HttpDefaultPoint, lineNo: value.target.value })
  }

  const stationChange = (value: any) => {
    setStationNo(value.target.value)
    window.localStorage.setItem('stationNo', value.target.value)
    setHttpDefaultPoint({ ...HttpDefaultPoint, stationNo: value.target.value })
  }

  const setIp = (value: any) => {
    console.log(
      '🚀 ~ file: system-setting.tsx ~ line 27 ~ setIp ~ value',
      value
    )
    window.localStorage.setItem('IPADDRESS', value.target.value)
    setIPADDRESS(window.localStorage.getItem('IPADDRESS'))
  }
  const setHost = (value: any) => {
    window.localStorage.setItem('HOST', value.target.value)
    setHOST(window.localStorage.getItem('HOST'))
  }

  return (
    <Container>
      <InpItem>
        <span>IP地址:</span>
        <HeightInp
          style={{ width: '40rem' }}
          placeholder={'请输入IP地址'}
          value={IPADDRESS || ''}
          onChange={setIp}
        />
      </InpItem>
      <Divider />

      <InpItem>
        <span>端口号:</span>
        <HeightInp
          style={{ width: '40rem' }}
          placeholder={'请输入端口号'}
          value={HOST || ''}
          onChange={setHost}
        />
      </InpItem>
      <Divider />

      <InpItem>
        <span>流水线号:</span>
        <HeightInp
          disabled={!!HttpDefaultPoint?.staffName}
          style={{ width: '40rem' }}
          placeholder={'请输入流水线号'}
          value={lineNo || ''}
          onChange={lineChange}
        />
      </InpItem>
      <Divider />

      <InpItem>
        <span>站号:</span>
        <HeightInp
          disabled={!!HttpDefaultPoint?.staffName}
          style={{ width: '40rem' }}
          placeholder={'请输入站号'}
          value={stationNo || ''}
          onChange={stationChange}
        />
      </InpItem>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 2.5rem;
  box-sizing: border-box;
`
const InpItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.4rem;
`
