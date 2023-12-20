import { Session } from '../types/types'

export const getLocalSession = (): Session | null => {
  const storage = localStorage.getItem('loggedUser')
  if (!storage) return null
  const session = JSON.parse(storage)
  return session
}

export const preventPressNumber = (e: React.KeyboardEvent) => {
  if (
    isNaN(Number(e.key)) &&
    e.key !== 'Backspace' &&
    e.key !== 'Tab' &&
    e.key !== 'ArrowLeft' &&
    e.key !== 'ArrowRight'
  ) {
    e.preventDefault()
    return false
  }
}

const getDefaultDate = (): string => {
  const day = String(new Date().getDate())
  const month = String(new Date().getMonth() + 1)
  const year = String(new Date().getFullYear())

  const addZeroDate = (date: string): string => {
    return date.length === 1 ? '0' + date : date
  }

  return `${addZeroDate(day)}/${addZeroDate(month)}/${year}`
}

export const checkDate = (date: string): boolean => {
  if (date === '') return true
  const dateSplit = date.split('/')
  const day = dateSplit[0]
  const month = dateSplit[1]
  const year = dateSplit[2]
  if (!Number(day) || !Number(month) || !Number(year)) return false
  if (Number(day) > 31) return false
  if (Number(month) > 12) return false
  if (Number(year) > new Date().getFullYear()) return false
  return true
}

export const complianceDate = (date: string): string => {
  if (!date || date === '//') return getDefaultDate()
  const dateSplit = date.split('/')
  let day = dateSplit[0]
  let month = dateSplit[1]
  if (day.length === 1) day = `0${day}`
  if (month.length === 1) month = `0${month}`
  return `${day}/${month}/${dateSplit[2]}`
}
