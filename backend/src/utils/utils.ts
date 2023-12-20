import { clientRedis } from '../config/redis'
import { Session } from '../types'

export const getSession = async (token: string): Promise<Session> => {
  const session = await clientRedis.get(token)
  if (!session) throw new Error('No session in database')
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
  const day = Number(dateSplit[0])
  const month = Number(dateSplit[1])
  const year = Number(dateSplit[2])
  if (!day || !month || !year) return false
  if (day > 31) return false
  if (month > 12) return false
  if (year > new Date().getFullYear()) return false
  return true
}
