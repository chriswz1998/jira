import { LeftStage } from '../../components/sewing-components/left-stage'
import { RightStage } from '../../components/sewing-components/right-stage'
import styled from '@emotion/styled'
import { SewingDataFirst, SewingDataSecond } from './index'

export const SewingStage = ({
  sewingDataFirst,
  sewingDataSecond,
}: {
  sewingDataFirst: SewingDataFirst
  sewingDataSecond: SewingDataSecond
}) => {
  return (
    <Container>
      <LeftStage sewingDataSecond={sewingDataSecond} />
      <RightStage
        sewingDataFirst={sewingDataFirst}
        sewingDataSecond={sewingDataSecond}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding: 0 2rem;
  width: 100%;
  height: calc(100vh - 10rem);
`
