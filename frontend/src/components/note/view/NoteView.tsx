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
import SelectFolder from '../input/SelectFolder'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vw, 30px);
  padding: clamp(20px, 5vw, 50px);
  position: relative;
`

const NoteView = () => {
  const [title, setTitle] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [folder, setFolder] = useState<number>(0)
  const [selectFolder, setSelectFolder] = useState<Boolean>(true)

  const note = useAppSelector((state) => state.note.note)
  const getFolder = useAppSelector((state) => state.folder.folder)
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
      setFolder(getFolder.id)
    }
    setSelectFolder(true)
  }, [note])

  useEffect(() => {
    const baseNote = {
      title,
      date: complianceDate(date),
      content,
      folderId: folder,
    }

    const timeout = setTimeout(() => {
      if (
        note.title === title &&
        note.date === date &&
        note.content === content &&
        selectFolder
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
  }, [title, date, content, folder])

  if (!note.view) {
    return <NoteNoView />
  }

  return (
    <Container>
      <InputTitle value={title} setState={setTitle} />
      <InputDate date={date} setDate={setDate} />
      <SelectFolder
        folder={folder}
        setFolder={setFolder}
        setSelectFolder={setSelectFolder}
      />
      <InputContent value={content} setState={setContent} />
      {note.title && <ThreeDotButton />}
      <NotifSaved />
    </Container>
  )
}
export default NoteView
