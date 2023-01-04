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
import { TaskStage } from './task-stage'
import { HangingStage } from './hanging-stage'
import { useAuth } from '../../context/anth-context'
import { useHttp } from '../../utils/http'
import { useMount } from '../../utils'
import { SewingDataSecond } from '../sewing-page'
import { Link } from 'react-router-dom'
import { OnStation, OutStation } from '../../components/socket-io'

export interface HangDataFirst {
  hangParcelQty?: number | null
  taskQty?: number | null
  todayProduction?: number | null
}

export const HangingPage = () => {
  const { setHttpDefaultPoint } = useAuth()

  const [isTab, setIsTab] = useState(false)
  const [hangDataFirst, setHangDataFirst] = useState<HangDataFirst>({})
  const [hangDataSecond, setHangDataSecond] = useState<SewingDataSecond>({
    fileUrlList: [
      'http://172.26.5.10:9099/09990912/hero-bg-2x.webp',
      'http://172.26.5.10:9099/09990912/k.png',
    ],
  })
  const [open, setOpen] = useState(false)

  const clint = useHttp()
  const { HttpDefaultPoint, onStation, outStation } = useAuth()

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const logout = () => {
    setHttpDefaultPoint({})
  }

  const get_hang_parcel_station_production = async () => {
    const res = await clint('api/pad/get-hang-parcel-station-production', {
      method: 'POST',
    })
    console.log(
      '🚀 ~ file: index.tsx ~ line 59 ~ get_station_product_info ~ res',
      res
    )
    setHangDataFirst(res)
  }

  const get_station_product_info = async () => {
    const res = await clint('api/pad/get-station-product-info', {
      method: 'POST',
    })
    console.log(
      '🚀 ~ file: index.tsx ~ line 59 ~ get_station_product_info ~ res',
      res
    )
    setHangDataSecond(res)
  }

  const changeMainPage = () => {
    setIsTab(!isTab)
    get_station_status().then()
  }

  const get_station_status = async () => {
    const res = await clint('api/pad/get-station-status', { method: 'POST' })
    delete res.stationRole
    setHttpDefaultPoint({ ...HttpDefaultPoint, ...res })
  }

  useEffect(() => {
    get_station_status().then()
  }, [])

  useEffect(() => {
    get_station_product_info().then(() => {
      console.log('🚀 onStation')
    })
  }, [onStation])

  useEffect(() => {
    get_hang_parcel_station_production().then(() => {
      console.log('🚀 outStation')
    })
  }, [outStation])

  return (
    <Container>
      <Header>
        <HeaderLBox>
          <HeaderImage src={logo} preview={false} />
          <HeaderLTextSpan isTab={isTab} onClick={changeMainPage}>
            <SendOutlined /> 挂片站
          </HeaderLTextSpan>
          <HeaderLTextSpan isTab={!isTab} onClick={changeMainPage}>
            <CarryOutOutlined /> 挂片任务
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
            <UserOutlined />
            {HttpDefaultPoint?.lineNo}-{HttpDefaultPoint?.stationNo}(
            {HttpDefaultPoint?.stationRole === '2' ? '挂片站' : '缝纫站'})
          </HeaderRSpan>
          <HeaderRBtn onClick={showDrawer}>
            <AppstoreOutlined />
          </HeaderRBtn>
        </HeaderRBox>
      </Header>
      {isTab ? (
        <TaskStage />
      ) : (
        <HangingStage
          hangDataFirst={hangDataFirst}
          hangDataSecond={hangDataSecond}
        />
      )}
      <OnStation />
      <OutStation />
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
