import styled from '@emotion/styled'
import { Carousel, Image, Switch } from 'antd'
import { Circle } from 'components/circle'
import FourBgImg from '../../assets/Frame109@2x.png'
import { HangDataFirst } from '../../screens/hanging-page'
import { useHttp } from '../../utils/http'
import { useAsync } from '../../utils/use-async'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/anth-context'
import { SewingDataSecond } from '../../screens/sewing-page'

export const RightStage = ({
  hangDataFirst,
  hangDataSecond,
}: {
  hangDataFirst: HangDataFirst
  hangDataSecond: SewingDataSecond
}) => {
  const clint = useHttp()
  const { HttpDefaultPoint } = useAuth()
  const { run, isLoading } = useAsync()
  const [auto_out_cloth_check, set_auto_out_cloth_check] = useState<
    boolean | undefined
  >(false)
  const [receive_coat_hanger_check, set_receive_coat_hanger_check] = useState<
    boolean | undefined
  >(false)
  useEffect(
    () => set_auto_out_cloth_check(HttpDefaultPoint?.autoOut),
    [HttpDefaultPoint?.autoOut]
  )
  useEffect(
    () => set_receive_coat_hanger_check(HttpDefaultPoint?.acceptHanger),
    [HttpDefaultPoint?.acceptHanger]
  )

  const auto_out_cloth = async () => {
    const res = await run(
      clint('api/pad/auto-out-cloth', {
        method: 'POST',
        data: { autoOutCloth: !auto_out_cloth_check },
      })
    )
    if (res) set_auto_out_cloth_check(!auto_out_cloth_check)
  }

  const receive_coat_hanger = async () => {
    const res = await run(
      clint('api/pad/receive-coat-hanger', {
        method: 'POST',
        data: { receiveCoatHanger: !receive_coat_hanger_check },
      })
    )
    if (res) set_receive_coat_hanger_check(!receive_coat_hanger_check)
  }

  const onChange = () => {
    console.log('🚀 ~ file: right-stage.tsx ~ line 7 ~ onChange ~ 1', 111)
  }
  return (
    <Card>
      <CardTop>
        <CTLeft>
          <CTLTop>
            <div style={{ textAlign: 'center' }}>
              <span>今日产量</span>
              <br />
              <SpText>{hangDataFirst.todayProduction || '0'}</SpText>
            </div>
            <Circle svg_number={String(hangDataFirst.hangParcelQty || '0')} />
          </CTLTop>
          <OpBox>
            <OBItem>
              <span>任务数量</span>
              <SpText2>{hangDataFirst.taskQty || '0'}</SpText2>
            </OBItem>
            <OBItem>
              <span>挂片数量</span>
              <SpText2>{hangDataFirst.hangParcelQty || '0'}</SpText2>
            </OBItem>
          </OpBox>
        </CTLeft>

        <CTRight>
          <CTRFirst>
            <span>屏幕锁定</span>
            <Switch defaultChecked onChange={onChange} />
          </CTRFirst>
          <CTRSecond>
            <CTRSItem>
              <span>自动出衣</span>
              <Switch
                loading={isLoading}
                checked={auto_out_cloth_check}
                onChange={auto_out_cloth}
              />
            </CTRSItem>
            <CTRSItem>
              <span>接收衣架</span>
              <Switch
                loading={isLoading}
                checked={receive_coat_hanger_check}
                onChange={receive_coat_hanger}
              />
            </CTRSItem>
          </CTRSecond>
        </CTRight>
      </CardTop>
      <CardMain>
        <Carousel autoplay>
          {hangDataSecond.fileUrlList?.map((item, index) => {
            return (
              <div key={index}>
                <Image src={item} />
              </div>
            )
          })}
        </Carousel>
      </CardMain>
    </Card>
  )
}

const Card = styled.div`
  flex: 1;
  height: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
`

const CardTop = styled.div`
  width: 100%;
  display: flex;
`

const CTLeft = styled.div`
  width: 62rem;
  align-items: center;
  background: url(${FourBgImg}) no-repeat;
  background-size: 100% 100%;
  color: #6a8aba;
  font-size: 2.4rem;
`
const CTLTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem 0 4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
`

const SpText = styled.span`
  font-size: 5.9rem;
  line-height: 5.9rem;
  font-weight: 500;
  color: #3b80ff;
  margin-top: 2rem;
`

const OpBox = styled.div`
  display: flex;
  padding: 1rem 4rem;
`

const OBItem = styled.div`
  margin-right: 4rem;
`

const SpText2 = styled.span`
  font-size: 2.2rem;
  font-weight: 500;
  color: #518eff;
  line-height: 2.2rem;
  margin-left: 2rem;
`

const CTRight = styled.div`
  flex: 1;
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const CTRFirst = styled.div`
  background: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  padding: 1rem;
  color: #333333;
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CTRSecond = styled.div`
  background: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  padding: 1rem;
  color: #333333;
  font-size: 2.4rem;
`

const CTRSItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CardMain = styled.div`
  width: 82rem;
  margin-top: 1.5rem;
  flex: 1;
  background: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  padding: 1.5rem;
`
