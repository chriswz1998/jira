import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { HeightInp } from 'utils/global.antd'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { message } from 'antd'

export const IncreaseDecreaseInp = ({
  stateValue,
  stateFunc,
  max,
}: {
  stateValue: number
  stateFunc: (value: number) => void
  max?: number
}) => {
  const [num, set_num] = useState(stateValue)

  useEffect(() => set_num(~~stateValue ?? 0), [stateValue])

  const add = () => {
    if (max && stateValue >= max) {
      message.error('超出最大数量！')
      return
    }
    const num = ~~stateValue + 1
    stateFunc(num)
  }

  const reduce = () => {
    if (stateValue <= 0) return
    const num = ~~stateValue - 1
    stateFunc(num)
  }

  const onChange = (e: any) => {
    console.log(
      '🚀 ~ file: Increase-or-Decrease-Input.tsx ~ line 30 ~ onChange ~ e.target.value',
      e
    )
    if (isNaN(e.target.value)) stateFunc(0)
    stateFunc(parseInt(e.target.value, 10))
  }

  return (
    <Container>
      <IconBox>
        <MinusOutlined onClick={reduce} />
      </IconBox>
      <PrivateInp
        bordered={false}
        value={num}
        defaultValue={num}
        onChange={onChange}
      />
      <IconBox>
        <PlusOutlined onClick={add} />
      </IconBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const PrivateInp = styled(HeightInp)`
  width: 6rem;
  margin: 0 1rem;
`

const IconBox = styled.div`
  width: 3.6rem;
  height: 3.6rem;
  background: #f6f6f6;
  border-radius: 0.5rem;
  color: #3b80ff;
  display: flex;
  justify-content: center;
  align-items: center;
`
