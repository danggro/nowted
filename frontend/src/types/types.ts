import { AxiosResponse } from 'axios'

export interface Note {
  id?: number
  title: string
  date: string
  content: string
  userId?: number //deleted after backend finish
}

export interface NoteState extends Note {
  view: boolean
}

export type NoteForm = Omit<Note, 'id'>

export interface CredentialsLogin {
  username: string
  password: string
}

export interface Session {
  username: string
  accessToken: string
  userId: number
}

export interface User {
  id: number
  username: string
  email: string
  created_at: string
  password: string
}

export type UserForm = Omit<User, 'id' | 'created_at'>
export type UserData = Omit<User, 'password' | 'email' | 'created_at'>

export interface Response {
  error: string | null
  data: AxiosResponse | null
}

export interface Folder {
  id: number
  name: string
  userId: number
}

export type FolderForm = Omit<Folder, 'id' | 'userId'>

export interface FolderView extends Folder {
  active: Boolean
}
