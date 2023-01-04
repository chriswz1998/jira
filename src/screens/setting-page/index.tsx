import {
  ExclamationCircleFilled,
  LeftOutlined,
  SettingFilled,
} from '@ant-design/icons'
import styled from '@emotion/styled'
import { Button, message } from 'antd'
import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router'
import { useHttp } from '../../utils/http'
import { SystemSetting } from './system-setting'
import { StateInfo } from './state-info'
import { useAuth } from '../../context/anth-context'
import { useMount } from '../../utils'

interface TabItem {
  name: string
  icon: ReactNode
  tab: boolean
}

export const SettingPage = () => {
  const clint = useHttp()
  const { HttpDefaultPoint, setHttpDefaultPoint } = useAuth()

  const navigate = useNavigate()
  const [isTab, setIsTab] = useState(1)
  const [tabList, setTabList] = useState<TabItem[]>([
    {
      name: '状态信息',
      icon: <ExclamationCircleFilled style={{ marginRight: 10 }} />,
      tab: false,
    },
    {
      name: '系统设置',
      icon: <SettingFilled style={{ marginRight: 10 }} />,
      tab: true,
    },
  ])
  const [trackQty, setTrackQty] = useState(HttpDefaultPoint?.trackQty || 0)
  const [stationQty, setStationQty] = useState(
    HttpDefaultPoint?.stationQty || 0
  )
  const [capacity, setCapacity] = useState(HttpDefaultPoint?.capacity || 0)

  const change_station_status = async () => {
    const data = {
      trackQty,
      stationQty,
      capacity,
    }
    const res = await clint('api/pad/update-station-status', {
      method: 'POST',
      data,
    })
    if (res) {
      message.success('保存成功')
      await get_station_status()
    }
  }

  //保存更新状态信息  保存获取系统信息
  const getInfo = async () => {
    isTab === 1 ? await get_station() : await change_station_status()
  }

  const get_station = async () => {
    const res = await clint('api/pad/get-station', { method: 'POST' })
    if (res.stationNo && res.stationRole) {
      message.success('保存成功')

      setHttpDefaultPoint({ ...HttpDefaultPoint, ...res })
    }
  }

  const get_station_status = async () => {
    const res = await clint('api/pad/get-station-status', { method: 'POST' })
    delete res.stationRole
    setHttpDefaultPoint({ ...HttpDefaultPoint, ...res })
    setTrackQty(res.trackQty)
    setStationQty(res.stationQty)
    setCapacity(res.capacity)
  }

  const tabClick = async (INDEX: number) => {
    setTabList(
      tabList.map((item, index) => {
        item.tab = INDEX === index
        return item
      })
    )
    if (INDEX === 0) {
      if (!HttpDefaultPoint?.stationNo || !HttpDefaultPoint?.lineNo) {
        message.error('请填写站号/线号！')
        return
      }
      await get_station_status()
    }
    setIsTab(INDEX)
  }

  const Back = () => {
    navigate(-1)
  }

  return (
    <Container>
      <Header>
        <LeftOutlined onClick={Back} />
        <span>设置</span>
        <HBtn type="text" onClick={getInfo}>
          保存
        </HBtn>
      </Header>
      <MainContainer>
        <Aside>
          {tabList.map((item, index) => {
            return (
              <TabItem
                key={index}
                tab={item.tab}
                onClick={() => tabClick(index)}
              >
                {item.icon}
                {item.name}
              </TabItem>
            )
          })}
        </Aside>
        <Section>
          {isTab === 1 ? (
            <SystemSetting />
          ) : (
            <StateInfo
              trackQty={trackQty}
              setTrackQty={setTrackQty}
              stationQty={stationQty}
              setStationQty={setStationQty}
              capacity={capacity}
              setCapacity={setCapacity}
            />
          )}
        </Section>
      </MainContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #f3f2f7;
`

const Header = styled.header`
  width: 100vw;
  height: 6.4rem;
  padding: 0 2rem;
  box-sizing: border-box;
  background: #3b80ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.4rem;
  font-weight: 500;
  color: #ffffff;
`

const HBtn = styled(Button)`
  font-size: 2.4rem;
  color: #ffffff;
  display: flex;
  align-items: center;
`

const MainContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 6.4rem);
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
`

const Aside = styled.aside`
  width: 25rem;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  margin-right: 1.5rem;
  padding: 2rem;
`

const TabItem = styled.div<{ tab?: boolean }>`
  width: 100%;
  height: 4.8rem;
  line-height: 4.8rem;
  padding-left: 2rem;
  background: ${(props) => (props.tab ? '#3B80FF' : '')};
  border-radius: 0.6rem;
  font-size: 2.4rem;
  color: ${(props) => (props.tab ? '#FFFFFF' : '#333333')};
`

const Section = styled.section`
  flex: 1;
  background: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
`
