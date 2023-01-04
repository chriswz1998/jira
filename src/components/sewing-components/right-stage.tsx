import styled from '@emotion/styled'
import { Carousel, Image, Switch } from 'antd'
import FourBgImg from '../../assets/Frame109@2x.png'
import { SewingDataFirst, SewingDataSecond } from '../../screens/sewing-page'
import { useHttp } from '../../utils/http'
import { useAsync } from '../../utils/use-async'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/anth-context'

export const RightStage = ({
  sewingDataFirst,
  sewingDataSecond,
}: {
  sewingDataFirst: SewingDataFirst
  sewingDataSecond: SewingDataSecond
}) => {
  const clint = useHttp()
  const { run, isLoading } = useAsync()
  const { HttpDefaultPoint } = useAuth()
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
          <CTLItem>
            <div style={{ padding: '2rem' }}>
              <span>今日产量</span>
              <br />
              <CTLISpecialText>
                {sewingDataFirst.todayProduction}
              </CTLISpecialText>
            </div>
          </CTLItem>
          <CTLILine></CTLILine>
          <CTLItem style={{ flex: '1', marginLeft: '1rem' }}>
            <CTLItemRow>
              <div>线上数量</div>
              <CTLIRSpecialText>{sewingDataFirst.trackQty}</CTLIRSpecialText>
            </CTLItemRow>
            <CTLItemRow>
              <div>站内数量</div>
              <CTLIRSpecialText>{sewingDataFirst.stationQty}</CTLIRSpecialText>
            </CTLItemRow>
            <CTLItemRow>
              <div>剩余容量</div>
              <CTLIRSpecialText>
                {sewingDataFirst.remainCapacity}
              </CTLIRSpecialText>
            </CTLItemRow>
          </CTLItem>
          <CTLItem style={{ flex: '1' }}>
            <CTLItemRow>
              <div></div>
              <div></div>
            </CTLItemRow>
            <CTLItemRow>
              <div>返工</div>
              <CTLIRSpecialText>{sewingDataFirst.qcQty}</CTLIRSpecialText>
            </CTLItemRow>
            <CTLItemRow>
              <div>返工率</div>
              <CTLIRSpecialText>{sewingDataFirst.qcRatio} %</CTLIRSpecialText>
            </CTLItemRow>
          </CTLItem>
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
        <Carousel autoplay lazyLoad={'progressive'}>
          {sewingDataSecond.fileUrlList?.map((item, index) => {
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
  display: flex;
  padding: 2rem 1rem;
  align-items: center;
  background: url(${FourBgImg}) no-repeat;
  background-size: 100% 100%;
`

const CTLItem = styled.div`
  text-align: center;
  font-size: 2.4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #6a8aba;
`

const CTLISpecialText = styled.span`
  font-size: 5.9rem;
  line-height: 5.9rem;
  font-weight: 500;
  color: #3b80ff;
`

const CTLILine = styled.div`
  width: 0.1rem;
  height: 100%;
  border-right: 1px solid #ccd0f2;
`

const CTLItemRow = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.2rem;
  color: #6a8aba;
  padding: 0 1.5rem;
`

const CTLIRSpecialText = styled.span`
  font-weight: 500;
  color: #3b80ff;
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
