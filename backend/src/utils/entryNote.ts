import { NoteForm } from '../types'
import { isString } from './utils'

const parseTitle = (value: unknown, what: string): string => {
  if (!isString(value)) throw new Error(`Value of ${what} incorrect: ${value}`)
  return value
}

const formatDate = (date: string): Boolean => {
  const dateSplit = date.split('')
  if (dateSplit[2] !== '/' || dateSplit[5] !== '/') return false
  return true
}

const parseDate = (value: unknown, what: string): string => {
  if (!isString(value) || !formatDate(value))
    throw new Error(`Value of ${what} incorrect: ${value}`)
  return value
}

const parseContent = (value: unknown, what: string): string => {
  if (!isString(value)) throw new Error(`Value of ${what} incorrect: ${value}`)
  return value
}

const toNewNote = (object: unknown): NoteForm => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (!('title' in object)) throw new Error('Title missing')
  if (!('date' in object)) throw new Error('Date missing')
  if (!('content' in object)) throw new Error('Content missing')

  return {
    title: parseTitle(object.title, 'title'),
    date: parseDate(object.date, 'date'),
    content: parseContent(object.content, 'content'),
  }
}

export default toNewNote
