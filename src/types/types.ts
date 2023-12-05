export interface NoteType {
  id: number
  title: string
  date: string
  content: string
}

export type NoteFormType = Omit<NoteType, 'id'>

export interface CredentialsLogin {
  username: string
  password: string
}

export interface Session {
  username: string
  token: string
}

export interface User {
  id: number
  username: string
  email: string
  created_at: string
  password: string
}

export type UserForm = Omit<User, 'id' | 'created_at'>
