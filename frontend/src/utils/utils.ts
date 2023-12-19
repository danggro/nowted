import * as palette from '../assets/Variables'
import { Session } from '../types/types'

export const handleInputAuth = (
  e: React.FormEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  const element = e.currentTarget as HTMLInputElement
  const nextElement = e.currentTarget.nextElementSibling as HTMLSpanElement
  setState(element.value)

  if (!element.checkValidity()) {
    if (element.validity.tooShort) {
      // nextElement.textContent = 'Minimum 8 character'
    }

    if (element.validity.typeMismatch)
      nextElement.textContent = 'Email not valid'
    return inValidStyleInputAuth(element)
  }
  if (!element.value) {
    nextElement.textContent = 'Please fill this input form'
    return inValidStyleInputAuth(element)
  }
  validStyleInputAuth(element)
}

const inValidStyleInputAuth = (element: HTMLInputElement) => {
  element?.style.setProperty('border-color', palette.RED)
  element?.style.setProperty('--placeholderColor', palette.RED)
  element?.style.setProperty('color', palette.RED)
}

const validStyleInputAuth = (element: HTMLInputElement) => {
  element?.parentElement?.setAttribute('data-errmsg', '')
  element?.style.setProperty('border-color', palette.WHITE)
  element?.style.setProperty('--placeholderColor', palette.WHITE)
  element?.style.setProperty('color', palette.WHITE)
}

export const setErrorInputAuth = (
  message: string,
  element: HTMLInputElement
) => {
  inValidStyleInputAuth(element)
  const nextElement = element.nextElementSibling as HTMLSpanElement
  nextElement.textContent = message
}

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

export const handleInputDate = (
  e: React.ChangeEvent<HTMLInputElement>,
  condition: number,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  let value = e.target.value
  const errorElement = e.target.parentElement?.parentElement
    ?.lastChild as HTMLSpanElement
  const nextInput = e.target.nextSibling?.nextSibling as HTMLInputElement

  // limit maxlength input
  if (value.length > e.target.maxLength) {
    value = value.slice(0, e.target.maxLength)
  }

  setState(value)

  if (Number(value) > condition || Number(value) === 0) {
    styleInputError(errorElement).invalid('Date not valid')
  } else {
    styleInputError(errorElement).valid()

    if (value.length === e.target.maxLength && e.target.id !== 'year') {
      nextInput.focus()
    }
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

export const styleInputError = (element: HTMLSpanElement) => {
  const style = (opacity: number) => {
    element?.style.setProperty('--opacityErrNote', `${opacity}`)
  }
  const invalid = (message: string) => {
    style(1)
    element.textContent = message
  }
  const valid = () => {
    style(0)
    element.textContent = ''
  }
  return { valid, invalid }
}
