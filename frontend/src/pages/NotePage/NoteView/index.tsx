import styled from 'styled-components'
import NoteNoView from './NoteNoView'
import { useEffect, useState } from 'react'
import ThreeDotButton from './ThreeDotButton'
import { checkDate, complianceDate, styleInputError } from 'utils/utils'
import InputDate from './InputDate'
import NotifSaved from './NotifSaved'
import InputTitle from './InputTitle'
import InputContent from './InputContent'
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
  const [noteSaved, setNoteSaved] = useState<boolean>(false)

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
        dispatch(updateNoteAction({ ...baseNote, id: note.id }))
      } else {
        dispatch(addNoteAction(baseNote))
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
