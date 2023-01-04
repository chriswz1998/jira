import { Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { TableItems } from '../../screens/sewing-page/inspection-stage'
import moment from 'moment'
import zhCN from 'antd/es/date-picker/locale/zh_CN'
import { useAuth } from '../../context/anth-context'

moment.locale('zhCN')

const columns: ColumnsType<TableItems> = [
  {
    title: '序号',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '工序号',
    dataIndex: 'processNo',
    key: 'processNo',
  },
  {
    title: '工序名称',
    dataIndex: 'processName',
    key: 'processName',
  },
  {
    title: '站点',
    key: 'stationNo',
    dataIndex: 'stationNo',
  },
  {
    title: '员工姓名',
    key: 'staffName',
    dataIndex: 'staffName',
  },
]

export const LeftStage = ({
  leftTable,
  set_selected_rows,
}: {
  leftTable: TableItems[]
  set_selected_rows: (data: TableItems[]) => void
}) => {
  const { clear_table } = useAuth()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: TableItems[]
  ) => {
    setSelectedRowKeys(selectedRowKeys)
    set_selected_rows(selectedRows)
  }

  useEffect(() => {
    setSelectedRowKeys([])
    console.log('🚀 ~ file: left-stage.tsx ~ line 55 ~ 1111 ~ ')
  }, [clear_table])

  return (
    <Container>
      <TableTitle>
        <TLTitle>
          <TLLine></TLLine>
          <span>返工工序</span>
        </TLTitle>
        <TRText>共选择 {selectedRowKeys.length} 条</TRText>
      </TableTitle>
      <Table
        rowSelection={{
          onChange,
          selectedRowKeys,
        }}
        onRow={(record) => ({
          onClick: () => {
            console.log(record)
          },
        })}
        columns={columns}
        dataSource={leftTable}
        scroll={{ x: 'max-content', y: 520 }}
        sticky={true}
        rowKey={(record, index = 0) => index}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 79.6rem;
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
