import { clientRedis } from '../config/redis'
import { Session } from '../types'

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

export const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number
}

export const getSession = async (token: string): Promise<Session> => {
  const session = await clientRedis.get(token)
  if (!session) throw new Error('no session in database')
  return JSON.parse(session)
}

export const getDefaultDate = (): string => {
  const day = String(new Date().getDate())
  const month = String(new Date().getMonth())
  const year = String(new Date().getFullYear())

  const addZeroDate = (date: string): string => {
    return date.length === 1 ? '0' + date : date
  }

  return `${addZeroDate(day)}/${addZeroDate(month)}/${year}`
}

export const checkDate = (date: string): boolean => {
  const dateSplit = date.split('/')
  let day = dateSplit[0]
  let month = dateSplit[1]
  let year = dateSplit[2]
  if (!Number(day) || !Number(month) || !Number(year)) return false
  if (Number(day) > 31) return false
  if (Number(month) > 12) return false
  if (Number(year) > new Date().getFullYear()) return false
  return true
}
