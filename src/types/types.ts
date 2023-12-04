export interface User {
  id: number
  username: string
  password: string
}

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
