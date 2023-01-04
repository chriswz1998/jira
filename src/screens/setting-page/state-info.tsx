import { Divider } from 'antd'
import styled from '@emotion/styled'
import { IncreaseDecreaseInp } from '../../components/Increase-or-Decrease-Input'

export const StateInfo = ({
  trackQty,
  setTrackQty,
  stationQty,
  setStationQty,
  capacity,
  setCapacity,
}: {
  trackQty: number
  setTrackQty: (value: number) => void
  stationQty: number
  setStationQty: (value: number) => void
  capacity: number
  setCapacity: (value: number) => void
}) => {
  return (
    <Container>
      <InpItem>
        <span>线上衣架数:</span>
        <IncreaseDecreaseInp stateValue={trackQty} stateFunc={setTrackQty} />
      </InpItem>
      <Divider />

      <InpItem>
        <span>站内衣架数:</span>
        <IncreaseDecreaseInp
          stateValue={stationQty}
          stateFunc={setStationQty}
        />
      </InpItem>
      <Divider />

      <InpItem>
        <span>站点容量显示:</span>
        <IncreaseDecreaseInp stateValue={capacity} stateFunc={setCapacity} />
      </InpItem>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 2.5rem;
  box-sizing: border-box;
`
const InpItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.4rem;
`
