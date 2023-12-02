export interface NoteType {
  id: number
  title: string
  date: string
  content: string
}

export type NoteFormType = Omit<NoteType, 'id'>
