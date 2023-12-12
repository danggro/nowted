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
