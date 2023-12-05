export interface Note {
  id: number
  title: string
  date: string
  content: string
  userId: number //deleted after backend finish
}

export type NoteView = Omit<Note, 'userId'>

export type NoteForm = Omit<Note, 'id'>

export interface CredentialsLogin {
  username: string
  password: string
}

export interface Session {
  username: string
  token: number
}

export interface User {
  id: number
  username: string
  email: string
  created_at: string
  password: string
}

export type UserForm = Omit<User, 'id' | 'created_at'>
