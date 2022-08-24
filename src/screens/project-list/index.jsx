import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from 'react'
import qs from 'qs'
import { cleanObject } from '../../utils'

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json())
        }
      }
    )
  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [])
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  )
}
