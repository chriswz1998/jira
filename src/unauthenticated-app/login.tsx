import { Card, Form, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { HeightBtn, HeightInp } from '../utils/global.antd'
import { useAsync } from '../utils/use-async'
import logos from '../assets/logos4@2x.png'
import styled from '@emotion/styled'
import a2x from '../assets/bg@2x.png'
import { useHttp } from '../utils/http'
import { useAuth } from '../context/anth-context'
import { useEffect } from 'react'

export const LoginScreen = () => {
  const { run, isLoading } = useAsync()
  const clint = useHttp()
  const { HttpDefaultPoint, setHttpDefaultPoint } = useAuth()

  useEffect(() => {
    const a = parseInt(window.localStorage.getItem('lineNo') || '', 10)
    const b = parseInt(window.localStorage.getItem('stationNo') || '', 10)
    setHttpDefaultPoint({
      ...HttpDefaultPoint,
      lineNo: a || '' || undefined,
      stationNo: b || '' || undefined,
    })
  }, [])

  const handleSubmit = async ({ staffNo }: { staffNo: string }) => {
    const res = await run(
      clint('api/pad/staff-login', { method: 'POST', data: { staffNo } })
    )
    setHttpDefaultPoint({ ...HttpDefaultPoint, ...res })
  }

  return (
    <Container>
      <LeftTitleContainer>
        <LogoImg src={logos} />
        <LeftTitleContainerFirst>杰克灵巧吊挂系统</LeftTitleContainerFirst>
        <LeftTitleContainerSecond>
          FLEXIBLE PICKING SYSTEM
        </LeftTitleContainerSecond>
      </LeftTitleContainer>
      <ShadowCard>
        <Title>登录</Title>
        <Title2>请输入账号或刷卡登录</Title2>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="staffNo"
            rules={[{ required: true, message: '请输入工号!' }]}
          >
            <HeightInp
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={'工号'}
              type={'text'}
            />
          </Form.Item>
          <HeightBtn loading={isLoading} type={'primary'} htmlType={'submit'}>
            登录
          </HeightBtn>
        </Form>
      </ShadowCard>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${a2x}), no-repeat, center, 100% 100%;
`

const LeftTitleContainer = styled.div`
  padding: 0 5rem;
  box-sizing: border-box;
`

const LogoImg = styled(Image)`
  width: 15rem;
  height: 2rem;
`

const LeftTitleContainerFirst = styled.div`
  font-size: 6rem;
  font-weight: bold;
  color: #ffffff;
  margin-top: 1rem;
`

const LeftTitleContainerSecond = styled.div`
  font-size: 3.6rem;
  font-weight: 400;
  color: #ffffff;
`

const Title = styled.h2`
  font-size: 4rem;
  color: #3b80ff;
  margin-bottom: 2.4rem;
`

const Title2 = styled.div`
  font-size: 1.8rem;
  font-weight: 400;
  color: #999999;
  margin-bottom: 2.4rem;
`

const ShadowCard = styled(Card)`
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  width: 38rem;
  height: 38rem;
  padding: 3.2rem 4rem;
  box-sizing: border-box;
  border-radius: 0.4rem;
  text-align: center;
`
