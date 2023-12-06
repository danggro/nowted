import styled from 'styled-components'
import SVGDate from './SVG/SVGDate'
import * as palette from '../../assets/Variables'
import NoteNoView from './NoteNoView'
import { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../../context/NoteContext'
import ThreeDotPopup from './ThreeDotPopup'
import notesService from '../../services/notes'
import { NotesContext } from '../../context/NotesContext'
import useComponentVisible from '../../hooks/hooks'
import ThreeDotButton from './ThreeDotButton'

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
  const { note } = useContext(NoteContext)
  const { updateNote } = useContext(NotesContext)
  const [title, setTitle] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    if (note.title) setTitle(note.title)
    if (note.date) setDate(note.date)
    if (note.content) setContent(note.content)
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

  if (!note.title) {
    return <NoteNoView />
  }

  return (
    <Container>
      <ThreeDotButton />
      <InputTitle
        type="text"
        id="title"
        name="title"
        placeholder={note.title}
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        onBlur={() => handleUpdateNoteAndNotes()}
      />
      <InputDate>
        <SVGDate />
        <span>Date</span>
        <input
          type="text"
          id="date"
          name="date"
          placeholder={note.date}
          value={date}
          onChange={({ target }) => setDate(target.value)}
          onBlur={() => handleUpdateNoteAndNotes()}
        />
      </InputDate>
      <InputContent
        id="content"
        name="content"
        placeholder={note.content}
        value={content}
        onChange={({ target }) => setContent(target.value)}
        onBlur={() => handleUpdateNoteAndNotes()}
      />
    </Container>
  )
}
export default NoteView
