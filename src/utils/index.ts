import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => callback(), [])
}

export const useDebounce = <V>(param: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(param)
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(param), delay)
    return () => clearTimeout(timeout)
  }, [param, delay])
  return debouncedValue
}
