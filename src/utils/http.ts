import qs from 'qs'
import { useAuth } from '../context/anth-context'
import { message } from 'antd'

interface Config extends RequestInit {
  token?: string
  data?: object
}

export const http = async (
  endpoint: string,
  { data, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

    ...customConfig,
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    // @ts-ignore
    config.body = JSON.stringify(data || {})
  }
  const ip = window.localStorage.getItem('IPADDRESS')
  const host = window.localStorage.getItem('HOST')

  const apiUrl = `http://${ip}:${host}`

  if (!ip) {
    message.error('请填写IP地址')
    return
  }

  if (!ip || !host) {
    message.error('请填写端口号')
    return
  }

  // @ts-ignore
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      const { msg, data, success } = await response.json()
      if (response.status === 401) {
        window.location.reload()
        return Promise.reject({ massage: '请重新登录' })
      }
      if (!success) {
        message.error(msg)
        return
      }
      // if (!data) {
      //   message.error('当前无数据')
      //   return
      // }∑
      return data
    })
    .catch((e) => {
      message.error('网络请求错误！')
    })
}

export const useHttp = () => {
  const { HttpDefaultPoint } = useAuth()
  return (...[endpoint, config]: [string, Config]) =>
    http(endpoint, {
      ...config,
      data: { ...HttpDefaultPoint, ...config.data },
    })
}

export const useHttp2 = () => {
  return (...[endpoint, config]: [string, Config]) =>
    http(endpoint, {
      ...config,
      data: config.data,
    })
}
