export interface User {
  id: number
  username: string
  email: string
  password: string
}

export type UserForm = Omit<User, 'id'>

export type UserLogin = Omit<User, 'id' | 'email'>

export interface Session {
  username: string
  userId: number
  token: string
}

export interface Note {
  id: number
  title: string
  date: string
  content: string
  userId: number
}

export type NoteForm = Omit<Note, 'id' | 'userId'>

export enum Environment {
  Development = 'development',
  Production = 'production',
}
