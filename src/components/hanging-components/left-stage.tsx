import styled from '@emotion/styled'
import SecondBgImg from '../../assets/Group8@2x.png'
import { SewingDataSecond } from '../../screens/sewing-page'

export const LeftStage = ({
  hangDataSecond,
}: {
  hangDataSecond: SewingDataSecond
}) => {
  return (
    <div>
      <MainLCard>
        <CardTitle>
          <CardColorLine></CardColorLine>款式信息
        </CardTitle>
        <SecondCard>
          <SecondCardItem>
            <SecondCardItemLeftText>排产单号</SecondCardItemLeftText>
            <span>{hangDataSecond.scheduleBillNo || '/'}</span>
          </SecondCardItem>
          <SecondCardItem>
            <SecondCardItemLeftText>制单号</SecondCardItemLeftText>
            <span>{hangDataSecond.moNo || '/'}</span>
          </SecondCardItem>
          <SecondCardItem>
            <SecondCardItemLeftText>款号</SecondCardItemLeftText>
            <span>{hangDataSecond.styleNo || '/'}</span>
          </SecondCardItem>
        </SecondCard>
        <FourthCard>
          <FourthCardItem>
            <span>颜色</span>
            <FourthCardItemDetail>
              {hangDataSecond.color || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
          <FourthCardItem>
            <span>尺码</span>
            <FourthCardItemDetail>
              {hangDataSecond.size || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
          <FourthCardItem>
            <span>PO号</span>
            <FourthCardItemDetail>
              {hangDataSecond.poNo || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
          <FourthCardItem>
            <span>床号</span>
            <FourthCardItemDetail>
              {hangDataSecond.cutterNo || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
        </FourthCard>
      </MainLCard>
      <div style={{ marginTop: '1.5rem' }}></div>
      <MainLCard>
        <CardTitle>
          <CardColorLine></CardColorLine>挂片指导
        </CardTitle>
        <FourthCard>
          <FourthCardItem>
            <span>工序</span>
            <FourthCardItemDetail>
              {hangDataSecond.seqNo || '/'},{hangDataSecond.seqName || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
          <FourthCardItem>
            <span>要求</span>
            <FourthCardItemDetail>
              {hangDataSecond.remark || '/'}
            </FourthCardItemDetail>
          </FourthCardItem>
        </FourthCard>
      </MainLCard>
    </div>
  )
}

const MainLCard = styled.div`
  width: 38rem;
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
  width: 35.2rem;
  height: 16rem;
  padding: 0.75rem;
  box-sizing: border-box;
  background: url(${SecondBgImg}) no-repeat;
  background-size: 100%;
  font-size: 2.4rem;
`

const SecondCardItem = styled.div`
  width: 100%;
  height: 33%;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`

const SecondCardItemLeftText = styled.span`
  color: #c6ddff;
`

const FourthCard = styled.div`
  padding: 0.75rem;
  font-size: 2.4rem;
`

const FourthCardItem = styled.div`
  padding: 0.75rem;
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
