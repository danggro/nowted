import { UserForm } from '../types'
import { isString } from './utils'

const parseUsername = (value: unknown, what: string): string => {
  if (!isString(value)) throw new Error(`Value of ${what} incorrect: ${value}`)
  return value
}

const parseEmail = (value: unknown, what: string): string => {
  if (!isString(value)) throw new Error(`Value of ${what} incorrect: ${value}`)
  return value
}

const parsePassword = (value: unknown, what: string): string => {
  if (!isString(value)) throw new Error(`Value of ${what} incorrect: ${value}`)
  return value
}

const parseUser = (object: unknown): UserForm => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (!('username' in object)) throw new Error('Username missing')
  if (!('email' in object)) throw new Error('Email missing')
  if (!('password' in object)) throw new Error('Password missing')

  return {
    username: parseUsername(object.username, 'username'),
    email: parseEmail(object.email, 'email'),
    password: parsePassword(object.password, 'password'),
  }
}

export default parseUser
