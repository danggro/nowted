import styled from 'styled-components'
import NoteNoView from './NoteNoView'
import { useContext, useEffect, useState } from 'react'
import { NoteContext } from 'context/NoteContext'
import { NotesContext } from 'context/NotesContext'
import ThreeDotButton from './ThreeDotButton'
import {
  checkDate,
  complianceDate,
  getLocalSession,
  styleInputError,
} from 'utils/utils'
import { Note } from 'types/types'
import InputDate from './InputDate'
import NotifSaved from './NotifSaved'
import InputTitle from './InputTitle'
import InputContent from './InputContent'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 50px;
  position: relative;
`

const NoteView = () => {
  const { note, setNote } = useContext(NoteContext)
  const { updateNote, addNote } = useContext(NotesContext)
  const [title, setTitle] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [noteSaved, setNoteSaved] = useState<boolean>(false)

  const localSession = getLocalSession()

  useEffect(() => {
    if (
      note.title !== undefined &&
      note.date !== undefined &&
      note.content !== undefined
    ) {
      setTitle(note.title)
      setDate(note.date)
      setContent(note.content)
    }
  }, [note])

  const handleUpdateNoteAndNotes = async (baseNote: Note) => {
    const updatedNote = {
      ...baseNote,
      id: note.id,
    }
    updateNote(updatedNote)
  }

  const handleNewNote = async (baseNote: Note) => {
    const data = await addNote(baseNote)
    setNote({ ...data, view: true })
  }

  useEffect(() => {
    const baseNote = {
      title,
      date: complianceDate(date),
      content,
      userId: localSession?.token,
    }

    const timeout = setTimeout(() => {
      if (
        note.title === title &&
        note.date === date &&
        note.content === content
      ) {
        return null
      }

      const titleElement = document.getElementById('title')
        ?.nextElementSibling as HTMLSpanElement
      if (!title)
        return styleInputError(titleElement).invalid('Title is missing')
      styleInputError(titleElement).valid()

      const dateElement = document.getElementById('date')
        ?.lastChild as HTMLSpanElement
      const dateChecked = checkDate(date)
      if (!dateChecked)
        return styleInputError(dateElement).invalid('Date not valid')
      styleInputError(dateElement).valid()

      if (note.id) {
        handleUpdateNoteAndNotes(baseNote)
      } else {
        handleNewNote(baseNote)
      }
      setNoteSaved(true)
      setTimeout(() => setNoteSaved(false), 2500)
    }, 5000)
    return () => clearTimeout(timeout)
  }, [title, date, content])

  if (!note.view) {
    return <NoteNoView />
  }

  return (
    <Container>
      <InputTitle value={title} setState={setTitle} />
      <InputDate date={date} setDate={setDate} />
      <InputContent value={content} setState={setContent} />
      {note.title && <ThreeDotButton />}
      <NotifSaved noteSaved={noteSaved} />
    </Container>
  )
}
export default NoteView
