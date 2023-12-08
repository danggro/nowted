import styled from 'styled-components'
import * as palette from '../../../assets/Variables'
import NoteNoView from './NoteNoView'
import { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../../../context/NoteContext'
import { NotesContext } from '../../../context/NotesContext'
import ThreeDotButton from './ThreeDotButton'
import {
  checkDate,
  complianceDate,
  getLocalSession,
  styleInputDate,
} from '../../../utils/utils'
import { Note } from '../../../types/types'
import InputDate from './InputDate'
import NotifSaved from './NotifSaved'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 50px;
  position: relative;
  & > div:first-child {
    position: relative;
    &::after {
      content: 'Title cannot be empty';
      color: ${palette.RED};
      position: absolute;
      bottom: -20px;
      left: 0;
      opacity: var(--opacityErrNote, 0);
    }
  }
`
const InputTitle = styled.input`
  font-size: 2rem;
  font-weight: 600;
  width: 95%;
  border-bottom: 2px solid transparent;
  &:focus {
    border-bottom: 2px solid ${palette.BLACK_TERTIARY};
  }
`

const InputContent = styled.textarea`
  width: 100%;
  height: 100%;
  line-height: 1.75;
  padding-left: 5px;
  margin-left: -5px;
  border-left: 2px solid transparent;
  &:focus {
    border-left: 2px solid ${palette.BLACK_TERTIARY};
    background-color: ${palette.BLACK_SECONDARY};
  }
`

const NoteView = () => {
  const { note, setNote } = useContext(NoteContext)
  const { updateNote, addNote } = useContext(NotesContext)
  const [title, setTitle] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [noteSaved, setNoteSaved] = useState<Boolean>(false)

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
      userId: localSession.token,
    }

    let timeout = setTimeout(() => {
      const titleElement = document.getElementById('title')
        ?.parentElement as HTMLDivElement
      if (!title) return styleInputDate(titleElement).invalid()
      styleInputDate(titleElement).valid()

      const dateElement = document.getElementById('date') as HTMLDivElement
      const dateChecked = checkDate(date)
      if (!dateChecked) return styleInputDate(dateElement).invalid()
      styleInputDate(dateElement).valid()

      if (
        note.title === title &&
        note.date === date &&
        note.content === content
      )
        return null
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
      <div>
        <InputTitle
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <InputDate date={date} setDate={setDate} />
      <InputContent
        id="content"
        name="content"
        placeholder="Write in"
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
      {note.title && <ThreeDotButton />}
      <NotifSaved noteSaved={noteSaved} />
    </Container>
  )
}
export default NoteView
