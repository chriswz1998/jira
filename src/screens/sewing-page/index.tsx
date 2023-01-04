import { InspectionStage } from './inspection-stage'
import { Drawer, Image } from 'antd'
import logo from 'assets/logo2@2x.png'
import BgImg from 'assets/Frame77@2x.png'
import styled from '@emotion/styled'
import {
  CarryOutOutlined,
  SendOutlined,
  UserOutlined,
  AppstoreOutlined,
  AimOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { SewingStage } from './sewing-stage'
import { useAuth } from '../../context/anth-context'
import { useHttp } from '../../utils/http'
import { OnStation, OutStation } from '../../components/socket-io'
import { Link, Outlet } from 'react-router-dom'

export interface SewingDataFirst {
  qcQty?: number
  qcRatio?: number
  remainCapacity?: number
  stationQty?: number
  todayProduction?: number
  trackQty?: number
}

export interface SewingDataSecond {
  color?: number | null
  cutterNo?: number | null
  fileUrlList?: string[]
  moNo?: number | null
  poNo?: number | null
  productType?: number | null
  quantity?: number | null
  remark?: number | null
  scheduleBillNo?: number | null
  seqCode?: number | null
  seqName?: number | null
  seqNo?: number | null
  seqOutputQty?: number | null
  size?: number | null
  styleNo?: number | null
}

export const Sewing = () => {
  const [isTab, setIsTab] = useState(false)
  const [sewingDataFirst, setSewingDataFirst] = useState<SewingDataFirst>({})
  const [sewingDataSecond, setSewingDataSecond] = useState<SewingDataSecond>({
    fileUrlList: [
      'http://172.26.5.10:9099/09990912/hero-bg-2x.webp',
      'http://172.26.5.10:9099/09990912/k.png',
    ],
  })
  const [open, setOpen] = useState(false)

  const { HttpDefaultPoint, setHttpDefaultPoint, onStation, outStation } =
    useAuth()
  const clint = useHttp()

  const logout = async () => {
    const res = await clint('api/pad/staff-logout', { method: 'POST' })
    if (res) setHttpDefaultPoint({})
  }

  const get_sewing_station_production = async () => {
    const res = await clint('api/pad/get-sewing-station-production', {
      method: 'POST',
    })
    setSewingDataFirst(res)
  }

  const get_station_product_info = async () => {
    const res = await clint('api/pad/get-station-product-info', {
      method: 'POST',
    })
    setSewingDataSecond(res)
  }

  const get_station_status = async () => {
    const res = await clint('api/pad/get-station-status', { method: 'POST' })
    delete res.stationRole
    setHttpDefaultPoint({ ...HttpDefaultPoint, ...res })
  }

  const in_out_stage = async () => {
    await clint('api/pad/rework-view-status', {
      method: 'POST',
      data: { viewStatus: isTab ? 0 : 1 },
    })
  }

  const changeMainPage = async () => {
    setIsTab(!isTab)
    await in_out_stage()
    await get_station_status()
  }

  useEffect(() => {
    get_station_product_info().then(() => {})
  }, [onStation])

  useEffect(() => {
    get_sewing_station_production().then(() => {})
  }, [outStation])

  useEffect(() => {
    get_station_status().then()
  }, [])

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <Container>
      <Header>
        <HeaderLBox>
          <HeaderImage src={logo} preview={false} />
          <HeaderLTextSpan isTab={isTab} onClick={changeMainPage}>
            <SendOutlined /> 站信息
          </HeaderLTextSpan>
          <HeaderLTextSpan isTab={!isTab} onClick={changeMainPage}>
            <CarryOutOutlined /> QC质检
          </HeaderLTextSpan>
        </HeaderLBox>
        <HeaderRBox>
          <HeaderRSpan>
            <UserOutlined /> {HttpDefaultPoint?.staffName}
          </HeaderRSpan>
          <HeaderRSpan>
            <UserOutlined /> {HttpDefaultPoint?.staffNo}
          </HeaderRSpan>
          <HeaderRSpan>
            <UserOutlined /> {HttpDefaultPoint?.lineNo}-
            {HttpDefaultPoint?.stationNo}(
            {HttpDefaultPoint?.stationRole === '2' ? '挂片站' : '缝纫站'})
          </HeaderRSpan>
          <HeaderRBtn onClick={showDrawer}>
            <AppstoreOutlined />
          </HeaderRBtn>
        </HeaderRBox>
      </Header>
      <OnStation />
      <OutStation />
      <Outlet />
      <Drawer
        placement="right"
        open={open}
        width={100}
        onClose={onClose}
        closable={false}
      >
        <div
          onClick={logout}
          style={{
            textAlign: 'center',
            color: '#3B80FF',
            fontSize: '2.4rem',
            marginBottom: '2rem',
          }}
        >
          <AimOutlined />
          <br />
          <span>注销</span>
        </div>
        <div
          style={{
            textAlign: 'center',
            color: '#3B80FF',
            fontSize: '2.4rem',
          }}
        >
          <Link to={{ pathname: '/setting' }}>
            <AimOutlined />
            <br />
            设置
          </Link>
        </div>
      </Drawer>
      {isTab ? (
        <InspectionStage />
      ) : (
        <SewingStage
          sewingDataFirst={sewingDataFirst}
          sewingDataSecond={sewingDataSecond}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: url(${BgImg}) no-repeat;
  background-size: 100% 30rem;
  background-attachment: fixed;
  background-color: #f6f5fa;
`

const Header = styled.header`
  margin-top: 5rem;
  width: 100%;
  height: 8rem;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`

const HeaderLBox = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 2.4rem;
`

const HeaderImage = styled(Image)`
  width: 9rem;
  height: 3.5rem;
  margin-right: 4rem;
`

const HeaderLTextSpan = styled.span<{ isTab?: boolean }>`
  margin-right: 2rem;
  color: ${(props) => (props.isTab ? '#BAD1FE' : '')};
  background: ${(props) => (props.isTab ? '' : 'rgba(255,255,255,0.2)')};
  border-radius: 0.6rem;
  padding: 0 2.5rem;
`

const HeaderRBox = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 2rem;
`

const HeaderRSpan = styled.span`
  margin-right: 1.5rem;
`

const HeaderRBtn = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
`
