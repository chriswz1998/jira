import { TableStage } from '../../components/task-components/table-stage'
import styled from '@emotion/styled'

export const TaskStage = () => {
  return (
    <Container>
      <TableStage />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
`
