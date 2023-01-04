import styled from '@emotion/styled'
import { Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { IncreaseDecreaseInp } from '../Increase-or-Decrease-Input'
import { HeightBtn } from '../../utils/global.antd'
import {
  RIGHT_CONFIG,
  TableItems,
} from '../../screens/sewing-page/inspection-stage'
import { useAuth } from '../../context/anth-context'
import { useAsync } from '../../utils/use-async'
import { useHttp } from '../../utils/http'

export const RightStage = ({
  rightList,
  setRightList,
  fail_num,
  set_fail_num,
  commit_msg,
  record_defect,
}: {
  rightList: RIGHT_CONFIG[]
  setRightList: (data: RIGHT_CONFIG[]) => void
  fail_num: number
  set_fail_num: (data: number) => void
  commit_msg: () => void
  record_defect: () => void
}) => {
  const { clear_table, set_clear_table, HttpDefaultPoint } = useAuth()
  const { run, isLoading } = useAsync()
  const clint = useHttp()

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
  const is_selected_click = (i: any) => {
    const a = rightList.map((item, index) => {
      if (index == i) {
        item.selected = !item.selected
      }
      return item
    })
    setRightList(a)
  }

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

  const all_clear = () => {
    const a = rightList.map((item, index) => {
      item.selected = false
      return item
    })
    setRightList(a)
    set_clear_table(!clear_table)
  }

  const onChange = () => {
    console.log('🚀 ~ file: right-stage.tsx ~ line 7 ~ onChange ~ 1', 111)
  }

  return (
    <Container>
      <TopSwitch>
        <TSItem>
          自动出衣{' '}
          <TSISwitch
            loading={isLoading}
            checked={auto_out_cloth_check}
            onChange={auto_out_cloth}
          />
        </TSItem>
        <TSItem>
          接收衣架{' '}
          <TSISwitch
            loading={isLoading}
            checked={receive_coat_hanger_check}
            onChange={receive_coat_hanger}
          />
        </TSItem>
      </TopSwitch>
      <BotOptions>
        <TLTitle>
          <TLLine></TLLine>
          <span>不良品问题</span>
        </TLTitle>

        <SelectContainer>
          <SCItemContainer>
            {rightList.map((item, index) => {
              return (
                <IsSelected
                  selected={item.selected}
                  key={index}
                  onClick={(item) => is_selected_click(index)}
                >
                  {item.name}
                </IsSelected>
              )
            })}
          </SCItemContainer>
          <InpItem>
            <span>不良品件数:</span>
            <IncreaseDecreaseInp
              max={fail_num}
              stateValue={fail_num}
              stateFunc={set_fail_num}
            />
          </InpItem>
          <DBtnContainer>
            <HeightBtn type="primary" ghost onClick={all_clear}>
              全部清除
            </HeightBtn>
            <DBtnCBoxSize></DBtnCBoxSize>
            <HeightBtn type="primary" ghost onClick={record_defect}>
              疵点登记
            </HeightBtn>
          </DBtnContainer>
          <HeightBtn type="primary" block onClick={commit_msg}>
            提交返工
          </HeightBtn>
        </SelectContainer>
      </BotOptions>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`

const TopSwitch = styled.div`
  background: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  font-size: 24px;
  color: #333333;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
`

const TSItem = styled.div`
  display: flex;
  align-items: center;
`

const TSISwitch = styled(Switch)`
  margin-left: 1rem;
`

const BotOptions = styled.div`
  flex: 1;
  margin-top: 1.5rem;
  font-size: 2.4rem;
  line-height: 2.4rem;
  background: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  padding: 1.5rem;
`

const TLLine = styled.span`
  display: inline-block;
  width: 0.3rem;
  height: 2.4rem;
  background: #3b80ff;
  margin-right: 1rem;
`

const TLTitle = styled.div`
  display: flex;
  align-items: center;
`

const InpItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.4rem;
  margin: 1.5rem 0;
`

const SelectContainer = styled.div`
  width: 100%;
  padding: 1.5rem 0;
`

const SCItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 1px solid #e4e8f3;
`
const IsSelected = styled.div<{ selected?: boolean }>`
  width: 48%;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  text-align: center;
  color: ${(props) => (props.selected ? '#FFFFFF' : '')};
  background: ${(props) => (props.selected ? '#3B80FF' : '#F7F7F7')};
  border-radius: 0.6rem;
  margin-bottom: 1.5rem;
`

const DBtnContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`

const DBtnCBoxSize = styled.div`
  width: 3rem;
  height: 100%;
`
