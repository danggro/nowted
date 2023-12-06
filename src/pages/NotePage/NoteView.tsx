import styled from 'styled-components'
import SVGDate from './SVG/SVGDate'
import * as palette from '../../assets/Variables'
import NoteNoView from './NoteNoView'
import { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../../context/NoteContext'
import notesService from '../../services/notes'
import { NotesContext } from '../../context/NotesContext'
import ThreeDotButton from './ThreeDotButton'
import { getLocalSession } from '../../utils/utils'

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
  color: var(--white);
`

const InputTitle = styled(Input)`
  font-size: 2rem;
  font-weight: 600;
`

const InputDate = styled.div`
  display: flex;
  align-items: center;
  color: ${palette.TEXT_SECONDARY};
  input::placeholder {
    color: ${palette.TEXT_SECONDARY} !important;
    opacity: 1;
  }
  span {
    margin-left: 20px;
    margin-right: 60px;
  }
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

  const handleUpdateNoteAndNotes = async () => {
    const updatedNote = {
      title,
      date,
      content,
      id: note.id,
      userId: note.userId,
    }
    const { data } = await notesService.update(updatedNote)
    updateNote(data)
  }

  const handleNewNote = async () => {
    const newNote = {
      title,
      date,
      content,
      userId: localSession.token,
    }
    const data = await addNote(newNote)
    setNote(data)
  }

  const handleOnBlur = () => {
    if (note.id) {
      handleUpdateNoteAndNotes()
    } else {
      handleNewNote()
    }
  }

  if (note.title === undefined) {
    return <NoteNoView />
  }

  return (
    <Container>
      <ThreeDotButton />
      <InputTitle
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        onBlur={() => handleOnBlur()}
      />
      <InputDate>
        <SVGDate />
        <span>Date</span>
        <input
          type="text"
          id="date"
          name="date"
          placeholder="dd/mm/yyyy"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          onBlur={() => handleOnBlur()}
        />
      </InputDate>
      <InputContent
        id="content"
        name="content"
        placeholder="Write in"
        value={content}
        onChange={({ target }) => setContent(target.value)}
        onBlur={() => handleOnBlur()}
      />
    </Container>
  )
}
export default NoteView
