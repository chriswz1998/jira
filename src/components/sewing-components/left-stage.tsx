import styled from '@emotion/styled'
import SecondBgImg from '../../assets/Group8@2x.png'
import { SewingDataFirst, SewingDataSecond } from '../../screens/sewing-page'

export const LeftStage = ({
  sewingDataSecond,
}: {
  sewingDataSecond: SewingDataSecond
}) => {
  return (
    <div>
      <MainLCard>
        <CardTitle>
          <CardColorLine></CardColorLine> 款式信息
        </CardTitle>
        <SecondCard>
          <SecondCardItem>
            <SecondCardItemLeftText>排产单号</SecondCardItemLeftText>
            <span>{sewingDataSecond.scheduleBillNo || '/'}</span>
          </SecondCardItem>
          <SecondCardItem>
            <SecondCardItemLeftText>制单号</SecondCardItemLeftText>
            <span>{sewingDataSecond.moNo || '/'}</span>
          </SecondCardItem>
          <SecondCardItem>
            <SecondCardItemLeftText>款号</SecondCardItemLeftText>
            <span>{sewingDataSecond.styleNo || '/'}</span>
          </SecondCardItem>
        </SecondCard>
        <ThirdCard>
          <ThirdCardItem>
            <div>颜色</div>
            <ThirdCardItemDetail>
              {sewingDataSecond.color || '/'}
            </ThirdCardItemDetail>
          </ThirdCardItem>
          <BoxSize></BoxSize>
          <ThirdCardItem>
            <div>尺码</div>
            <ThirdCardItemDetail>
              {sewingDataSecond.size || '/'}
            </ThirdCardItemDetail>
          </ThirdCardItem>
        </ThirdCard>
        <FourthCard>
          <FourthCardItem>
            <span>PO号</span>
            <FourthCardItemDetail>
              {sewingDataSecond.poNo || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
          <FourthCardItem>
            <span>床号</span>
            <FourthCardItemDetail>
              {sewingDataSecond.cutterNo || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
          <FourthCardItem>
            <span>数量</span>
            <FourthCardItemDetail>
              {sewingDataSecond.quantity || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
          <FourthCardItem>
            <span>工序号</span>
            <FourthCardItemDetail>
              {sewingDataSecond.seqNo || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
          <FourthCardItem>
            <span>工序名称</span>
            <FourthCardItemDetail>
              {sewingDataSecond.seqName || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
          <FourthCardItem>
            <span>工序产量</span>
            <FourthCardItemDetail>
              {sewingDataSecond.seqOutputQty || '0'}
            </FourthCardItemDetail>
          </FourthCardItem>
        </FourthCard>
      </MainLCard>
    </div>
  )
}

const MainLCard = styled.div`
  width: 38rem;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  padding: 1.5rem;
`

const CardTitle = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  color: #333333;
  display: flex;
  align-items: center;
`

const CardColorLine = styled.div`
  width: 0.3rem;
  height: 2.2rem;
  background: #3b80ff;
  margin-right: 1rem;
`

const SecondCard = styled.div`
  padding: 0.75rem;
  background: url(${SecondBgImg}) no-repeat;
  background-size: 100%;
  font-size: 1.8rem;
`

const SecondCardItem = styled.div`
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  color: white;
`

const SecondCardItemLeftText = styled.span`
  color: #c6ddff;
`

const ThirdCard = styled.div`
  display: flex;
  padding: 1.5rem 0;
  width: 100%;
  font-size: 2rem;
`

const BoxSize = styled.div`
  width: 1rem;
  height: 100%;
`

const ThirdCardItem = styled.div`
  flex: 1;
  padding: 1.5rem;
  color: #6a8aba;
  background-color: #f5f7fb;
`

const ThirdCardItemDetail = styled.div`
  color: #595959;
`

const FourthCard = styled.div`
  padding: 0.75rem 0;
  font-size: 2.4rem;
`

const FourthCardItem = styled.div`
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
  color: #6a8aba;
`

const FourthCardItemDetail = styled.span`
  color: #595959;
  width: 22rem;
  text-overflow: ellipsis;
  overflow: hidden;
`
