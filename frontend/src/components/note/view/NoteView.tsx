import styled from 'styled-components'
import NoteNoView from './NoteNoView'
import { useEffect, useState } from 'react'
import ThreeDotButton from '../option/Button'
import { complianceDate } from 'utils/utils'
import InputDate from '../input/InputDate'
import InputTitle from '../input/InputTitle'
import InputContent from '../input/InputContent'
import NotifSaved from '../notif/NotifSaved'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { addNoteAction, updateNoteAction } from 'redux/actions/noteActions'

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
  const [title, setTitle] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const note = useAppSelector((state) => state.note.note)
  const dispatch = useAppDispatch()

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

  useEffect(() => {
    const baseNote = {
      title,
      date: complianceDate(date),
      content,
    }

    const timeout = setTimeout(() => {
      if (
        note.title === title &&
        note.date === date &&
        note.content === content
      ) {
        return null
      }

      if (note.id) {
        dispatch(updateNoteAction({ ...baseNote, id: note.id }))
      } else {
        dispatch(addNoteAction(baseNote))
      }
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
      <NotifSaved />
    </Container>
  )
}
export default NoteView
