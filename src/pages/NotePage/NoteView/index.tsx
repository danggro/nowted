import styled from 'styled-components'
import * as palette from '../../../assets/Variables'
import NoteNoView from './NoteNoView'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
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
`

const Input = styled.input`
  color: ${palette.WHITE};
`

const InputTitle = styled(Input)`
  font-size: 2rem;
  font-weight: 600;
`

const InputContent = styled.textarea`
  width: 100%;
  height: 100%;
  line-height: 1.75;
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

  const handleOnBlur = () => {
    if (!title) throw new Error('Tittle cannot be blank')
    const dateNow = new Date().toLocaleDateString().split('/')
    const defaultDate = `${dateNow[1]}/${dateNow[0]}/${dateNow[2]}`
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
      {note.title && <ThreeDotButton />}
      <InputTitle
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        onBlur={handleOnBlur}
      />
      <InputDate date={date} setDate={setDate} onBlur={handleOnBlur} />
      <InputContent
        id="content"
        name="content"
        placeholder="Write in"
        value={content}
        onChange={({ target }) => setContent(target.value)}
        onBlur={handleOnBlur}
      />
    </Container>
  )
}
export default NoteView
