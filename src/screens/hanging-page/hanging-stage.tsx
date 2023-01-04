import styled from '@emotion/styled'
import { LeftStage } from 'components/hanging-components/left-stage'
import { RightStage } from 'components/hanging-components/right-stage'
import { HangDataFirst } from './index'
import { SewingDataSecond } from '../sewing-page'

export const HangingStage = ({
  hangDataFirst,
  hangDataSecond,
}: {
  hangDataFirst: HangDataFirst
  hangDataSecond: SewingDataSecond
}) => {
  return (
    <Container>
      <LeftStage hangDataSecond={hangDataSecond} />
      <RightStage
        hangDataFirst={hangDataFirst}
        hangDataSecond={hangDataSecond}
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
