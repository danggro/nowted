import styled from 'styled-components'
import * as palette from '../../../assets/Variables'
import NoteNoView from './NoteNoView'
import { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../../../context/NoteContext'
import { NotesContext } from '../../../context/NotesContext'
import ThreeDotButton from './ThreeDotButton'
import { getLocalSession } from '../../../utils/utils'
import { Note } from '../../../types/types'
import InputDate from './InputDate'

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

  const handleOnBlur = (e: React.FocusEvent) => {
    const titleElement = document.getElementById('title')?.parentElement
    if (!title) return titleElement?.style.setProperty('--opacityErrNote', '1')
    titleElement?.style.setProperty('--opacityErrNote', '0')

    const day = String(new Date().getDate())
    const month = String(new Date().getMonth())
    const year = String(new Date().getFullYear())

    const addZeroDate = (date: string): string => {
      return date.length === 1 ? '0' + date : date
    }

    const defaultDate = `${addZeroDate(day)}/${addZeroDate(month)}/${year}`
    const baseNote = {
      title,
      date: date ? date : defaultDate,
      content,
      userId: localSession.token,
    }

    if (note.id) {
      handleUpdateNoteAndNotes(baseNote)
    } else {
      handleNewNote(baseNote)
    }
  }

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
          onBlur={handleOnBlur}
        />
      </div>
      <InputDate date={date} setDate={setDate} onBlur={handleOnBlur} />
      <InputContent
        id="content"
        name="content"
        placeholder="Write in"
        value={content}
        onChange={({ target }) => setContent(target.value)}
        onBlur={handleOnBlur}
      />
      {note.title && <ThreeDotButton />}
    </Container>
  )
}
export default NoteView
