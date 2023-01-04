import { Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useDebounce, useMount } from '../../utils'
import { useHttp, useHttp2 } from '../../utils/http'
import { useAsync } from '../../utils/use-async'
import { HeightBtn, HeightInp } from '../../utils/global.antd'
import { useAuth } from '../../context/anth-context'

interface DataType {
  lineNo?: number
  scheduleBillId?: string
  color?: string
  hangParcelStatus?: number
  id?: string
  moDetailId?: string
  moId?: string
  moNo?: string
  moStyleId?: string
  poNo?: string
  productType?: string
  roadMapId?: string
  roadMapName?: string
  roadmapList?: any
  scheduleBillNo?: string
  size?: string
  status?: number
  styleNo?: string
}

export const TableStage = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '排产单号',
      dataIndex: 'scheduleBillNo',
      key: 'scheduleBillNo',
      onCell: () => {
        return {
          style: {
            maxWidth: '14rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        }
      },
    },
    {
      title: '款号',
      dataIndex: 'styleNo',
      key: 'styleNo',
      onCell: () => {
        return {
          style: {
            maxWidth: '7rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        }
      },
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
      onCell: () => {
        return {
          style: {
            maxWidth: '4rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        }
      },
    },
    {
      title: '尺码',
      dataIndex: 'size',
      key: 'size',
      onCell: () => {
        return {
          style: {
            maxWidth: '4rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        }
      },
    },
    {
      title: 'PO号',
      dataIndex: 'poNo',
      key: 'poNo',
      onCell: () => {
        return {
          style: {
            maxWidth: '7rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        }
      },
    },
    {
      title: '床号',
      dataIndex: 'cutterNo',
      key: 'cutterNo',
      onCell: () => {
        return {
          style: {
            maxWidth: '7rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        }
      },
    },
    {
      title: '任务数量',
      dataIndex: 'produceQty',
      key: 'produceQty',
      onCell: () => {
        return {
          style: {
            maxWidth: '7rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        }
      },
    },
    {
      title: '上架数量',
      dataIndex: 'finishedQty',
      key: 'finishedQty',
      onCell: () => {
        return {
          style: {
            maxWidth: '7rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'size',
      key: 'size',
      render(_, record: DataType) {
        const { hangParcelStatus } = record
        return hangParcelStatus === 1 ? (
          <HeightBtn
            style={{ width: '10rem' }}
            type="primary"
            ghost
            onClick={() => cancel(record)}
          >
            取消
          </HeightBtn>
        ) : (
          <HeightBtn
            style={{ width: '10rem' }}
            type="primary"
            onClick={() => isClicks(record)}
          >
            挂片
          </HeightBtn>
        )
      },
      onCell: () => {
        return {
          style: {
            maxWidth: '8rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        }
      },
    },
  ]
  const clint = useHttp()
  const clint2 = useHttp2()
  const { HttpDefaultPoint } = useAuth()
  const { run, isLoading } = useAsync()
  const [tableData, setTableData] = useState<DataType[]>([])
  const [search_value, set_search_value] = useState('')

  const auto_out_cloth = async () => {
    const res = await run(
      clint('api/pad/get-online-schedulebill-by-station', { method: 'POST' })
    )
    setTableData(res)
  }

  const isClicks = async (value: DataType) => {
    const a = tableData
      .filter((item) => item.hangParcelStatus === 1)
      .map((item) => {
        return {
          hangParcelStatus: 0,
          lineNo: HttpDefaultPoint?.lineNo,
          stationId: HttpDefaultPoint?.stationId,
          scheduleBillId: item.id,
        }
      })
    const b = {
      scheduleBillId: value.id,
      lineNo: HttpDefaultPoint?.lineNo,
      stationId: HttpDefaultPoint?.stationId,
      hangParcelStatus: 1,
    }
    const obj = [...a, b]
    await cloth_up(obj)
  }

  const cloth_up = async (obj: DataType[]) => {
    const res = await run(
      clint2('api/pad/hang-parcel-putaway', { method: 'POST', data: obj })
    )
    if (res) await auto_out_cloth()
  }

  const paginationChange = (vluea: any) => {
    console.log(
      '🚀 ~ file: table-stage.tsx ~ line 222 ~ paginationChange ~ ',
      vluea
    )
  }

  const cancel = (value: DataType) => {
    console.log('🚀 ~ file: table-stage.tsx ~ line 193 ~ cancel ~ value', value)
  }

  const search = (e: any) => {
    set_search_value(e.target.value)
  }

  const do_search = () => {
    const str = ['', search_value, ''].join('.*')
    const reg = new RegExp(str)
    const newData = tableData.filter((item) =>
      reg.test(item.scheduleBillNo as string)
    )
    setTableData(newData)
  }

  const rest = async () => {
    await auto_out_cloth()
    set_search_value('')
  }

  useMount(() => {
    auto_out_cloth().then()
  })

  return (
    <Container>
      <TableTitle>
        <div style={{ display: 'flex' }}>
          <HeightInp
            style={{ width: '30rem' }}
            placeholder={'请输入排产单号'}
            value={search_value}
            onChange={search}
          />
          <HeightBtn
            style={{ width: '15rem', marginLeft: '2rem' }}
            onClick={do_search}
            type="primary"
            block
          >
            查询
          </HeightBtn>
          <HeightBtn
            style={{ width: '15rem', marginLeft: '2rem' }}
            type="primary"
            onClick={rest}
            ghost
          >
            重置
          </HeightBtn>
        </div>
      </TableTitle>
      <Table
        onChange={paginationChange}
        loading={isLoading}
        columns={columns}
        pagination={false}
        dataSource={tableData}
        scroll={{ x: 'max-content', y: 445 }}
        sticky={true}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
`

const TableTitle = styled.div`
  font-size: 2.4rem;
  line-height: 2.4rem;
  font-weight: 500;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
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

const TRText = styled.div`
  font-size: 2rem;
  color: #999999;
`

const ATable = styled(Table)`
  min-height: 100%;
`
