import styled from '@emotion/styled'
import { LeftStage } from 'components/inspection-components/left-stage'
import { RightStage } from 'components/inspection-components/right-stage'
import { useHttp } from '../../utils/http'
import { useState } from 'react'
import { useMount } from '../../utils'
import { useAuth } from '../../context/anth-context'
import { message } from 'antd'

export interface RIGHT_CONFIG {
  code?: string
  id?: string
  name?: string
  remark?: string | null
  sort?: number
  status?: number
  selected?: boolean
}

export interface TableItems {
  failCode?: any
  opNo: string | undefined
  redoQty?: number
  defectIds?: object
  hangerNo?: string
  lineNo?: number
  processCode?: string
  processId?: number
  processName?: string
  processNo?: string
  scheduleId?: number
  staffId?: number
  staffName?: string
  staffNo?: string
  stationNo?: number
}

export const InspectionStage = () => {
  const [leftTable, setLeftTable] = useState<TableItems[]>([])
  const [rightList, setRightList] = useState<RIGHT_CONFIG[]>([])
  const [selected_rows, set_selected_rows] = useState<TableItems[]>([])
  const [fail_num, set_fail_num] = useState(0)
  const [hangerNo, set_hangerNo] = useState('')

  const clint = useHttp()
  const { HttpDefaultPoint } = useAuth()

  const get_defect_list = async () => {
    const res = (await clint('api/pad/get-defect-list', {
      method: 'POST',
    })) as RIGHT_CONFIG[]
    const a = res.map((item) => {
      item.selected = false
      return item
    })
    setRightList(a)
  }

  const get_completed_process = async () => {
    const { completedProcessList, hangerParcelQty, hangerNo } = await clint(
      'api/pad/get-completed-process',
      { method: 'POST' }
    )
    setLeftTable(completedProcessList)
    set_fail_num(hangerParcelQty)
    set_hangerNo(hangerNo)
  }

  const commit_msg = async () => {
    if (selected_rows.length === 0) {
      message.warning('请选择返工工序！')
      return
    }

    const c_list = rightList
      .filter((item) => item.selected === true)
      .map((item) => {
        return item.code
      })

    if (c_list.length === 0) {
      message.warning('请选择疵点！')
      return
    }
    if (fail_num === 0) {
      message.warning('当前不良品记数为0！')
      return
    }
    const list = selected_rows.map((item) => {
      item.redoQty = fail_num
      item.opNo = item.processNo
      item.failCode = c_list
      return item
    })
    const data = {
      hangerNo,
      redoInfo: list,
      line: HttpDefaultPoint?.lineNo,
      station: HttpDefaultPoint?.stationNo,
      type: 1,
    }
    const res = await clint('api/three-screen/up-redo-info', {
      method: 'POST',
      data,
    })
    if (res) {
      message.success('返工成功！')
      get_completed_process().then()
      get_defect_list().then()
    }
  }

  const record_defect = async () => {
    if (selected_rows.length === 0) {
      message.warning('请选择返工工序！')
      return
    }

    const c_list = rightList
      .filter((item) => item.selected === true)
      .map((item) => {
        return item.id
      })

    if (c_list.length === 0) {
      message.warning('请选择疵点！')
      return
    }

    if (fail_num === 0) {
      message.warning('当前不良品记数为0！')
      return
    }

    const list = selected_rows.map((item) => {
      return item.processId
    })

    const data = {
      hangerNo,
      processIds: list,
      defectIds: c_list,
    }
    const res = await clint('api/pad/record-defect', { method: 'POST', data })
    console.log(
      '🚀 ~ file: inspection-stage.tsx ~ line 101 ~ commit_msg ~ res',
      res
    )

    if (res) {
      message.success('登记成功！')
      get_completed_process().then()
      get_defect_list().then()
    }
  }

  useMount(() => {
    get_completed_process().then()
    get_defect_list().then()
  })

  return (
    <Container>
      <LeftStage leftTable={leftTable} set_selected_rows={set_selected_rows} />
      <RightStage
        commit_msg={commit_msg}
        rightList={rightList}
        setRightList={setRightList}
        fail_num={fail_num}
        set_fail_num={set_fail_num}
        record_defect={record_defect}
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
